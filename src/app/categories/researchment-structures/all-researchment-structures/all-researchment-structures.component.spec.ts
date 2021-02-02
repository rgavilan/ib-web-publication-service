import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { ResearchmentStructuresService } from 'src/app/_services/researchment.structures.service';
import { MockResearchmentStructuresService } from 'src/app/_services/_testingServices/mockResearchmentStructuresService.service';

import { AllResearchmentStructuresComponent } from './all-researchment-structures.component';

describe('AllResearchmentStructuresComponent', () => {
  let component: AllResearchmentStructuresComponent;
  let fixture: ComponentFixture<AllResearchmentStructuresComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
    TestBed.configureTestingModule({
      providers: [{ provide: ResearchmentStructuresService, useClass: MockResearchmentStructuresService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllResearchmentStructuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
