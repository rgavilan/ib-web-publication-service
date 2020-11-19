import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';

import { TopSearchComponent } from './top-search.component';
export class TranslateServiceStub{
    public get(key: any): any {
      
    }
}
describe('TopSearchComponent', () => {
  let component: TopSearchComponent;
  let fixture: ComponentFixture<TopSearchComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
