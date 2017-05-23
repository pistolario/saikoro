import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {CupDefinition, DiceDefinition} from "../../services/dice.model";
import {StorageServiceFactory} from "../../services/Storage.Service";
import {IStorageService} from "../../services/StorageBack.Service";

@Component({
  selector: 'page-collection',
  templateUrl: 'page-collection-edit.html'
})
export class CollectionPage implements OnInit
{

	storageService: IStorageService;
	idDiceGroup: string;
	cupDefinition: CupDefinition;
	callback: any;
	myForm: FormGroup;
	modified: boolean;
	constructor(public nav: NavController, public navParams: NavParams,
		    public alertCtrl: AlertController,
		   private fb: FormBuilder,
		    public storageFactory: StorageServiceFactory)
	{
		this.nav = nav;
		this.navParams = navParams;
		this.idDiceGroup = this.navParams.get("iddicegroup");
		this.cupDefinition = this.navParams.get("groupdescription");
		this.callback = this.navParams.get("callback");
		this.modified=false;
		this.storageService = storageFactory.getInstance();
	}
	ngOnInit(): void
	{
        	let newForm = this.fb.group({
	            name: [this.cupDefinition.name, [Validators.required, Validators.maxLength(25)]],
	            formArray: this.fb.array([])
	        });

        	const arrayControl = <FormArray>newForm.controls['formArray'];
	        this.cupDefinition.dices.forEach(item => {
	            let newGroup = this.fb.group({
	                itemDiceType: [item.diceType, [Validators.required]],
	                itemQuantity: [item.quantity, [Validators.required]]
	            });
        	    arrayControl.push(newGroup);
	        });
        this.myForm = newForm;
	}
    addInput(): void
    {
        const arrayControl = <FormArray>this.myForm.controls['formArray'];
	let item=new DiceDefinition("4", 1);
	this.cupDefinition.dices.push(item);
        let newGroup = this.fb.group({
            // Fill this in identically to the one in ngOnInit
	                itemDiceType: [item.diceType, [Validators.required]],
	                itemQuantity: [item.quantity, [Validators.required]]
        });
        arrayControl.push(newGroup);
	this.modified=true;
    }
    delInput(index: number): void {
        const arrayControl = <FormArray>this.myForm.controls['formArray'];
        arrayControl.removeAt(index);
	this.cupDefinition.dices.splice(index, 1);
	this.modified=true;
    }
   onSave(): void
   {
	   console.log("En onSave");
	   this.cupDefinition.name = this.myForm.value.name;
	   for(let i=0;i<this.cupDefinition.dices.length;i++)
	   {
		   let fa=this.myForm.value.formArray[i];
		   this.cupDefinition.dices[i].diceType=fa.itemDiceType;
		   this.cupDefinition.dices[i].quantity=fa.itemQuantity;
		   console.log(this.myForm.value.formArray[i].itemDiceType);
		   console.log(this.myForm.value.formArray[i].itemQuantity);
	   }
	   let ret=this.storageService.saveCup(this.cupDefinition);
	   console.log("Save success: "+ret);
	   this.modified=false;
   }

    onSubmit(): void
    {
        console.log(this.myForm.value);
        // Your form value is outputted as a JavaScript object.
        // Parse it as JSON or take the values necessary to use as you like
    }
    comingBack():void
    {
	    console.log("In comingBack");
	    if(this.modified)
	    {
		    this.showConfirmExit();
	    }
	    console.log("Before callback");
	this.callback(null).then(()=>{
		    this.nav.pop();
		 });
	//this.nav.pop();
    }
  showConfirmExit()
  {
    let confirm = this.alertCtrl.create({
      title: 'Collection modified',
      message: 'Are you sure to exit collection configuration? (You could loose changes)',
      buttons: [
        {
          text: 'Continue',
          handler: () => {
          }
        },
        {
          text: 'Exit',
          handler: () => {
		this.nav.pop();
          }
        }
      ]
    });
    confirm.present();
  }   
}
