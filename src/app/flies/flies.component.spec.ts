import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FliesComponent } from './flies.component';

describe('FliesComponent', () => {
  let component: FliesComponent;
  let fixture: ComponentFixture<FliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FliesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
