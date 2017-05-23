import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SaikoroService} from "../../services/Saikoro.Service";
import {StorageServiceFactory} from "../../services/Storage.Service";
import {IStorageService} from "../../services/StorageBack.Service";
import {TablePage} from "../table/table"
import {CollectionPage} from "../collection/collection.page"
import { CupDefinition, DiceDefinition} from "../../services/dice.model";

@Component({
  selector: 'page-collections',
  templateUrl: 'page-collections.html'
})
export class CollectionsPage
{

	storageService: IStorageService;
	lCollections: Array<any>;
	constructor(public nav: NavController, public navParams: NavParams,
		    public alertCtrl: AlertController,
		    public storageFactory: StorageServiceFactory)
	{
		this.nav = nav;
		this.navParams = navParams;
		this.storageService = storageFactory.getInstance();
		this.lCollections = this.storageService.getListCups();
	}
	itemTapped(event, col)
	{
		console.log("Item selected");
		let setupCup = this.storageService.loadCup(col.id);
		if(setupCup==null)
		{
			let alertPopup = this.alertCtrl.create({
			     title: 'Problem ',
			     subTitle: 'Collection unknown',
			     buttons: ["Ok"]
			   });
			 alertPopup.present();
		}
		else
		{
			console.log("We've got dice definition");
			this.nav.push(TablePage, {
				iddicegroup: col.id,
				groupdescription: setupCup
			});
		}
	}
	deleteItem(col)
	{
		console.log("Item selected to delete");
		this.storageService.deleteCup(col.id);
		this.lCollections = this.storageService.getListCups();
	}

	editItem(col)
	{
		console.log("Item selected to edit");
		let setupCup = this.storageService.loadCup(col.id);
		if(setupCup==null)
		{
			let alertPopup = this.alertCtrl.create({
			     title: 'Problema ',
			     subTitle: 'Collection unknown',
			     buttons: ["Ok"]
			   });
			 alertPopup.present();
		}
		else
		{
			let myCallbackFunction = (_params) => {
			     return new Promise((resolve, reject) => {
			         /*this.test = _params;
			         resolve();*/
				this.lCollections = this.storageService.getListCups();
			         resolve();
			     });
}
			this.nav.push(CollectionPage, {
				iddicegroup: col.id,
				groupdescription: setupCup,
				callback: myCallbackFunction
			});
		}
	}
	addItem()
	{
		console.log("In add Item (collection)");
		let c = new CupDefinition();
		c.name="New cup";
		c.dices.push(new DiceDefinition("6", 2));
		let r=this.storageService.newCup(c);
		console.log("Created cup: "+r);
		if(r)
			this.lCollections = this.storageService.getListCups();
		else
		{
			let alertPopup = this.alertCtrl.create({
			     title: 'Problem ',
			     subTitle: 'Collection creation impossible',
			     buttons: ["Ok"]
			   });
			 alertPopup.present();
		}
	}

}
