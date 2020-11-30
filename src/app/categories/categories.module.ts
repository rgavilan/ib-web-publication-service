import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CategoriesRoutingModule } from './categories-routing.module';
import { ResearchmentStructuresComponent } from './researchment-structures/researchment-structures.component';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SharedModule } from '../shared/shared.module';
import { ResearchmentStructuresDetailComponent } from './researchment-structures-detail/researchment-structures-detail.component';
import { CommonDisplayDataModule } from '../common-display-data/common-display-data.module';
import { AllResearchmentStructuresComponent } from './researchment-structures/all-researchment-structures/all-researchment-structures.component';
import { TopResearchmentStructuresComponent } from './researchment-structures/top-researchment-structures/top-researchment-structures.component';
import { ResearchmentStructuresByFinancingComponent } from './researchment-structures/researchment-structures-chart-by-financing/researchment-structures-chart-by-financing.component';
import { InvestigationActionsComponent } from './investigation-actions/investigation-actions.component';
import { ResearchmentStructuresByQSComponent } from './researchment-structures/researchment-structures-chart-by-qs/researchment-structures-chart-by-qs.component';
import { TreeComponent } from '../graphic/tree/tree.component';
import { GraphicComponent } from '../graphic/graphic.component';
import { NewTreeComponent } from '../graphic/new-tree/new-tree.component';
import { PatentsComponent } from '../common/patents/patents.component';
import { ProyectsComponent } from '../common/proyects/proyects.component';
import { ScientificProductionComponent } from '../common/scientific-production/scientific-production.component';
import { ScientistSearchComponent } from '../common/scientist-search/scientist-search.component';
import { TopSearchComponent } from '../common/top-search/top-search.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ResearchmentStructuresComponent, ResearchmentStructuresDetailComponent, AllResearchmentStructuresComponent,
    TopResearchmentStructuresComponent, ResearchmentStructuresByFinancingComponent, ResearchmentStructuresByQSComponent,
    InvestigationActionsComponent, TreeComponent, GraphicComponent, NewTreeComponent, PatentsComponent,
    ProyectsComponent, ScientificProductionComponent, ScientistSearchComponent, TopSearchComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    NgxEchartsModule,
    LeafletModule,
    SharedModule,
    TabsModule.forRoot(),
    TranslateModule.forChild(),
    LeafletModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    })
  ]
})
export class CategoriesModule { }
