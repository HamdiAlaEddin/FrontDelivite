import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorilogComponent } from './historilog.component';

describe('HistorilogComponent', () => {
  let component: HistorilogComponent;
  let fixture: ComponentFixture<HistorilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorilogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
