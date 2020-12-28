import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { DirectedJobsService } from 'src/app/_services/directedJobs.service';
import { MockDirectedJobsService } from 'src/app/_services/_testingServices/mockDirectedJobs.service';

import { DirectedJobsComponent } from './directed-jobs.component';

describe('DirectedJobsComponent', () => {
  let component: DirectedJobsComponent;
  let fixture: ComponentFixture<DirectedJobsComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: DirectedJobsService, useClass: MockDirectedJobsService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
