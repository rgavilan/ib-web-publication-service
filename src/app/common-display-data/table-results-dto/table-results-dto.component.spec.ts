import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { TableResultsDtoComponent } from './table-results-dto.component';

describe('TableResultsDtoComponent', () => {
  let component: TableResultsDtoComponent;
  let fixture: ComponentFixture<TableResultsDtoComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest().compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableResultsDtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



});
