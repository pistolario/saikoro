import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import {HttpModule, Http} from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MyApp } from './app.component';
import { TablePage } from '../pages/table/table';
import { AboutPage } from '../pages/about/about';
import { CollectionsPage } from '../pages/collections/collections';
import { CollectionPage } from '../pages/collection/collection.page';
import { SaikoroService } from '../services/Saikoro.Service';
import { RandomService} from '../services/Random.Service';
import { StorageServiceFactory} from '../services/Storage.Service';
import { LocalStorageService} from '../services/LocalStorage.Service';
import {SQLiteStorageService} from "../services/SQLiteStorage.Service";
import { StaticStorageService} from "../services/StaticStorage.Service";
import { CupConfigurationItem} from "../components/cupconfigurationitem.component";
import { DiceResultItem} from "../components/diceresult.component";
import { DiceGroupItem} from "../components/dicegroup-item";

@NgModule({
  declarations: [
    MyApp,
    TablePage,
    CollectionsPage,
    CollectionPage,
    AboutPage,
    CupConfigurationItem,
    DiceResultItem,
    DiceGroupItem
  ],
  imports: [
    IonicModule.forRoot(MyApp),
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
    CollectionPage,
    CollectionsPage,
    AboutPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, SaikoroService, RandomService,
  	StorageServiceFactory, LocalStorageService, SQLiteStorageService, StaticStorageService]
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
