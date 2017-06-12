import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CollectionsPage } from './collections';
 
@NgModule({
  declarations: [
    CollectionsPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectionsPage),
    TranslateModule.forChild()
  ],
  exports: [
    CollectionsPage
  ]
})
export class CollectionsPageModule {}
