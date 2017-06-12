import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SetupConfiguration} from "../../model/setup.model";
import {StorageServiceFactory} from "../../services/Storage.Service";
import {IStorageService} from "../../services/StorageBack.Service";

@IonicPage()
@Component({
  selector: 'setuppage',
  templateUrl: 'page-setup.html'
})
export class SetupPage 
{
	public storageService: IStorageService;
	constructor(public nav: NavController, public navParams: NavParams,
		   public setupConf: SetupConfiguration,
		   public storageFactory: StorageServiceFactory
		   )
	{
		this.nav = nav;
		this.navParams = navParams;
		this.storageService = null;
	}
	ionViewWillEnter()
	{
		this.storageService = this.storageFactory.getInstance();
	}
	public ionViewWillLeave()
	{
		console.log("Before going out page Setup");
		this.storageService.storeSetup(this.setupConf).then( () => {
			console.log("Setup saved");
		});
	}
}
