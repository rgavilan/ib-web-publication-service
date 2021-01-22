import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';

import { DocumentDetailComponent } from './document-detail.component';

describe('DocumentDetailComponent', () => {
  let component: DocumentDetailComponent;
  let fixture: ComponentFixture<DocumentDetailComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
