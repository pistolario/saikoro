import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { TablePage } from './table';
import { ComponentsModule } from '../../components/components.module'
 
@NgModule({
  declarations: [
    TablePage,
  ],
  imports: [
    IonicPageModule.forChild(TablePage),
    ComponentsModule,
    TranslateModule.forChild()
  ],
  exports: [
    TablePage
  ]
})
export class TablePageModule {}
