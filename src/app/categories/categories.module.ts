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

@NgModule({
  declarations: [ResearchmentStructuresComponent, ResearchmentStructuresDetailComponent, AllResearchmentStructuresComponent,
    TopResearchmentStructuresComponent, ResearchmentStructuresByFinancingComponent, ResearchmentStructuresByQSComponent,
    InvestigationActionsComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    FormsModule,
    NgxEchartsModule,
    LeafletModule,
    SharedModule,
    TabsModule.forRoot()
  ],
})
export class CategoriesModule { }
