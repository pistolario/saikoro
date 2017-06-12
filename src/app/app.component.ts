import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { SaikoroService} from '../services/Saikoro.Service';


@Component({
  templateUrl: 'app.html'
})
@Injectable()
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "CollectionsPage";

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
	  public translate: TranslateService, private saikoroService: SaikoroService)
  {
    this.initializeApp(statusBar, splashScreen);

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Jam session', component: "JamSessionPage"},
      { title: 'Collections', component: "CollectionsPage" },
      { title: 'Setup', component: "SetupPage"},
      { title: 'About', component: "AboutPage"}
    ];

  }

  initializeApp(statusBar: StatusBar, splashScreen: SplashScreen)
  {
	  this.translate.setDefaultLang("en");
	  this.translate.use('en');
	this.platform.ready().then(() => {
		// Okay, so the platform is ready and our plugins are available.
		// Here you can do any higher level native things you might need.
		statusBar.styleDefault(); // use provided instances instead, dependency injection rules!
		splashScreen.hide();
    	});
  }

  openPage(page)
  {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
