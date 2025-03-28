import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceAccessComponent } from './space-access.component';

describe('SpaceAccessComponent', () => {
  let component: SpaceAccessComponent;
  let fixture: ComponentFixture<SpaceAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceAccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaceAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
