import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { JamSessionPage } from './jamsession';
import { ComponentsModule } from '../../components/components.module'
 
@NgModule({
  declarations: [
    JamSessionPage,
  ],
  imports: [
    IonicPageModule.forChild(JamSessionPage),
    ComponentsModule,
    TranslateModule.forChild()
  ],
  exports: [
    JamSessionPage
  ]
})
export class JamSessionPageModule {}
