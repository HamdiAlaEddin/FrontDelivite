import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicComponent } from './vehic.component';

describe('VehicComponent', () => {
  let component: VehicComponent;
  let fixture: ComponentFixture<VehicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
