import {NativeAudio} from 'ionic-native';

export class SetupConfiguration
{
	/* It can be: default, random.org */
	public randomSource: string;
	/* API key for randorm.org */
	public randomOrgKey: string;
	/* Sound identifier for dices */
	public diceSound: string;
	public loaded: boolean;
	public references: any;
	constructor()
	{
		this.randomSource = "default";
		this.randomOrgKey = "";
		this.diceSound = "1";
		this.loaded=false;
		this.references={};
	}
	urlDiceSound(): string
	{
		let wFile="";
		if(this.diceSound=="1")
			wFile="dice_1.wav";
		else if(this.diceSound=="2")
			wFile="dice_2.wav";
		else
			wFile="dice_1.wav";
		return "assets/sound/"+wFile;
	}
	preloadAudio(): Promise<string>
	{
		let newId = "audioid_"+this.diceSound;
		console.log("URL: "+this.urlDiceSound());
		if(newId in this.references)
		{
				return new Promise<string>( (accept, reject) => {
					accept(newId);
				});
		}
		return NativeAudio.preloadSimple(newId, this.urlDiceSound()
			).then( () => {
				return new Promise<string>( (accept, reject) => {
					accept(newId);
				});
			}, (err) => {
				console.log("Error preloading audio: "+err);
				return new Promise<string>((accept, reject) => {
					reject(err);
				});
			});
	}
}
