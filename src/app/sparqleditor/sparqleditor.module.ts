// -------------- Modules --------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TranslateModule } from '@ngx-translate/core';
import { SparqleditorRoutingModule } from './sparqleditor-routing.module';

// -------------- Components --------------
import { SPARQLEditorComponent } from './sparqleditor.component';
import { ResultsComponent } from './results/results.component';
import { TableResultsComponent } from './table-results/table-results.component';
import { JsonResultsComponent } from './json-results/json-results.component';
import { ErrorResultsComponent } from './error-results/error-results.component';

// -------------- Aux functions --------------

@NgModule({
  declarations: [
    SPARQLEditorComponent,
    ResultsComponent,
    TableResultsComponent,
    JsonResultsComponent,
    ErrorResultsComponent,
  ],
  imports: [
    SparqleditorRoutingModule,
    TranslateModule,
    CommonModule,
    TabsModule.forRoot(),
    AlertModule.forRoot(),
  ],
})
export class SparqleditorModule {}
