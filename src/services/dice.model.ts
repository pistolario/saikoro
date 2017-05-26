
export class DiceDefinition
{
	/*Dices: 4, 6, 8, 10, 12, 20, 100, fudge */
	public diceType: string;
	public quantity: number;
	constructor(diceType: string, quantity: number)
	{
		this.diceType = diceType;
		this.quantity = quantity;
	}
	clone(): DiceDefinition
	{
		let dd=new DiceDefinition(this.diceType, this.quantity);
		return dd;
	}
	loadFromJSONObj(jsonObj)
	{
		this.diceType=jsonObj.diceType;
		this.quantity=jsonObj.quantity;
	}
}

export class CupDefinition
{
	public name: string;
	public id: number;
	public dices: Array<DiceDefinition>;
	constructor()
	{
		this.id=-1;
		this.dices=[];
	}
	loadFromJSONObj(jsonObj)
	{
		this.id=jsonObj.id
		this.name=jsonObj.name;
		this.dices=[];
		for(let dRaw of jsonObj.dices)
		{
			let d=new DiceDefinition("4", 1);
			d.loadFromJSONObj(dRaw);
			this.dices.push(d);
		}
	}
	clone(): CupDefinition
	{
		let cd=new CupDefinition();
		cd.name=this.name;
		cd.id=this.id;
		cd.dices=[];
		for(let d of this.dices)
		{
			cd.dices.push(d.clone());
		}
		return cd;
	}
	copy(cd: CupDefinition)
	{
		let cdd = cd.dices;
		this.name=cd.name;
		this.id=cd.id;
		this.dices=[];
		for(let d of cdd)
		{
			this.dices.push(d.clone());
		}
	}
}

export class DiceState
{
	public result: string;
	public locked: boolean;
	public toRelaunch: boolean;
	constructor(result: string)
	{
		this.result = result;
		this.locked=false;
		this.toRelaunch=false;
	}
}
