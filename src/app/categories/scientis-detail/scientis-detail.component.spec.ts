import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { ScientistService } from 'src/app/_services/scientist.service';
import { MockScientistService } from 'src/app/_services/_testingServices/mockScientist.service';

import { ScientisDetailComponent } from './scientis-detail.component';

describe('ScientisDetailComponent', () => {
  let component: ScientisDetailComponent;
  let fixture: ComponentFixture<ScientisDetailComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ScientistService, useClass: MockScientistService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientisDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
