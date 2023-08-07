import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IonicModule } from '@ionic/angular';
import * as d3 from 'd3';

@Component({
  selector: 'app-daily-calories-intake',
  templateUrl: './daily-calories-intake.component.html',
  styleUrls: ['./daily-calories-intake.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule, MatFormFieldModule],
})
export class DailyCaloriesIntakeComponent implements OnInit, OnChanges {
  @Input() foodItems: any;

  public goal: number = 3300;
  public taken: number;
  public remaining: number;
  public currentSegment = 'Nutritions';
  public intakeForm: FormGroup;

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

  ngOnInit() {
    this.drawChart();
    console.log('foodItems', this.foodItems);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.foodItems.currentValue) {
      console.log('what is in chages', changes.foodItems.currentValue);
      const data = changes.foodItems.currentValue;
      this.foodItems = data;
      this.intakeForm.controls.calories.setValue(
        data.reduce((totalCalories, item) => totalCalories + parseFloat(item.calories), 0),
      );
      this.setRemainingCalories();

      this.intakeForm.get('nutritions').setValue({
        protein: data.reduce((totalCalories, item) => totalCalories + parseFloat(item.protein), 0),
        carbohydrates: data.reduce((totalCalories, item) => totalCalories + parseFloat(item.carbohydrates), 0),
        fat: data.reduce((totalCalories, item) => totalCalories + parseFloat(item.fat), 0),
      });

      console.log('what is in chages', this.intakeForm.value);
    }
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.currentSegment = ev.detail.value;
  }

  setRemainingCalories() {
    this.remaining = this.goal - this.intakeForm.controls.calories.value;
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

  drawChart() {
    const data = [
      { nutrient: 'Protein', goal: 100, intake: 80 },
      { nutrient: 'Fat', goal: 70, intake: 60 },
      { nutrient: 'Carb', goal: 150, intake: 140 },
      // Add more data for other nutrients as needed
    ];

    // Define chart dimensions and margins
    const margin = { top: 30, right: 10, bottom: 50, left: 40 };
    const width = window.innerWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Create SVG element
    const svg = d3
      .select('#chart-container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define scales
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.nutrient))
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.goal, d.intake))])
      .range([height, 0]);

    // Define colors for the stacked bars
    const colors = d3.scaleOrdinal().domain(['goal', 'intake']).range(['#1f77b4', '#ff7f0e']);

    // Create stacked bars
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bar')
      .attr('transform', d => `translate(${xScale(d.nutrient)},0)`)
      .selectAll('rect')
      .data(d => [
        { key: 'goal', value: d.goal },
        { key: 'intake', value: d.intake },
      ])
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', d => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.value))
      .attr('fill', d => colors(d.key));

    // Add x-axis
    svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale));

    // Add y-axis
    svg.append('g').call(d3.axisLeft(yScale));

    // Add axis labels
    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', width)
      .attr('y', height + margin.top + 20)
      .text('Nutrients');

    svg
      .append('text')
      .attr('text-anchor', 'end')
      .attr('x', 0)
      .attr('y', -margin.left + 20)
      .attr('transform', 'rotate(-90)')
      .text('Amount');

    // Make the chart responsive to window size changes
    window.addEventListener('resize', () => {
      const newWidth = window.innerWidth - margin.left - margin.right;
      svg.attr('width', newWidth + margin.left + margin.right);
      xScale.range([0, newWidth]);
      svg.selectAll('rect').attr('width', xScale.bandwidth());
      svg.select('.x-axis').call(d3.axisBottom(xScale));
    });
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
