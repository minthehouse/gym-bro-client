import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DailyDietDetails } from './daily-diet-details.component';

describe('DailyDietDetails', () => {
  let component: DailyDietDetails;
  let fixture: ComponentFixture<DailyDietDetails>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DailyDietDetails],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyDietDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
