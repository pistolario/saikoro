import {Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { IStorageService} from "./StorageBack.Service";
import { LocalStorageService} from "./LocalStorage.Service";
import {SQLiteStorageService} from "./SQLiteStorage.Service";
import { SetupConfiguration} from "../model/setup.model";

@Injectable()
export class StorageServiceFactory
{
	serviceImpl: IStorageService;
	constructor(public platform: Platform, public sc: SetupConfiguration)
	{
	}
	getInstance(): IStorageService
	{
		console.log("In getInstance of StorageServiceFactory");
		if(this.serviceImpl!=null)
			return this.serviceImpl;
		if(this.platform.is('cordova'))
		{//Instance for the case when it's an app
			console.log("It's Cordova, so SQLite storage");
			this.serviceImpl=new SQLiteStorageService(this.sc);
		}
		else
		{
			console.log("It isn't cordova, so localstorage");
			this.serviceImpl=new LocalStorageService();
		}
		return this.serviceImpl;
	}
}
