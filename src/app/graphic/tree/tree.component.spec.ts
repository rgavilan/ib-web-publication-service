import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';

import { TreeComponent } from './tree.component';

describe('TreeComponent', () => {
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;

  beforeEach(async(() => {
    TestingHelper.configureTest()
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not find Style', () => {
    const node = { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] };
    const result = component.findStyle(node);
    expect(result).toBeFalsy();
  });

  it('should find Style', () => {
    const node = { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [], lineStyle: '' };
    const result = component.findStyle(node);
    expect(result).toBeTruthy();
  });

  describe('is First Line', () => {
    it('is First Line expect to return no, because there is no children', () => {
      const node = { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [], lineStyle: '' };
      const result = component.isFirstLine(node, 'Ingeniería Química');
      expect(result).toBeFalsy();
    });
    it('is First Line should return true because it has children', () => {
      const node = { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [{ name: 'Ingeniería Química', value: 'IQM', selected: false, children: [], lineStyle: '' }], lineStyle: '' };
      const result = component.isFirstLine(node, 'Ingeniería Química');
      expect(result).toBeTruthy();
    });
    it('is First Line should return true because it has children but no match because of different name', () => {
      const node = { name: 'Ingeniería Química', value: 'IQM', selected: false, children: [{ name: 'Ingeniería Química', value: 'IQM', selected: false, children: [], lineStyle: '' }], lineStyle: '' };
      const result = component.isFirstLine(node, 'Ingeniería');
      expect(result).toBeFalsy();
    });
  });

  describe('clean Node', () => {
    it('should change color node to grey', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: false, lineStyle: '', children:
          [{ name: 'Ingeniería Química', value: 'IQM', selected: false, children: [], lineStyle: { color: '' } }],
      };
      component.cleanNode(node, 'Ingeniería Química');
      fixture.detectChanges();
      expect(node.children[0].lineStyle.color).toBe('grey')
    });

    it('should change color node to grey and assign object', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: false, lineStyle: '', children:
          [{ name: 'Ingeniería Química', value: 'IQM', selected: false, children: [] }],
      };
      component.cleanNode(node, 'Ingeniería Química');
      fixture.detectChanges();
      expect(node.children[0].hasOwnProperty('lineStyle')).toBeTruthy();
    });


  });

  describe('search Insede Nodes', () => {
    it('search should find node', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: false, lineStyle: '', children:
          [{ name: 'Ingeniería', value: 'IQM', selected: false, children: [], lineStyle: { color: 'black' } }],
      };
      const result = component.searchInsedeNodes(node, 'Ingeniería');
      expect(result).toBeTruthy();
    });

    it('search should not find node', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: false, lineStyle: '', children:
          [{ name: 'Ingeniería', value: 'IQM', selected: false, children: [], lineStyle: { color: 'black' } }],
      };
      const result = component.searchInsedeNodes(node, 'Ingeniería 2');
      expect(result).toBeFalsy();
    });

    it('search should not find node but search inside next children', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: false, lineStyle: '', children:
          [{
            name: 'Ingeniería', value: 'IQM', selected: false,
            children: [{ name: 'Ingeniería', value: 'IQM', selected: false, children: [], lineStyle: { color: 'black' } }], lineStyle: { color: 'black' }
          }],
      };
      const result = component.searchInsedeNodes(node, 'Ingeniería 2');
      expect(result).toBeFalsy();
    });

    it('search should not find node but not search inside children', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: false, lineStyle: '', children:
          [{ name: 'Ingeniería', value: 'IQM', selected: false, lineStyle: { color: 'black' } }],
      };
      const result = component.searchInsedeNodes(node, 'Ingeniería 2');
      expect(result).toBeFalsy();
    });
  });

  describe('isNodeSelected', () => {
    it('should return true because node is selected', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: true, lineStyle: '', children:
          [{
            name: 'Ingeniería', value: 'IQM', selected: true, children: [
              { name: 'Ingeniería Química', value: 'IQM', selected: true, children: [], lineStyle: { color: 'black' } }
            ], lineStyle: { color: 'black' }
          }],
      };
      const result = component.isNodeSelected(node, 'Ingeniería Química');
      expect(result).toBeTruthy();
    });

    it('should return true because node is not selected', () => {
      const node = {
        name: 'Ingeniería Química', value: 'IQM', selected: true, lineStyle: '', children:
          [{ name: 'Ingeniería', value: 'IQM', selected: false, children: [], lineStyle: { color: 'black' } }],
      };
      const result = component.isNodeSelected(node, 'Ingeniería Química');
      expect(result).toBeFalsy();
    });
  });

});
