import { TestBed } from '@angular/core/testing';

// -------------- Modules --------------
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';
import { NgSelectModule } from '@ng-select/ng-select';

// -------------- Services --------------
import { LoginService } from '../_services/login.service';
import { MenuService } from '../_services/menu.service';
import { UserService } from '../_services/user.service';

// -------------- Components --------------
import { LoginComponent } from '../login/login.component';
import { MainComponent } from '../main/main.component';
import { MenuComponent } from '../menu/menu.component';
import { HomeComponent } from '../home/home.component';

// -------------- Guards --------------
import { AuthGuard } from '../_guards/auth.guard';

// -------------- Interceptors --------------
import { TokenizedInterceptor } from '../_interceptors/tokenized-interceptor';
import { OAuthInterceptor } from '../_interceptors/oauth-interceptor';

import { APP_BASE_HREF } from '@angular/common';
import { SPARQLEditorComponent } from '../sparqleditor/sparqleditor.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TopSearchComponent } from '../common/top-search/top-search.component';
import { ScientificProductionComponent } from '../common/scientific-production/scientific-production.component';
import { UserDetailComponent } from '../users/user-detail/user-detail.component';
import { ScientistSearchComponent } from '../common/scientist-search/scientist-search.component';
import { UserComponent } from '../users/user/user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxEchartsModule } from 'ngx-echarts';
import { TreeComponent } from '../graphic/tree/tree.component';
import { NewTreeComponent } from '../graphic/new-tree/new-tree.component';
import { Observable, of } from 'rxjs';
import { EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { TableResultsComponent } from '../common-display-data/table-results/table-results.component';
import { ProyectsComponent } from '../common/proyects/proyects.component';
import { PatentsComponent } from '../common/patents/patents.component';
import { DocumentsComponent } from '../common/documents/documents.component';


/**
 * Clase de ayuda para construcción de tests unitarios.
 */
export class TranslateServiceStub {
  public onLangChange = new EventEmitter<any>();
  public onTranslationChange = new EventEmitter<any>();
  public onDefaultLangChange = new EventEmitter<any>();
  public addLangs(langs: string[]) { return; }
  public getLangs() { return ['en-us']; }
  public getBrowserLang() { return ''; }
  public getBrowserCultureLang() { return ''; }
  public use(lang: string) { return null; }
  // tslint:disable-next-line:no-reserved-keywords
  public get(key: any): any { return of(key); }
  instant(): string {
    return 'some_string';
  }
}
@Pipe({ name: 'translate' })
export class TranslatePipeStub implements PipeTransform {
  public transform(key: string, ...args: any[]): any { return key; }
}
export class TestingHelper {
  public static configureTest(): typeof TestBed {
    return TestBed.configureTestingModule({
      declarations: [
        TranslatePipeStub,
        LoginComponent,
        MainComponent,
        MenuComponent,
        HomeComponent,
        SPARQLEditorComponent,
        TopSearchComponent,
        ScientificProductionComponent,
        UserDetailComponent,
        ScientistSearchComponent,
        UserComponent,
        TreeComponent,
        NewTreeComponent,
        TableResultsComponent,
        ProyectsComponent,
        PatentsComponent,
        TreeComponent,
        NewTreeComponent,
        DocumentsComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        NgbModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: this.createTranslateLoader,
            deps: [HttpClient],
          },
        }),
        ToastrModule.forRoot(),
        PaginationModule.forRoot(),
        NgProgressModule,
        NgProgressHttpModule,
        NgProgressRouterModule,
        NgSelectModule,
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        }),
      ],
      providers: [
        AuthGuard,
        LoginService,
        MenuService,
        UserService,
        { provide: TranslateService, useClass: TranslateServiceStub },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenizedInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OAuthInterceptor,
          multi: true,
        },
        {
          provide: APP_BASE_HREF,
          useValue: '/',
        }
      ]
    });
  }

  private static createTranslateLoader(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient, '../assets/i18n/', '.json');
  }
}
