import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodPage } from './food.page';


import { FoodPageRoutingModule } from './food-routing.module';

@NgModule({
    imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FoodPageRoutingModule,
    FoodPage,
],
})
export class FoodPageModule {}
