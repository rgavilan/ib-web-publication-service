import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SPARQLEditorComponent } from './sparqleditor.component';

const routes: Routes = [
  {
    path: '',
    component: SPARQLEditorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SparqleditorRoutingModule {}
