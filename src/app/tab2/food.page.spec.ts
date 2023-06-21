import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { FoodPage } from './food.page';

describe('FoodPage', () => {
  let component: FoodPage;
  let fixture: ComponentFixture<FoodPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), ExploreContainerComponentModule, FoodPage],
}).compileComponents();

    fixture = TestBed.createComponent(FoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
