import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { JamSessionPage} from '../pages/jamsession/jamsession';
import { SetupPage} from '../pages/setup/setup.page';
import { AboutPage} from '../pages/about/about';
import { CollectionsPage } from '../pages/collections/collections';
import { SaikoroService} from '../services/Saikoro.Service';


@Component({
  templateUrl: 'app.html'
})
@Injectable()
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CollectionsPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public translate: TranslateService,
	      private saikoroService: SaikoroService)
  {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Jam session', component: JamSessionPage},
      { title: 'Collections', component: CollectionsPage },
      { title: 'Setup', component: SetupPage},
      { title: 'About', component: AboutPage}
    ];

  }

  initializeApp()
  {
	  this.translate.setDefaultLang("en");
	  this.translate.use('en');
	this.platform.ready().then(() => {
		// Okay, so the platform is ready and our plugins are available.
		// Here you can do any higher level native things you might need.
		StatusBar.styleDefault();
		Splashscreen.hide();
    	});
  }

  openPage(page)
  {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
