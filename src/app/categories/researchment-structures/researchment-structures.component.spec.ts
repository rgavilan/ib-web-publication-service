import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { ResearchmentStructuresComponent } from './researchment-structures.component';

describe('ResearchmentStructuresComponent', () => {
  let component: ResearchmentStructuresComponent;
  let fixture: ComponentFixture<ResearchmentStructuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        HttpClientModule,
        FormsModule,
      ],
      declarations: [ResearchmentStructuresComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchmentStructuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
