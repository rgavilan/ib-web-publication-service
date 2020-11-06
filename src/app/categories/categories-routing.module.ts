import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResearchmentStructuresComponent } from './researchment-structures/researchment-structures.component';

const routes: Routes = [
  {
    path: 'researchmentStructures',
    component: ResearchmentStructuresComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
