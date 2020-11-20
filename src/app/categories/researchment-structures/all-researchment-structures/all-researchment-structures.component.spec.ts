import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllResearchmentStructuresComponent } from './all-researchment-structures.component';

describe('AllResearchmentStructuresComponent', () => {
  let component: AllResearchmentStructuresComponent;
  let fixture: ComponentFixture<AllResearchmentStructuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllResearchmentStructuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllResearchmentStructuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
