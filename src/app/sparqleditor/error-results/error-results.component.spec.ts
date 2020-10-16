import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorResultsComponent } from './error-results.component';

describe('ErrorResultsComponent', () => {
  let component: ErrorResultsComponent;
  let fixture: ComponentFixture<ErrorResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
