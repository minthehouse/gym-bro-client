import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutTrackPage } from './workout-track.page';

describe('WorkoutTrackPage', () => {
  let component: WorkoutTrackPage;
  let fixture: ComponentFixture<WorkoutTrackPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WorkoutTrackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
