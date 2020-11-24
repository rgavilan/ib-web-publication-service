import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { MockProjectService } from 'src/app/_services/_testingServices/mockProject.service';
import { ProjectService } from 'src/app/_services/project.service';

import { ProyectsComponent } from './proyects.component';

describe('ProyectsComponent', () => {
  let component: ProyectsComponent;
  let fixture: ComponentFixture<ProyectsComponent>;
  let projectService: MockProjectService;
  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ProjectService, useClass: MockProjectService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectsComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(MockProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create execute ngOnInit and populate data table to show', () => {
    spyOn(projectService, 'findProjectByFilters').and.callThrough();
    spyOn(component, 'ngOnInit').and.callThrough();
    fixture.detectChanges();
    expect(component.allProjectFiltered.content[0].head.vars.length).toBe(6);
    expect(component.allProjectFiltered.content[0].results.bindings.length).not.toBe(0);
  });
});
