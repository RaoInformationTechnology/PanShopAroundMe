import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

@Injectable()
export class AroundMeProvider {
	mapElement: any;
	pleaseConnect: any;
	map: any;
	mapInitialised: boolean = false;
	mapLoaded: any;
	mapLoadedObserver: any;
	markers: any = [];
	apiKey: string;
	APIKEY: string;
	TYPE: string;
	headers;
	KEYWORD;
	QUERY;

	constructor(public http: Http) {
		this.APIKEY = "AIzaSyAgQ-rXyGW48oBnSDu7Au_tgFKi-SibEh0";

		this.TYPE = "Gau Shala";
		this.KEYWORD = "Gau Shala";
		// this.QUERY = "Pan and cold drinks";
		this.QUERY = "Garden";
		// this.QUERY = "ATM";
	}

	getAPIKEY(){
		return this.APIKEY;
	}

	getPlaces(location) {
		return this.http
			.get(
				"https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
					this.QUERY +
					"&location=" +
					location.lat +
					"," +
					location.lon +
					"&key=" +
					this.APIKEY +
					"&rankBy=distance"
			)
			.map(response => response.json());
	}

	





}
