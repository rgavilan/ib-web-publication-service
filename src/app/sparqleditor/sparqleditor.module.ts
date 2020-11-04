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
import { JsonResultsComponent } from './json-results/json-results.component';
import { ErrorResultsComponent } from './error-results/error-results.component';
import { CommonDisplayDataModule } from '../common-display-data/common-display-data.module';

// -------------- Aux functions --------------

@NgModule({
  declarations: [
    SPARQLEditorComponent,
    ResultsComponent,
    JsonResultsComponent,
    ErrorResultsComponent,
  ],
  imports: [
    SparqleditorRoutingModule,
    TranslateModule,
    CommonModule,
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    CommonDisplayDataModule,
  ],
})
export class SparqleditorModule {}
