import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationActionsComponent } from './investigation-actions.component';

describe('InvestigationActionsComponent', () => {
  let component: InvestigationActionsComponent;
  let fixture: ComponentFixture<InvestigationActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
