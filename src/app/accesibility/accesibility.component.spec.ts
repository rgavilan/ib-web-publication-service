import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccesibilityComponent } from './accesibility.component';

describe('AccesibilityComponent', () => {
  let component: AccesibilityComponent;
  let fixture: ComponentFixture<AccesibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccesibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccesibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
