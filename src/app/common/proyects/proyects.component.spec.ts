import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';

import { ProyectsComponent } from './proyects.component';

describe('ProyectsComponent', () => {
  let component: ProyectsComponent;
  let fixture: ComponentFixture<ProyectsComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
