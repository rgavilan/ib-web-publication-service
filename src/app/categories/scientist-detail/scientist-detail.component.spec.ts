import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { DocumentService } from 'src/app/_services/document.service';
import { ScientistService } from 'src/app/_services/scientist.service';
import { MockDocumentService } from 'src/app/_services/_testingServices/mockDocument.service';
import { MockScientistService } from 'src/app/_services/_testingServices/mockScientist.service';

import { ScientistDetailComponent } from './scientist-detail.component';

describe('ScientisDetailComponent', () => {
  let component: ScientistDetailComponent;
  let fixture: ComponentFixture<ScientistDetailComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ScientistService, useClass: MockScientistService },
      { provide: DocumentService, useClass: MockDocumentService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
