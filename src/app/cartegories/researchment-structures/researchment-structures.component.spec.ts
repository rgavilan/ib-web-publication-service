import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchmentStructuresComponent } from './researchment-structures.component';

describe('ResearchmentStructuresComponent', () => {
  let component: ResearchmentStructuresComponent;
  let fixture: ComponentFixture<ResearchmentStructuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchmentStructuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchmentStructuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
