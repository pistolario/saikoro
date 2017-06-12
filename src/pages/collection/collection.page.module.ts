import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CollectionPage } from './collection.page';
import { ComponentsModule } from '../../components/components.module'
 
@NgModule({
  declarations: [
    CollectionPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectionPage),
    ComponentsModule,
    TranslateModule.forChild()
  ],
  exports: [
    CollectionPage
  ]
})
export class CollectionPageModule {}
