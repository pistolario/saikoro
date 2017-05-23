import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { IStorageService} from "./StorageBack.Service";
import { StaticStorageService} from "./StaticStorage.Service";
import { LocalStorageService} from "./LocalStorage.Service";
import {SQLiteStorageService} from "./SQLiteStorage.Service";

@Injectable()
export class StorageServiceFactory
{
	serviceImpl: IStorageService;
	constructor(public platform: Platform)
	{
	}
	getInstance(): IStorageService
	{
		if(this.serviceImpl!=null)
			return this.serviceImpl;
		// Initial static version
		//this.serviceImpl = new StaticStorageService();
		if(this.platform.is('cordova'))
		{//Instance for the case when it's an app
			console.log("It's Cordova, so SQLite storage");
			this.serviceImpl=new SQLiteStorageService();
		}
		else
		{
			console.log("It isn't cordova, so localstorage");
			this.serviceImpl=new LocalStorageService();
		}
		return this.serviceImpl;
	}
}
