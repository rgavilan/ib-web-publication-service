import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
});
