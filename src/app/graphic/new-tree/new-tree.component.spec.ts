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

  describe('area Clicked', () => {
    it('expect to emit value on array filter', () => {
      const area = {
        name: 'Ciencias y tecnologías quimicas',
        value: 'CTQ',
        selected: true,
        children: [
          { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] },
          { name: 'Química', value: 'QMC', selected: false, children: [] }
        ]
      };
      component.areaClicked(area, null);
      expect(component.filter[0]).toBe('CTQ');
    });

    it('expect to emit value of IMQ', () => {
      component.filter = ['CTQ'];
      const parent = {
        name: 'Ciencias y tecnologías quimicas',
        value: 'CTQ',
        selected: false,
        children: [
          { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] },
          { name: 'Química', value: 'QMC', selected: false, children: [] }
        ]
      };
      const area = { name: 'Ingeniería Química', value: 'IQM', selected: true, children: [] };
      spyOn(component.filterChanged, 'emit');
      component.areaClicked(area, parent);
      expect(component.filterChanged.emit).toHaveBeenCalledWith(['IQM']);
    });

    it('delete parent from filter when clicking on child', () => {
      component.filter = ['CTQ'];
      const parent = {
        name: 'Ciencias y tecnologías quimicas',
        value: 'CTQ',
        selected: true,
        children: [
          { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] },
          { name: 'Química', value: 'QMC', selected: false, children: [] }
        ]
      };
      const area = { name: 'Ingeniería Química', value: 'IQM', selected: true, children: [] };
      spyOn(component.filterChanged, 'emit');
      component.areaClicked(area, parent);
      expect(component.filterChanged.emit).toHaveBeenCalledWith(['IQM']);
    });
  });
});
