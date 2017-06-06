import { Component, Input } from '@angular/core';
import {DiceState} from "../model/dice.model";

@Component({
  selector: 'diceresultitem',
  templateUrl: 'diceresult-item.html'
})
export class DiceResultItem
{
	@Input() state: DiceState;
	constructor()
	{
	}
}
