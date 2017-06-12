import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import {NativeAudio} from 'ionic-native';
import { SaikoroService} from "../../services/Saikoro.Service";
import {CupDefinition, DiceState} from "../../model/dice.model";
import {SetupConfiguration} from "../../model/setup.model";

@IonicPage()
@Component({
  selector: 'jamsession',
  templateUrl: 'page-jamsession.html'
})
export class JamSessionPage
{
	idDiceGroup: string;
	diceDefinition: CupDefinition;
	lastThrow: any;
	allThrows: Array<any>;
	audioId: string;

	constructor(public nav: NavController, public navParams: NavParams,
		    public actionSheetCtrl: ActionSheetController,
		    public setupConf: SetupConfiguration,
		    public saikoro: SaikoroService)
	{
		this.lastThrow=null;
		this.allThrows=[];
		this.nav = nav;
		this.navParams = navParams;
		this.audioId = null;
	}
	ionViewWillEnter()
	{
		console.log("In ionViewWillEnter of JamSessionPage");
		this.setupConf.preloadAudio().then( (audioId) => {
			this.audioId = audioId;
			}, (err) => {
				console.log("Problem, no audio available: "+err);
				this.audioId=null;
		});
	}
	prelaunchDice(dice, event)
	{
		console.log("Evento prelaunchDice");
		console.log(dice);
		console.log(event);
		this.presentActionSheet(dice);
	}
	presentActionSheet(dice)
	{
		let actionSheet = this.actionSheetCtrl.create({
			title: ''+dice,
     			buttons: [
       				{
			         text: '1',
			         role: 'destructive',
			         handler: () => {
			           console.log('1 clicked');
					 this.launchDice(dice, 1);
			         }
			       },
			       {
			         text: '2',
			         role: 'destructive',
			         handler: () => {
			           console.log('2 clicked');
					 this.launchDice(dice, 2);
			         }
			       },
			       {
       				  text: '4',
				         role: 'destructive',
			         handler: () => {
			           console.log('4 clicked');
					 this.launchDice(dice, 4);
			         }
			       },
			       {
			         text: 'Cancel',
			         role: 'cancel',
			         handler: () => {
			           console.log('Cancel clicked');
			         }
		       		}
		    	 ]
	   	});
		actionSheet.present();
	}
	launchDice(dice, q)
	{
		if(this.audioId!=null)
			NativeAudio.play(this.audioId);
		this.saikoro.launchSimple(dice, q).then( (result) => {
			let lt={ 
				"dice": dice,
				"dices": []
			}
			for(let rlt2 of result)
			{
				let d=new DiceState(rlt2);
				lt.dices.push(d);
			}
			this.lastThrow = lt;
			this.allThrows.push(lt);
		}, (err) => {
			console.log("Error calling saikoro: "+err);
		});
	}
}
