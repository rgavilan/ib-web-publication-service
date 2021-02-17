import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PageRequest } from 'src/app/_helpers/search';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { ParticipantService } from 'src/app/_services/participant.service';
import { ResearchStaffService } from 'src/app/_services/research-staff.service';
import { MockParticipantService } from 'src/app/_services/_testingServices/mockParticipant.service';
import { MockResearchStaffService } from 'src/app/_services/_testingServices/mockResearchStaff.service';

import { ParticipantsComponent } from './participants.component';

describe('ParticipantsComponent', () => {
  let component: ParticipantsComponent;
  let fixture: ComponentFixture<ParticipantsComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ResearchStaffService, useClass: MockResearchStaffService },
      { provide: ParticipantService, useClass: MockParticipantService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should init component', fakeAsync(() => {
    component.ngOnInit();
    tick(450);
    expect(component.loaded).toBeTruthy();
  }));

  it('allfilter', () => {
    component.allScientistsFilteredPageChanged(1);
    expect(component.loaded).toBeTruthy();
  });

  it('allParticipantsFilteredPageChanged', () => {
    component.allParticipantsFilteredPageChanged(1);
    expect(component.loaded).toBeTruthy();
  });

  it('allParticipantsFilteredSizeChanged', () => {
    component.allParticipantsFilteredSizeChanged(1);
    expect(component.loaded).toBeTruthy();
  });
  it('allParticipantsFilteredSortChanged', () => {
    const pager: PageRequest = new PageRequest();
    component.allParticipantsFilteredSortChanged(pager);
    expect(component.loaded).toBeTruthy();
  });
});
