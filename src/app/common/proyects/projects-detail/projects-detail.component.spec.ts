import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { ProjectService } from 'src/app/_services/project.service';
import { MockProjectService } from 'src/app/_services/_testingServices/mockProject.service';

import { ProjectsDetailComponent } from './projects-detail.component';

describe('ProjectsDetailComponent', () => {
  let component: ProjectsDetailComponent;
  let fixture: ComponentFixture<ProjectsDetailComponent>;
  let projectService: MockProjectService;
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ProjectService, useClass: MockProjectService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsDetailComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(MockProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
