import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TopSearchComponent } from '../common/top-search/top-search.component';
import { ScientistSearchComponent } from '../common/scientist-search/scientist-search.component';
import { TreeComponent } from '../graphic/tree/tree.component';
import { GraphicComponent } from '../graphic/graphic.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NewTreeComponent } from '../graphic/new-tree/new-tree.component';
import { ScientificProductionComponent } from '../common/scientific-production/scientific-production.component';
import { ProyectsComponent } from '../common/proyects/proyects.component';
import { PatentsComponent } from '../common/patents/patents.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScientificProductionService } from '../_services/scientificProduction.service';
import { TableResultsComponent } from '../common-display-data/table-results/table-results.component';
import { RouterModule } from '@angular/router';
import { PatentService } from '../_services/patent.service';
import { ScientistService } from '../_services/scientist.service';

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
    ScientificProductionService,
    PatentService,
    ScientistService
  ]
})
export class SharedModule { }
