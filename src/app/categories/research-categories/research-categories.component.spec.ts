import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';

import { ResearchCategoriesComponent } from './research-categories.component';

describe('ResearchCategoriesComponent', () => {
  let component: ResearchCategoriesComponent;
  let fixture: ComponentFixture<ResearchCategoriesComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
