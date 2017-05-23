import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class RandomService 
{
	constructor()
	{
	}

	getRandom(minValue: number, maxValue: number): number
	{
		return this.getRandomPlain(minValue, maxValue);
	}

	getRandomPlain(minValue: number, maxValue: number): number
	{
		return (Math.random() * (maxValue - minValue + 1) | 0) + minValue;
	}
}
