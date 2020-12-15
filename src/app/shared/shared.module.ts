import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableResultsComponent } from '../common-display-data/table-results/table-results.component';
import { RouterModule } from '@angular/router';
import { PatentService } from '../_services/patent.service';
import { ScientistService } from '../_services/scientist.service';
import { DocumentService } from '../_services/document.service';

@NgModule({
  declarations: [PaginationComponent,
    TableResultsComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    PaginationModule,
    FormsModule,
    NgbModule
  ],
  exports: [PaginationComponent,
    RouterModule,
    TranslateModule,
    CommonModule,
    NgbModule,
    TableResultsComponent],
  providers: [
    PatentService,
    ScientistService,
    DocumentService
  ]
})
export class SharedModule { }
