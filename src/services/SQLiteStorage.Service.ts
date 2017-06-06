import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { SQLite} from 'ionic-native';
import { IStorageService} from "./StorageBack.Service";
import {CupDefinition} from "../model/dice.model";
import {SetupConfiguration} from "../model/setup.model";

export class SQLiteStorageService implements IStorageService
{
	private db:SQLite;
	private databaseName: String = "saikoro.db";
	cups: Array<CupDefinition>;
	sc: SetupConfiguration;
	constructor(sc: any)
	{
		this.cups=[];
		this.sc=sc;
	}
	getListCups(): Promise<Array<any>>
	{
		let f = () => {
				let ret: Array<any>;
				ret = [];
				for(let c of this.cups)
				{
					ret.push({"name": c.name, "id": c.id});
				}
				return new Promise<Array<any>>( (accept, reject) => {
					accept(ret);
				});
		}
		if(this.cups.length==0)
			return this.loadAllCups().then(f);
		else
			return f();
	}

	loadCup(idCup: number): Promise<CupDefinition>
	{
		return this.prepareDatabase().then( () => {
			for(let c of this.cups)
			{
				if(c.id==idCup)
					return new Promise<CupDefinition>( (accept, reject) => {
						accept(c);
					});
			}
			return new Promise<CupDefinition>( (accept, reject ) => {
				reject("Cup not found");
			});
		});
	}

	saveCup(cupDefinition: CupDefinition): Promise<void>
	{
		return this.prepareDatabase().then( () => {
			if(cupDefinition.id>=0)
			{
				for(let c of this.cups)
				{
					if(c.id==cupDefinition.id)
					{
						console.log(c);
						console.log(cupDefinition);
						c.copy(cupDefinition);
						return this.saveAllCups()
					}
				}
				return new Promise<void>((accept, reject ) => {
					reject("Cup not found");
				});
			}
			else
			{
				return this.newCup(cupDefinition);
			}
		});
	}

	newCup(cupDefinition: CupDefinition): Promise<CupDefinition>
	{
		return this.prepareDatabase().then( () => {
			let maxId=0;
			for(let c of this.cups)
			{
				if(c.id>maxId)
					maxId = c.id;
			}
			cupDefinition.id=maxId+1;
			this.cups.push(cupDefinition);
			return this.saveAllCups()
		}).then( () => {
			return new Promise<CupDefinition>( (accept, reject) => {
				accept(cupDefinition);
			})
		});
	}
	deleteCup(idCup: number): Promise<boolean>
	{
		return this.prepareDatabase().then( () => {
			for(let i=0;i<this.cups.length;i++)
			{
				if(this.cups[i].id==idCup)
				{
					this.cups.splice(i, 1);
					return this.saveAllCups();
				}
			}
		}).then( () => {
			return new Promise<boolean>( (accept, reject) => {
				accept(true);
			})
		}).catch( (err) => {
			return new Promise<boolean>( (accept, reject) => {
				accept(false);
			})
		});
	}
	loadAllCups(): Promise<void>
	{
		return this.prepareDatabase().then( () => {
				return this.db.executeSql("SELECT * FROM CUP_DEFINITION", [])
			}).then((data) => {
				this.cups=[];
				console.log("Loading cup definitions");
				for(let i=0;i<data.rows.length;i++)
				{
					let cRaw=data.rows.item(i).content;
					console.log("Content: "+cRaw);
					let c=new CupDefinition();
					c.loadFromJSONObj(JSON.parse(cRaw));
					console.log("Loaded one cup");
					this.cups.push(c);
				}
				console.log("Cups loaded: "+this.cups);
			}, (error) => {
			console.log("Error retrieving cup definitions: "+JSON.stringify(error));
			});
	}

	saveAllCups(): Promise<void>
	{
		return this.prepareDatabase().then( () => {
			 return this.db.executeSql("DELETE FROM CUP_DEFINITION", [])
		}).then((data) => {
			console.log("Deleted all cup definitions");
			for(let c of this.cups)
			{
				let cJson = JSON.stringify(c);
				this.db.executeSql("INSERT INTO CUP_DEFINITION (content) VALUES (?)", [cJson]).then((data) => {
					console.log("Stored cup definition");
				}, (error) => {
					console.log("Error storing cup definitions: "+JSON.stringify(error));
				});
			}

		}, (error) => {
			console.log("Error deleting cup definitions: "+JSON.stringify(error));
		});
	}
	prepareDatabase(): Promise<void>
	{
		if(this.db!=null)
			return new Promise<void>((accept, reject) => {
				accept();
			});
		this.db = new SQLite();
		let comandos: Array<string>= [];
		comandos.push('create table if not exists CUP_DEFINITION (content VARCHAR(4096))');
		comandos.push('create table if not exists PARAMETERS (name VARCHAR(64), value VARCHAR(1024))');
		return this.db.openDatabase({
			name: this.databaseName,
			location: 'default' // the location field is required
			}).then(() => {
				this.db.sqlBatch(comandos);
			}).catch( (err) => {
				console.log("Unable to execute command: "+err);
			}).then(() => {
					console.log("Created tables");
					this.loadAllCups();
			}).catch( (err) => {
				console.log("Unable to create tables: "+err);
			}).then( () => {
					console.log("Loaded cup definitions");
					this.retrieveSetup(this.sc);
			});
	}
	storeSetup(setup: SetupConfiguration): Promise<void>
	{
		console.log("In storeSetup");
		return this.prepareDatabase().then(() => {
			console.log("Before deleting parameters");
			return this.db.executeSql("DELETE FROM PARAMETERS WHERE name in ('randomSource', 'randomOrgKey', 'diceSound')", [])
		}, (err) => {
			console.log("Error deleting parameters: "+err);
			return Promise.reject(err);
		}).then(() => {
			console.log("Before inserting randomSource");
			this.db.executeSql("INSERT INTO PARAMETERS (name, value) VALUES (?, ?)", ['randomSource', setup.randomSource]);
		}, (err) => {
			console.log("Error inserting randomSource: "+err);
			return Promise.reject(err);
		}).then( () => {
			console.log("Before inserting randomOrgKey");
			this.db.executeSql("INSERT INTO PARAMETERS (name, value) VALUES (?, ?)", ['randomOrgKey', setup.randomOrgKey]);
		}, (err) => {
			console.log("Error inserting randomOrgKey: "+err);
			return Promise.reject(err);
		}).then( () => {
			console.log("Before inserting diceSound");
			this.db.executeSql("INSERT INTO PARAMETERS (name, value) VALUES (?, ?)", ['diceSound', setup.diceSound]);
		}, (err) => {
			console.log("Error inserting diceSound: "+err);
			return Promise.reject(err);
		});
	}
	retrieveSetup(setup: SetupConfiguration): Promise<void>
	{
		return this.prepareDatabase().then(() => {
			return this.db.executeSql("SELECT name, value FROM PARAMETERS WHERE name in ('randomSource', 'randomOrgKey', 'diceSound')", [])
		}).then((data) => {
			for(let i=0;i<data.rows.length;i++)
			{
				let name=data.rows.item(i).name;
				let value=data.rows.item(i).value;
				if(name=='randomSource')
				{
					setup.randomSource=value;
				}
				else if(name=="randomOrgKey")
				{
					setup.randomOrgKey=value;
				}
				else if(name=="diceSound")
				{
					setup.diceSound=value;
				}
			}
			setup.loaded=true;
		}).catch( (err) => {
			console.error("Error retrieving setup: ", err);
		});
	}
}
