import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartResultsComponent } from './bar-chart-results.component';

describe('BarChartResultsComponent', () => {
  let component: BarChartResultsComponent;
  let fixture: ComponentFixture<BarChartResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarChartResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
