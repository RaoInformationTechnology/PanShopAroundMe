import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SinglePlacePage } from './single-place';

@NgModule({
  declarations: [
    SinglePlacePage,
  ],
  imports: [
    IonicPageModule.forChild(SinglePlacePage),
  ],
})
export class SinglePlacePageModule {}
