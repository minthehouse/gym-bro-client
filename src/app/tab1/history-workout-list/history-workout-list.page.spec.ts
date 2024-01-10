import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoryWorkoutListPage } from './history-workout-list.page';

describe('HistoryWorkoutListPage', () => {
  let component: HistoryWorkoutListPage;
  let fixture: ComponentFixture<HistoryWorkoutListPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryWorkoutListPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryWorkoutListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
