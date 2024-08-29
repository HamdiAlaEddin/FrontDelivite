import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetLivraisonComponent } from './get-livraison.component';

describe('GetLivraisonComponent', () => {
  let component: GetLivraisonComponent;
  let fixture: ComponentFixture<GetLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetLivraisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
