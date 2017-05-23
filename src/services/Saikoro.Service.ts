import { Component } from '@angular/core';
import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {RandomService} from "./Random.Service";
import {DiceDefinition} from "./dice.model";


@Injectable()
export class SaikoroService 
{
	public launchDefinition: Array<DiceDefinition>;
	public knownDices: Map<string, number>;
	constructor(public randomService: RandomService)
	{
		console.log("Creating SaikoroService");
		this.knownDices=new Map<string, number>();
		this.knownDices["4"]=4;
		this.knownDices["6"]=6;
		this.knownDices["8"]=8;
		this.knownDices["10"]=10;
		this.knownDices["12"]=12;
		this.knownDices["20"]=20;
		this.knownDices["100"]=100;
		this.knownDices["fudge"]=3;
	}

	/*
	loadLaunchingDefinition(rawDescription: string)
	{
		this.launchDefinition= new Map<string, DiceDefinition>();
		var info = JSON.parse(rawDescription);
		for(var i=0;i<info.length;i++)
		{
			var elem = info[i];
			if("dice" in elem && elem["dice"] in this.knownDices)
			{
				this.launchDefinition[elem["dice"]]=new DiceDefinition(elem["dice"], elem["q"])
			}
			else
			{
				console.log("Error in dice definition. Unknown dice: "+elem["dice"]);
			}
		}
	}*/
	setLaunchingDefinition(info: Array<DiceDefinition>)
	{
		this.launchDefinition = [];
		for(var i=0;i<info.length;i++)
		{
			var elem = info[i];
			if(elem.diceType in this.knownDices)
			{
				this.launchDefinition.push(elem);
			}
			else
			{
				console.log("Error in dice definition. Unknown dice: "+elem.diceType);
			}
		}
	}
	stringifyDefinition(): string 
	{
		return "";
	}
	launch(): Array<any>
	{
		var ret = new Array<any>();
		console.log("Dices defined: "+this.launchDefinition);

		for(var dt of this.launchDefinition)
		{
			var q = dt.quantity;
			var l =[];
			for(var i=0;i<q;i++)
				l.push(this.launchDice(dt.diceType));
			ret.push({
				"dice": dt.diceType,
				"result": l
			});
		}
		return ret;
	}
	/*
	addDice(diceType: string, quantity: number)
	{
		if(this.launchDefinition.has(diceType))
		{
			this.launchDefinition.get(diceType).quantity+=quantity;
		}
		else
			this.launchDefinition.set(diceType, new DiceDefinition( diceType, quantity));
	}*/
	launchDice(what: string)
	{
		if(what=="4")
			return ""+this.randomService.getRandom(1, 4);
		else if(what=="6")
			return ""+this.randomService.getRandom(1, 6);
		else if(what=="8")
			return ""+this.randomService.getRandom(1, 8);
		else if(what=="10")
			return ""+this.randomService.getRandom(1, 10);
		else if(what=="12")
			return ""+this.randomService.getRandom(1, 12);
		else if(what=="20")
			return ""+this.randomService.getRandom(1, 20);
		else if(what=="100")
			return ""+this.randomService.getRandom(1, 100);
		else if(what=="fudge")
		{
			var r=this.randomService.getRandom(1, 3);
			if(r==1)
				return "-";
			else if(r==2)
				return "0";
			else
				return "+";
		}
		return "unk";
	}
}
