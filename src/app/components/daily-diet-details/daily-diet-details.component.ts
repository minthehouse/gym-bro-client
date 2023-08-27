import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IonicModule } from '@ionic/angular';
import { MealCardComponent } from '../meal-card/meal-card.component';
import { drawChart } from 'src/app/utils/draw-graph';

@Component({
  selector: 'app-daily-diet-details',
  templateUrl: './daily-diet-details.component.html',
  styleUrls: ['./daily-diet-details.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule, MatFormFieldModule, MealCardComponent],
})
export class DailyDietDetails implements OnInit, OnChanges {
  @Input() foodItems: any;

  public goal: number = 3300;
  public taken: number;
  public remaining: number;
  public currentSegment = 'Nutritions';
  public intakeForm: FormGroup;
  public foodList: {
    [key: number]: {
      name: string;
      calories: string | null;
      meal_type_id: number;
      protein;
      carbohydrates;
      fat;
      serving_weight: any;
    }[];
  } = {
    1: [],
    2: [],
    3: [],
    4: [],
  };

  constructor() {
    this.intakeForm = new FormGroup({
      calories: new FormControl('', [Validators.required]),
      nutritions: new FormGroup({
        protein: new FormControl('', [Validators.required]),
        carbohydrates: new FormControl('', [Validators.required]),
        fat: new FormControl('', [Validators.required]),
      }),
    });
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.foodItems?.currentValue) {
      console.log('what is in chages', changes.foodItems.currentValue);
      const data = changes.foodItems.currentValue;
      this.foodItems = data;
      this.setFoodList(data);
      this.intakeForm.controls.calories.setValue(
        data.reduce((totalCalories, item) => totalCalories + parseFloat(item.calories), 0),
      );

      this.intakeForm.get('nutritions').setValue({
        protein: data.reduce((totalCalories, item) => totalCalories + parseFloat(item.protein), 0),
        carbohydrates: data.reduce((totalCalories, item) => totalCalories + parseFloat(item.carbohydrates), 0),
        fat: data.reduce((totalCalories, item) => totalCalories + parseFloat(item.fat), 0),
      });

      this.setRemainingCalories();
      drawChart(this.intakeForm.value.nutritions);
    }
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.currentSegment = ev.detail.value;
  }

  setFoodList(foodItems) {
    this.foodList = foodItems.reduce((result, foodItem) => {
      const { meal_type_id } = foodItem;

      // Create an empty array if the key doesn't exist in the result
      if (!result[meal_type_id]) {
        result[meal_type_id] = [];
      }

      // Push the food item into the corresponding array
      result[meal_type_id].push({
        name: foodItem.name,
        calories: foodItem.calories,
        meal_type_id: foodItem.meal_type_id,
        protein: foodItem.protein,
        carbohydrates: foodItem.carbohydrates,
        fat: foodItem.fat,
        serving_weight: foodItem.serving_weight,
      });

      return result;
    }, {});
  }

  setRemainingCalories() {
    this.remaining = this.goal - this.intakeForm.controls.calories.value;
  }

  public getMealType(foodGroupKey: string): string {
    switch (foodGroupKey) {
      case '1':
        return 'Breakfast';
      case '2':
        return 'Lunch';
      case '3':
        return 'Dinner';
      case '4':
        return 'Snack';
      default:
        return '';
    }
  }
}
