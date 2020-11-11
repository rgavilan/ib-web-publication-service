import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TopSearchComponent } from '../common/top-search/top-search.component';
import { ScientistSearchComponent } from '../common/scientist-search/scientist-search.component';

@NgModule({
  declarations: [PaginationComponent, TopSearchComponent, ScientistSearchComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    PaginationModule,
    FormsModule,
  ],
  exports: [PaginationComponent, TranslateModule, CommonModule, TopSearchComponent, ScientistSearchComponent]
})
export class SharedModule {}
