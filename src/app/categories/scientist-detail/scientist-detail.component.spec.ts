import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { ScientistService } from 'src/app/_services/scientist.service';
import { MockScientistService } from 'src/app/_services/_testingServices/mockScientist.service';

import { ScientistDetailComponent } from './scientist-detail.component';

describe('ScientisDetailComponent', () => {
  let component: ScientistDetailComponent;
  let fixture: ComponentFixture<ScientistDetailComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ScientistService, useClass: MockScientistService }]
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
