import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';

import { ScientistSearchComponent } from './scientist-search.component';

describe('ScientistSearchComponent', () => {
  let component: ScientistSearchComponent;
  let fixture: ComponentFixture<ScientistSearchComponent>;
  beforeEach(async(() => {
    TestingHelper.configureTest()
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientistSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
