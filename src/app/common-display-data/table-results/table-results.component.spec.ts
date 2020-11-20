import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Page } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';

import { TableResultsComponent } from './table-results.component';

describe('TableResultsComponent', () => {
  let component: TableResultsComponent;
  let fixture: ComponentFixture<TableResultsComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest().compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
