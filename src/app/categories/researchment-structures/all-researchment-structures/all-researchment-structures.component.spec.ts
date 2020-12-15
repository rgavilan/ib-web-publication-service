import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';

import { AllResearchmentStructuresComponent } from './all-researchment-structures.component';

describe('AllResearchmentStructuresComponent', () => {
  let component: AllResearchmentStructuresComponent;
  let fixture: ComponentFixture<AllResearchmentStructuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        ToastrModule.forRoot(),
        HttpClientModule,
        FormsModule,
      ],
      declarations: [AllResearchmentStructuresComponent],
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
