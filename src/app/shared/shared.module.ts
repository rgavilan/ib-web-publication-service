import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [PaginationComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    PaginationModule,
    FormsModule,
  ],
  exports: [PaginationComponent, TranslateModule, CommonModule],
})
export class SharedModule {}
