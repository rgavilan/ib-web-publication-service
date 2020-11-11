import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { ResearchmentStructuresComponent } from './researchment-structures/researchment-structures.component';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ResearchmentStructuresComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    NgxEchartsModule,
    LeafletModule,
    SharedModule,
  ],
})
export class CategoriesModule {}
