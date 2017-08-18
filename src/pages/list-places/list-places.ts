import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { AroundMeProvider } from "../../providers/around-me/around-me";
import { LoadingController } from "ionic-angular";
import { SinglePlacePage } from "../single-place/single-place";

import { AdMobFree, AdMobFreeBannerConfig } from "@ionic-native/admob-free";

import "rxjs/add/operator/toPromise";

/**
 * Generated class for the ListPlacesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-list-places",
	templateUrl: "list-places.html",
	providers: [Geolocation,AdMobFree]
})
export class ListPlacesPage {
	places;
	myLocation;
	distanceLoaded: Boolean;
	bannerConfig: AdMobFreeBannerConfig;
	constructor(
		private navCtrl: NavController,
		private geolocation: Geolocation,
		private aroundMe: AroundMeProvider,
		private loadingCtrl: LoadingController,
		private admobFree: AdMobFree
	) {
		this.distanceLoaded = false;

		this.bannerConfig = {
			id: 'ca-app-pub-9288083499996064/6082065309',
			isTesting: true,
			autoShow: true
		};

		this.admobFree.banner.config(this.bannerConfig);

		this.admobFree.banner
			.prepare()
			.then(() => {
				// banner Ad is ready
				// if we set autoShow to false, then we will need to call the show method here
			})
			.catch(e => console.log(e));
	}

	ionViewDidLoad() {
		this.getLocation();
		console.log("ionViewDidLoad ListPlacesPage");
	}

	doRefresh(){
		this.getLocation();
	}


	newArray(nums) {
		return new Array(Math.round(nums));
	}
	getLocation() {
		var that = this;
		let loading = this.loadingCtrl.create({
			spinner: "crescent",
			content: "Please wait... Pan Shops are loading !"
		});
		loading.present();

		this.geolocation
			.getCurrentPosition()
			.then(resp => {
				console.log("Location Coordinates");
				var location = {
					lat: resp.coords.latitude,
					lon: resp.coords.longitude
				};
				that.myLocation = location;
				this.aroundMe.getPlaces(location).subscribe(response => {
					this.feedDistances(response.results);
					loading.dismiss();
				});
			})
			.catch(error => {
				console.log("Error getting location", error);
			});
	}

	feedDistances(places) {
		console.log("Feeding Distance of : ", places);
		for (var i = 0; i < places.length; i++) {
			this.getDistance(places[i]);
		}
		this.distanceLoaded = true;
		this.places = places;
	}

	getDistance(place) {
		this.myLocation.lng = this.myLocation.lon;
		var distance = this.getDistanceBetween(
			place.geometry.location,
			this.myLocation
		);
		place.distance = distance;
		return place.distance;
	}

	makeLatLng(location) {
		// return new google.maps.LatLng({lat: location.lat, lng: location.lng});
	}
	placeClicked(event, place) {
		console.log(place);
		this.navCtrl.push(SinglePlacePage, {
			place: place
		});
	}

	rad(x) {
		return x * Math.PI / 180;
	}

	getDistanceBetween(p1, p2) {
		var R = 6378137; // Earth’s mean radius in meter
		var dLat = this.rad(p2.lat - p1.lat);
		var dLong = this.rad(p2.lng - p1.lng);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(this.rad(p1.lat)) *
				Math.cos(this.rad(p2.lat)) *
				Math.sin(dLong / 2) *
				Math.sin(dLong / 2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var d = R * c;
		d = Math.round(d / 1000 * 100) / 100;

		return d; // returns the distance in km
	}
}
