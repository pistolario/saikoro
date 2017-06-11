import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import { BrowserModule } from '@angular/platform-browser';
import {HttpModule, Http} from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MyApp } from './app.component';
import { TablePage } from '../pages/table/table';
import { JamSessionPage} from '../pages/jamsession/jamsession';
import { SetupPage} from '../pages/setup/setup.page';
import { AboutPage } from '../pages/about/about';
import { CollectionsPage } from '../pages/collections/collections';
import { CollectionPage } from '../pages/collection/collection.page';
import { SaikoroService } from '../services/Saikoro.Service';
import { RandomService} from '../services/Random.Service';
import { StorageServiceFactory} from '../services/Storage.Service';
import { SetupConfiguration} from "../model/setup.model";
import { CupConfigurationItem} from "../components/cupconfigurationitem.component";
import { DiceResultItem} from "../components/diceresult.component";
import { DiceGroupItem} from "../components/dicegroup-item";

@NgModule({
  declarations: [
    MyApp,
    TablePage,
    JamSessionPage,
    SetupPage,
    CollectionsPage,
    CollectionPage,
    AboutPage,
    CupConfigurationItem,
    DiceResultItem,
    DiceGroupItem
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,  // New in ionic 3
    HttpModule,
    TranslateModule.forRoot({
	    loader: {
    	provide: TranslateLoader,
	useFactory: (createTranslateLoader),
	deps: [Http]
	    }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TablePage,
    JamSessionPage,
    SetupPage,
    CollectionPage,
    CollectionsPage,
    AboutPage
  ],
  providers: [
	  StatusBar, // Newly add for ionic 3
	  SplashScreen, // Newly add for ionic 3
	  {provide: ErrorHandler, useClass: IonicErrorHandler}, SaikoroService, RandomService,
  	StorageServiceFactory, SetupConfiguration]
  	//StorageServiceFactory, LocalStorageService, SQLiteStorageService, StaticStorageService, SetupConfiguration]
})
export class AppModule {}
//
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
