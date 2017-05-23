import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SaikoroService} from "../../services/Saikoro.Service";

@Component({
  selector: 'dicegroup-item',
  templateUrl: 'dicegroup-item.html'
})
export class DiceGroupItem 
{
	@Input() formPiece: FormGroup; // This component is passed a FormGroup from the base component template
	constructor()
	{
	}
}
