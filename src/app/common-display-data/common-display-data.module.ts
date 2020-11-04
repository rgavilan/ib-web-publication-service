import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableResultsComponent } from './table-results/table-results.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TableResultsComponent],
  imports: [CommonModule, RouterModule],
  exports: [TableResultsComponent],
})
export class CommonDisplayDataModule {}
