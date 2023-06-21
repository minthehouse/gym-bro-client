import { Component } from '@angular/core';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-food',
    templateUrl: 'food.page.html',
    styleUrls: ['food.page.scss'],
    standalone: true,
    imports: [IonicModule, ExploreContainerComponent],
})
export class FoodPage {
  constructor() {}
}
