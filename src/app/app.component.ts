import { Component } from "@angular/core";
// import { Network } from "@ionic-native/network";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { ListPlacesPage } from "../pages/list-places/list-places";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  rootPage: any = ListPlacesPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    // public network: Network
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  // disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  //   console.log("network was disconnected :-(");
  // });

  // connectSubscription = this.network.onConnect().subscribe(() => {
  //   console.log("network connected!");
  //   // We just got a connection but we need to wait briefly
  //   // before we determine the connection type. Might need to wait.
  //   // prior to doing any api requests as well.
  //   setTimeout(() => {
  //     if (this.network.type === "wifi") {
  //       console.log("we got a wifi connection, woohoo!");
  //     }
  //   }, 3000);
  // });
}
