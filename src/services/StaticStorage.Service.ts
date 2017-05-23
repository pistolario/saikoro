import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { IStorageService} from "./StorageBack.Service";
import {CupDefinition, DiceDefinition} from "./dice.model";


export class StaticStorageService implements IStorageService
{
	cups: Array<CupDefinition>;
	constructor()
	{
		this.defineInitialCups();		
	}

	defineInitialCups()
	{
		this.cups = [];
		let cup: CupDefinition;
		let d: DiceDefinition;
		cup=new CupDefinition();
		cup.name="Dados de 20";
		cup.id=1;
		cup.dices.push(new DiceDefinition("20", 1));
		this.cups.push(cup);
		cup=new CupDefinition();
		cup.name="3d6";
		cup.id=2;
		cup.dices.push(new DiceDefinition("6", 3));
		this.cups.push(cup);
		cup=new CupDefinition();
		cup.name="Porcentaje";
		cup.id=3;
		cup.dices.push(new DiceDefinition("100", 1));
		this.cups.push(cup);
	}

	getListCups(): Array<any>
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
					return true;
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
		if(cupDefinition.id>=0)
		{
			this.cups.push(cupDefinition);
			return true;;
		}
		let maxId=0;
		for(let c of this.cups)
		{
			if(c.id>maxId)
				maxId = c.id;
		}
		cupDefinition.id=maxId+1;
		this.cups.push(cupDefinition);
		return true;
	}
	deleteCup(idCup: number): boolean
	{
		for(let i=0;i<this.cups.length;i++)
		{
			if(this.cups[i].id==idCup)
			{
				this.cups.splice(i, 1);
				return true;
			}
		}
		return false;
	}
}
