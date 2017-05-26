import { Component, Input } from '@angular/core';
import {DiceDefinition, CupDefinition, DiceState} from "../services/dice.model";

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
