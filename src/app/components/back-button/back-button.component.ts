import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
@Component({
  selector: 'app-back-btn',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-button.component.html',
})
export class BackBtnComponent {
  constructor(private location: Location) {}

  ngOnInit() {}

  clickToBack(): void {
    this.location.back();
  }
}
