import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-daily-calories-intake',
  templateUrl: './daily-calories-intake.component.html',
  styleUrls: ['./daily-calories-intake.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule],
})
export class DailyCaloriesIntakeComponent implements OnInit, OnChanges {
  constructor() {}
  @Input() foodItems: any;

  public goal: number;
  public taken: number;
  public remaining: number;
  public currentSegment = 'Calories';

  ngOnInit() {
    this.setCalories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.foodItems.currentValue) {
      this.foodItems = changes.foodItems.currentValue;
      this.setCalories();
    }
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.currentSegment = ev.detail.value;
    this.setCalories();
  }

  setCalories() {
    if (this.currentSegment === 'Calories') {
      this.goal = 3000;
      this.taken = this.calculateTotalValue('kcal');
    } else if (this.currentSegment === 'Nutritions') {
      this.goal = 220;
      this.taken = this.calculateTotalValue('protein');
    }
    this.remaining = this.goal - this.taken;
  }

  public calculateTotalValue(property: string): number {
    let totalValue = 0;

    for (const mealTypeId in this.foodItems) {
      const items = this.foodItems[mealTypeId];

      for (const item of items) {
        const value = parseInt(item[property], 10);
        if (!isNaN(value)) {
          totalValue += value;
        }
      }
    }

    return totalValue;
  }
}
