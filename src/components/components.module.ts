import { IonicModule } from 'ionic-angular';
import { CupConfigurationItem } from './cupconfigurationitem.component';
import { DiceGroupItem } from './dicegroup-item';
import { DiceResultItem } from './diceresult.component';
import { NgModule } from '@angular/core';
 
@NgModule({
  declarations: [
    CupConfigurationItem,
    DiceGroupItem,
    DiceResultItem
  ],
  imports: [
    IonicModule
  ],
  exports: [
    CupConfigurationItem,
    DiceGroupItem,
    DiceResultItem
  ]
})
export class ComponentsModule {}
