import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchmentStructuresDetailComponent } from './researchment-structures-detail.component';

describe('ResearchmentStructuresDetailComponent', () => {
  let component: ResearchmentStructuresDetailComponent;
  let fixture: ComponentFixture<ResearchmentStructuresDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchmentStructuresDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchmentStructuresDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
