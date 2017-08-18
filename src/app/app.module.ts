import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { ListPlacesPage } from '../pages/list-places/list-places';
import { SinglePlacePage } from '../pages/single-place/single-place';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AroundMeProvider } from '../providers/around-me/around-me';

import { SafePipe } from "../pipes/safe/safe";
import { OrderByPipe } from "../pipes/order-by/order-by";


@NgModule({
  declarations: [
    MyApp,
    ListPlacesPage,
    SinglePlacePage,
    SafePipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPlacesPage,
    SinglePlacePage
  ],
  providers: [
    HttpModule,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AroundMeProvider
  ]
})
export class AppModule {}
