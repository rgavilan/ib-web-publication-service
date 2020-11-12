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

@NgModule({
  declarations: [PaginationComponent, 
    TopSearchComponent, 
    ScientistSearchComponent, 
    TreeComponent, 
    GraphicComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    PaginationModule,
    FormsModule,
    LeafletModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  exports: [PaginationComponent, 
    TranslateModule, 
    CommonModule, 
    TopSearchComponent, 
    ScientistSearchComponent, 
    TreeComponent, 
    GraphicComponent]
})
export class SharedModule {}
