import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';

import { ResearchmentStructuresDetailComponent } from './researchment-structures-detail.component';

describe('ResearchmentStructuresDetailComponent', () => {
  let component: ResearchmentStructuresDetailComponent;
  let fixture: ComponentFixture<ResearchmentStructuresDetailComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
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
