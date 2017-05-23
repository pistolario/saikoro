import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { IStorageService} from "./StorageBack.Service";
import {CupDefinition, DiceDefinition} from "./dice.model";

export class LocalStorageService implements IStorageService
{
	cups: Array<CupDefinition>;
	constructor()
	{
		this.loadAllCups();
	}

	getListCups()
	{
		let ret: Array<any>;
		ret = [];
		for(let c of this.cups)
		{
			ret.push({"name": c.name, "id": c.id});
		}
		return ret;
	}
	loadCup(idCup: number): CupDefinition
	{
		for(let c of this.cups)
		{
			if(c.id==idCup)
				return c;
		}
		return null;
	}
	saveCup(cupDefinition: CupDefinition): boolean
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
					this.saveAllCups();
					return true;
				}
			}
			return false;
		}
		else
		{
			return this.newCup(cupDefinition);
		}
	}
	newCup(cupDefinition: CupDefinition): boolean
	{
		let maxId=0;
		for(let c of this.cups)
		{
			if(c.id>maxId)
				maxId = c.id;
		}
		cupDefinition.id=maxId+1;
		this.cups.push(cupDefinition);
		this.saveAllCups();
		return true;
	}
	deleteCup(idCup: number): boolean
	{
		for(let i=0;i<this.cups.length;i++)
		{
			if(this.cups[i].id==idCup)
			{
				this.cups.splice(i, 1);
				this.saveAllCups();
				return true;
			}
		}
		return false;
	}
	loadAllCups()
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
	}
	saveAllCups()
	{
		let storageKey = "cupsDefinition";
		let serialized = JSON.stringify(this.cups);
		console.log("To store: "+serialized);
		localStorage.setItem(storageKey, serialized);
	}
}
