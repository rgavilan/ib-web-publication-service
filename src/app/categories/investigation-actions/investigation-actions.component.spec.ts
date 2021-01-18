import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { DocumentService } from 'src/app/_services/document.service';
import { PatentService } from 'src/app/_services/patent.service';
import { ProjectService } from 'src/app/_services/project.service';
import { MockDocumentService } from 'src/app/_services/_testingServices/mockDocument.service';
import { MockPatentService } from 'src/app/_services/_testingServices/mockPatent.service';
import { MockProjectService } from 'src/app/_services/_testingServices/mockProject.service';

import { InvestigationActionsComponent } from './investigation-actions.component';

describe('InvestigationActionsComponent', () => {
  let component: InvestigationActionsComponent;
  let fixture: ComponentFixture<InvestigationActionsComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: DocumentService, useClass: MockDocumentService },
      { provide: ProjectService, useClass: MockProjectService },
      { provide: PatentService, useClass: MockPatentService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
