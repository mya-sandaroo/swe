import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingFormComponentComponent } from './meeting.form.component.component';

describe('MeetingFormComponentComponent', () => {
  let component: MeetingFormComponentComponent;
  let fixture: ComponentFixture<MeetingFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingFormComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetingFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
