import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignVolunteerToProjectComponent } from './assign-volunteer-to-project.component';

describe('AssignVolunteerToProjectComponent', () => {
  let component: AssignVolunteerToProjectComponent;
  let fixture: ComponentFixture<AssignVolunteerToProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignVolunteerToProjectComponent]
    });
    fixture = TestBed.createComponent(AssignVolunteerToProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
