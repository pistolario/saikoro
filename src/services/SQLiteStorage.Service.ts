import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { SQLite} from 'ionic-native';
import { IStorageService} from "./StorageBack.Service";
import {CupDefinition} from "./dice.model";

export class SQLiteStorageService implements IStorageService
{
	private db:SQLite;
	private databaseName: String = "saikoro.db";
	constructor()
	{
		this.prepareDatabase();
	}
	getListCups()
	{
	}

	loadCup(idCup: number): CupDefinition
	{
		return null;
	}

	saveCup(cupDefinition: CupDefinition): boolean
	{
		return true;
	}

	newCup(cupDefinition: CupDefinition): boolean
	{
		return true;
	}

	prepareDatabase()
	{
		this.db = new SQLite();
		this.db.openDatabase({
			name: this.databaseName,
			location: 'default' // the location field is required
			}).then(() => {
				this.db.executeSql('create table danceMoves(name VARCHAR(32))', {}).then(() => {
				}, (err) => {
				console.error('Unable to execute sql: ', err);
				});
			},
			(err) => {
			console.error('Unable to open database: ', err);
			});
	}
	deleteCup(idCup: number): boolean
	{
		return true;
	}
}
