import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingJoinComponentComponent } from './meeting.join.component.component';

describe('MeetingJoinComponentComponent', () => {
  let component: MeetingJoinComponentComponent;
  let fixture: ComponentFixture<MeetingJoinComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingJoinComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetingJoinComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
