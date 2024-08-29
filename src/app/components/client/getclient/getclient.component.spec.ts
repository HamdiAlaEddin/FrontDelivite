import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetclientComponent } from './getclient.component';

describe('GetclientComponent', () => {
  let component: GetclientComponent;
  let fixture: ComponentFixture<GetclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
