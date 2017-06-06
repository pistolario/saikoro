import {CupDefinition} from "../model/dice.model";
import {SetupConfiguration} from "../model/setup.model";

export interface IStorageService
{
	//response(Array)
	getListCups(): Promise<Array<any>>;
	//response(CupDefinition)
	loadCup(idCup: number): Promise<CupDefinition>;
	saveCup(cupDefinition: CupDefinition): Promise<void>;
	newCup(cupDefinition: CupDefinition): Promise<CupDefinition>;
	deleteCup(idCup: number): Promise<boolean>;
	storeSetup(setup: SetupConfiguration): Promise<void>;
	//response(setup)
	retrieveSetup(setup: SetupConfiguration): Promise<void>;
}
