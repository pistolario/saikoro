import { Component } from '@angular/core';
import { SaikoroService} from "../../services/Saikoro.Service";

import { NavController, NavParams } from 'ionic-angular';
import {DiceDefinition, CupDefinition} from "../../services/dice.model";
import {CupConfigurationItem} from "../../services/cupconfigurationitem.component";

@Component({
  selector: 'page-table',
  templateUrl: 'page-table.html'
})
export class TablePage
{
	idDiceGroup: string;
	diceDefinition: CupDefinition;
	lastThrow: Array<any>;
	showingCupConfiguracion: boolean;

	constructor(public nav: NavController, public navParams: NavParams,
		    public saikoro: SaikoroService)
	{
		this.showingCupConfiguracion=false;
		this.lastThrow=null;
		this.nav = nav;
		this.navParams = navParams;
		this.idDiceGroup = this.navParams.get("iddicegroup");
		console.log("ID collection: "+this.idDiceGroup);
		this.diceDefinition = this.navParams.get("groupdescription");
		this.saikoro.setLaunchingDefinition(this.diceDefinition.dices);
	}
	launchDices()
	{
		this.lastThrow=this.saikoro.launch();
		console.log(this.lastThrow);
	}
	showCupConfiguration()
	{
		this.showingCupConfiguracion=!this.showingCupConfiguracion;
	}
}
