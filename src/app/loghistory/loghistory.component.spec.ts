import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoghistoryComponent } from './loghistory.component';

describe('LoghistoryComponent', () => {
  let component: LoghistoryComponent;
  let fixture: ComponentFixture<LoghistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoghistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoghistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
