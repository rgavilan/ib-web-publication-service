import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopResearchmentStructuresComponent } from './top-researchment-structures.component';

describe('TopResearchmentStructuresComponent', () => {
  let component: TopResearchmentStructuresComponent;
  let fixture: ComponentFixture<TopResearchmentStructuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopResearchmentStructuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopResearchmentStructuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
