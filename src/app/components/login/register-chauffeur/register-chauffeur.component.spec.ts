import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterChauffeurComponent } from './register-chauffeur.component';

describe('RegisterChauffeurComponent', () => {
  let component: RegisterChauffeurComponent;
  let fixture: ComponentFixture<RegisterChauffeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterChauffeurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
