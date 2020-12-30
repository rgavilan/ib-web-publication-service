import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageRequest } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';

import { StartupComponent } from './startup.component';

describe('StartupComponent', () => {
  let component: StartupComponent;
  let fixture: ComponentFixture<StartupComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // data
    expect(component).toBeTruthy();
  });

  it('should filterDocuments', () => {
    component.filterDocuments();
    expect(component.loaded).toBeTruthy();
  });

  it('should allStartupFilteredPageChanged', () => {
    component.allStartupFilteredPageChanged(1);
    expect(component.loaded).toBeTruthy();
  });
  it('should allParticipantsFilteredSizeChanged', () => {
    component.allStartupFilteredSizeChanged(1);
    expect(component.loaded).toBeTruthy();
  });

  it('should allStartupFilteredSortChanged', () => {
    const page: PageRequest = new PageRequest();
    component.allStartupFilteredSortChanged(page);
    expect(component.loaded).toBeTruthy();
  });
});
