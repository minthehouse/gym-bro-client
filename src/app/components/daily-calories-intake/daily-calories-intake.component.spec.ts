import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyCaloriesIntakeComponent } from './daily-calories-intake.component';

describe('DailyCaloriesIntakeComponent', () => {
  let component: DailyCaloriesIntakeComponent;
  let fixture: ComponentFixture<DailyCaloriesIntakeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DailyCaloriesIntakeComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyCaloriesIntakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
