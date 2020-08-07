import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SPARQLEditorComponent } from './sparqleditor.component';
import { TestingHelper } from '../_helpers/testing.spec';

describe('SPARQLEditorComponent', () => {
  let component: SPARQLEditorComponent;
  let fixture: ComponentFixture<SPARQLEditorComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SPARQLEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
