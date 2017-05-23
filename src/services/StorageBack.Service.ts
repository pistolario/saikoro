import {CupDefinition} from "./dice.model";

export interface IStorageService
{
	getListCups();
	loadCup(idCup: number): CupDefinition;
	saveCup(cupDefinition: CupDefinition): boolean;
	newCup(cupDefinition: CupDefinition):boolean;
	deleteCup(idCup: number): boolean;
}
