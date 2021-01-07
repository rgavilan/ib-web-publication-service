import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsDetailComponent } from '../common/proyects/projects-detail/projects-detail.component';
import { InvestigationActionsComponent } from './investigation-actions/investigation-actions.component';
import { ResearchCategoriesComponent } from './research-categories/research-categories.component';
import { ResearchmentStructuresDetailComponent } from './researchment-structures-detail/researchment-structures-detail.component';
import { ResearchmentStructuresComponent } from './researchment-structures/researchment-structures.component';
import { ScientistDetailComponent } from './scientist-detail/scientist-detail.component';
import { ScientistComponent } from './scientist/scientist.component';

const routes: Routes = [
  {
    path: 'researchmentStructures',
    component: ResearchmentStructuresComponent,
  },
  {
    path: 'researchmentStructures/:id',
    component: ResearchmentStructuresDetailComponent,
  },
  {
    path: 'investigation-actions',
    component: InvestigationActionsComponent,
  },
  {
    path: 'investigation-actions/project/:id',
    component: ProjectsDetailComponent,
  },
  {
    path: 'researchmentStructures/:proyect/project/:id',
    component: ProjectsDetailComponent,
  },
  {
    path: 'scientist',
    component: ScientistComponent,
  },
  {
    path: 'scientist/:id',
    component: ScientistDetailComponent,
  },
  {
    path: 'research-categories',
    component: ResearchCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule { }
