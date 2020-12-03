import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestigationActionsComponent } from './investigation-actions/investigation-actions.component';
import { ResearchmentStructuresDetailComponent } from './researchment-structures-detail/researchment-structures-detail.component';
import { ResearchmentStructuresComponent } from './researchment-structures/researchment-structures.component';

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
    component: InvestigationActionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule { }
