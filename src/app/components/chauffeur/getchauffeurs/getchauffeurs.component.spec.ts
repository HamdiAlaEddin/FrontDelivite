import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetchauffeursComponent } from './getchauffeurs.component';

describe('GetchauffeursComponent', () => {
  let component: GetchauffeursComponent;
  let fixture: ComponentFixture<GetchauffeursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetchauffeursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetchauffeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
