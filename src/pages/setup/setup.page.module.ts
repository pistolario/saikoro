import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { SetupPage } from './setup.page';
 
@NgModule({
  declarations: [
    SetupPage,
  ],
  imports: [
    IonicPageModule.forChild(SetupPage),
    TranslateModule.forChild()
  ],
  exports: [
    SetupPage
  ]
})
export class SetupPageModule {}
