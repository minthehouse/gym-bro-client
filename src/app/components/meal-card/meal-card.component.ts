import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class MealCardComponent implements OnInit, OnChanges {
  @Input() mealType: string;
  @Input() foodList: any;

  constructor(private cdr: ChangeDetectorRef) {}

  public ngOnInit(): void {
    console.log('changes 777', this.foodList);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.foodList?.currentValue) {
      this.foodList = changes?.foodList?.currentValue;
    }
    this.cdr.detectChanges();

    console.log('foodList 888', this.foodList[1]);
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
