import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';

import { NewTreeComponent } from './new-tree.component';

describe('NewTreeComponent', () => {
  let component: NewTreeComponent;
  let fixture: ComponentFixture<NewTreeComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
