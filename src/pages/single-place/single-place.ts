import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AroundMeProvider} from "../../providers/around-me/around-me";
import { InAppBrowser } from '@ionic-native/in-app-browser';


@IonicPage()
@Component({
  selector: 'page-single-place',
  templateUrl: 'single-place.html',
  providers : [AroundMeProvider,InAppBrowser]
})
export class SinglePlacePage {
	place;
  constructor(public navCtrl: NavController, public navParams: NavParams, private aroundMe:AroundMeProvider, private iab:InAppBrowser) {
  	this.place = navParams.get("place");
  }

  getPhoto(place){
    if("photos" in place){
      var photo_ref = place.photos[0].photo_reference;
      var apiKey = this.aroundMe.getAPIKEY();
      console.log(photo_ref,apiKey);
      return "https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference="+photo_ref+"&key="+apiKey;
    }
    else{
      return "assets/images/no_photo.jpg";
    }
  }


  getOpeningHours(place){
    if("opening_hours" in place){
      if("open_now" in place.opening_hours){
        if(place.opening_hours.open_now){
          return "<button class='button button-secondary button-full text-bold'>  Open Now!  <span class='font-14'> &#10004;</span></button>"
        }
        else{
          return "<button class='button button-danger button-full text-bold'>  Closed  <span class='font-14'> &#x1F550;</span></button>"
        }
      }
      else{
        return "<button class='button button-primary button-full text-bold'> <span class='font-14'> &#x1F550;</span> Open Now not available</button>";
      }
    }
    else{
      return "<button class='button button-primary button-full text-bold'> <span class='font-14'> &#x1F550;</span>  Opening Hours not available </button>";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SinglePlacePage');
  }

  getRating(place){
    if("rating" in place){
      return "Rating : "+place.rating+" / 5";
    }
    else{
      return "Rating Unavailable";
    }
  }

  doDrive(place){
    console.log("Driving to http://www.google.com/maps/place/"+place.geometry.location.lat+","+place.geometry.location.lng)
    const browser = this.iab.create("http://www.google.com/maps/place/"+place.geometry.location.lat+","+place.geometry.location.lng);
    browser.close();
  }



}
