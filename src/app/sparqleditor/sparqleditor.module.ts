// -------------- Modules --------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SparqleditorRoutingModule } from './sparqleditor-routing.module';

// -------------- Components --------------
import { SPARQLEditorComponent } from './sparqleditor.component';
import { ResultsComponent } from './results/results.component';
import { JsonResultsComponent } from './json-results/json-results.component';
import { ErrorResultsComponent } from './error-results/error-results.component';
import { CommonDisplayDataModule } from '../common-display-data/common-display-data.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

// -------------- Aux functions --------------

@NgModule({
  declarations: [
    SPARQLEditorComponent,
    ResultsComponent,
    JsonResultsComponent,
    ErrorResultsComponent,
  ],
  imports: [
    RouterModule,
    SparqleditorRoutingModule,
    CommonModule,
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    CommonDisplayDataModule,
    SharedModule,
  ],
})
export class SparqleditorModule {}
