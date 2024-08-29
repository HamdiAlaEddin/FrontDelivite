import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetvehiculeComponent } from './getvehicule.component';

describe('GetvehiculeComponent', () => {
  let component: GetvehiculeComponent;
  let fixture: ComponentFixture<GetvehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetvehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetvehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
