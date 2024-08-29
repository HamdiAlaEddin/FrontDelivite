import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRestoComponent } from './register-resto.component';

describe('RegisterRestoComponent', () => {
  let component: RegisterRestoComponent;
  let fixture: ComponentFixture<RegisterRestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterRestoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
