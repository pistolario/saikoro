import { IStorageService} from "./StorageBack.Service";
import {CupDefinition } from "../model/dice.model";
import {SetupConfiguration} from "../model/setup.model";

export class LocalStorageService implements IStorageService
{
	cups: Array<CupDefinition>;
	constructor()
	{
		this.loadAllCups();
	}

	getListCups(): Promise<Array<any>>
	{
		let ret: Array<any>;
		ret = [];
		for(let c of this.cups)
		{
			ret.push({"name": c.name, "id": c.id});
		}
		return new Promise<Array<any>>((resolve, reject) => {
			resolve(ret);
		})
	}
	loadCup(idCup: number): Promise<CupDefinition>
	{
		let res=null;
		for(let c of this.cups)
		{
			if(c.id==idCup)
			{
				res=c;
				break;
			}
		}
		return new Promise<CupDefinition>((resolve, reject) => {
			if(res!=null)
				resolve(res);
			else
				reject();
		});
	}
	saveCup(cupDefinition: CupDefinition): Promise<any>
	{
		if(cupDefinition.id>=0)
		{
			for(let c of this.cups)
			{
				if(c.id==cupDefinition.id)
				{
					console.log(c);
					console.log(cupDefinition);
					c.copy(cupDefinition);
					return this.saveAllCups();
				}
			}
			return new Promise<void>((accept, reject) => {
				reject();
				});
		}
		else
		{
			return this.newCup(cupDefinition);
		}
	}
	newCup(cupDefinition: CupDefinition): Promise<CupDefinition>
	{
		let maxId=0;
		for(let c of this.cups)
		{
			if(c.id>maxId)
				maxId = c.id;
		}
		cupDefinition.id=maxId+1;
		this.cups.push(cupDefinition);

		return this.saveAllCups().then(() => {
			return new Promise<CupDefinition>( (accept, reject) => {
			accept( cupDefinition);
			}
							 )
		}
				       );
	}
	deleteCup(idCup: number): Promise<boolean>
	{
		for(let i=0;i<this.cups.length;i++)
		{
			if(this.cups[i].id==idCup)
			{
				this.cups.splice(i, 1);
				return this.saveAllCups().then( () => {
					return new Promise<boolean>( (accept, reject )=> {
					accept(true);
					})
				});
			}
		}
		return new Promise<boolean>((accept, reject) => {
			reject();
		})
	}
	loadAllCups(): Promise<void>
	{
		let storageKey = "cupsDefinition";
		if(localStorage.getItem(storageKey)!=null)
		{
			let sContent=localStorage.getItem(storageKey);
			console.log("Retrieved: "+sContent);
			this.cups=[];
			for(let cRaw of JSON.parse(sContent) )
			{
				let c=new CupDefinition();
				c.loadFromJSONObj(cRaw);
				this.cups.push(c);
			}
		}
		else
		{
			this.cups=[];
		}
		console.log("Cups loaded: "+this.cups);
		return new Promise<void>((accept, reject) => {
			accept();
			});
	}
	saveAllCups(): Promise<void>
	{
		let storageKey = "cupsDefinition";
		let serialized = JSON.stringify(this.cups);
		console.log("To store: "+serialized);
		localStorage.setItem(storageKey, serialized);
		return new Promise<void>((resolve, reject) => {
			resolve();
		});
	}
	storeSetup(setup: SetupConfiguration): Promise<void>
	{
		let storageKey = "setupConfiguration";
		let serialized = JSON.stringify(setup);
		console.log("To store: "+serialized);
		localStorage.setItem(storageKey, serialized);
		return new Promise<void>((accept, reject) => {
			accept();
		});
	}
	retrieveSetup(setup: SetupConfiguration): Promise<void>
	{
		let storageKey = "setupConfiguration";
		if(localStorage.getItem(storageKey)!=null)
		{
			let sContent=localStorage.getItem(storageKey);
			console.log("Retrieved: "+sContent);
			let cRaw = JSON.parse(sContent);
			setup.randomSource=cRaw["randomSource"];
			setup.randomOrgKey=cRaw["randomOrgKey"];
			setup.diceSound=cRaw["diceSound"];
		}
		return new Promise<void>(( accept, reject) => {
			accept();
		});
	}
}
