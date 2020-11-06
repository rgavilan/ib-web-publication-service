import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableResultsComponent } from './table-results/table-results.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TableResultsComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [TableResultsComponent],
})
export class CommonDisplayDataModule {}
