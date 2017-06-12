import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {StorageServiceFactory} from "../../services/Storage.Service";
import {IStorageService} from "../../services/StorageBack.Service";
import { CupDefinition, DiceDefinition} from "../../model/dice.model";

@IonicPage()
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
		this.storageService = null;
		this.lCollections=[];
	}
	ionViewWillEnter()
	{
		console.log("In ionViewWillEnter of CollectionsPage");
		this.storageService = this.storageFactory.getInstance();
		this.storageService.getListCups().then( (l) => {
			console.log("Retrieved collections: "+l);
			this.lCollections = l;
			if(l!=null && l.length>0)
				console.log(l[0]);
		});
	}
	itemTapped(event, col)
	{
		console.log("Item selected");
		this.storageService.loadCup(col.id).then( (setupCup) => {
			console.log("We've got dice definition");
			this.nav.push("TablePage", {
				iddicegroup: col.id,
				groupdescription: setupCup
			});
		}).catch( (err) => {
			let alertPopup = this.alertCtrl.create({
			     title: 'Problem ',
			     subTitle: 'Collection unknown',
			     buttons: ["Ok"]
			   });
			 alertPopup.present();
		});
	}
	deleteItem(col)
	{
		console.log("Item selected to delete");
		this.storageService.deleteCup(col.id).then( (success) => {
			this.storageService.getListCups().then( (myList) => {
				this.lCollections = myList;
			});
		});
	}

	editItem(col)
	{
		console.log("Item selected to edit");
		this.storageService.loadCup(col.id).then( (setupCup) => {
			let myCallbackFunction = (_params) => {
			     return new Promise((resolve, reject) => {
				this.storageService.getListCups().then( (l) => {
					this.lCollections = l;
			         	resolve();
				});
			     });
			}
			this.nav.push("CollectionPage", {
				iddicegroup: col.id,
				groupdescription: setupCup,
				callback: myCallbackFunction
			});
		}).catch( (err) => {
			let alertPopup = this.alertCtrl.create({
			     title: 'Problema ',
			     subTitle: 'Collection unknown',
			     buttons: ["Ok"]
			   });
			 alertPopup.present();
		});
	}
	addItem()
	{
		console.log("In add Item (collection)");
		let c = new CupDefinition();
		c.name="New cup";
		c.dices.push(new DiceDefinition("6", 2));
		this.storageService.newCup(c).then( (r) => {
			console.log("Created cup: "+r);
			this.storageService.getListCups().then( (myList) => {
				this.lCollections = myList;
			});
		}).catch( (err) => {
			let alertPopup = this.alertCtrl.create({
			     title: 'Problem ',
			     subTitle: 'Collection creation impossible',
			     buttons: ["Ok"]
			   });
			 alertPopup.present();
		});
	}

}
