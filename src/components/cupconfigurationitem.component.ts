import { Component, Input } from '@angular/core';
import {CupDefinition} from "../model/dice.model";

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
