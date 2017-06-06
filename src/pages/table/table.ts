import { Component } from '@angular/core';
import { SaikoroService} from "../../services/Saikoro.Service";

import { NavController, NavParams } from 'ionic-angular';
import {CupDefinition, DiceState} from "../../model/dice.model";

@Component({
  selector: 'page-table',
  templateUrl: 'page-table.html'
})
export class TablePage
{
	idDiceGroup: string;
	diceDefinition: CupDefinition;
	lastThrow: Array<any>;
	rawLastThrow: Array<any>;
	showingCupConfiguracion: boolean;

	constructor(public nav: NavController, public navParams: NavParams,
		    public saikoro: SaikoroService)
	{
		this.showingCupConfiguracion=false;
		this.lastThrow=null;
		this.rawLastThrow=null;
		this.nav = nav;
		this.navParams = navParams;
		this.idDiceGroup = this.navParams.get("iddicegroup");
		console.log("ID collection: "+this.idDiceGroup);
		this.diceDefinition = this.navParams.get("groupdescription");
		this.saikoro.setLaunchingDefinition(this.diceDefinition.dices);
	}
	launchDices()
	{
		this.rawLastThrow=this.saikoro.launch();
		this.lastThrow = []
		for(let rlt of this.rawLastThrow)
		{
			let lt={ 
				"dice": rlt.dice,
				"dices": []
			}
			for(let rlt2 of rlt.result)
			{
				let d=new DiceState(rlt2);
				lt.dices.push(d);
			}
			this.lastThrow.push(lt);
		}
		console.log(this.lastThrow);
	}
	showCupConfiguration()
	{
		this.showingCupConfiguracion=!this.showingCupConfiguracion;
	}
}
