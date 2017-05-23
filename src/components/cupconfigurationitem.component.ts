import { Component, Input } from '@angular/core';
import {DiceDefinition, CupDefinition} from "../services/dice.model";

@Component({
  selector: 'cupconfiguration-item',
  templateUrl: 'cupconfigurationitem.html'
})
export class CupConfigurationItem
{

	@Input() cupConfiguration: CupDefinition;
	constructor()
	{
	}
}
