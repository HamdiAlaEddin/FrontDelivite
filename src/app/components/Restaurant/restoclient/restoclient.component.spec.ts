import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoclientComponent } from './restoclient.component';

describe('RestoclientComponent', () => {
  let component: RestoclientComponent;
  let fixture: ComponentFixture<RestoclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestoclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
