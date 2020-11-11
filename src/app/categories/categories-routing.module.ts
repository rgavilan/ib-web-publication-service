import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
