import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { MockUserService } from 'src/app/_services/_testingServices/mockUser.service';
import { UserComponent } from './user.component';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersRoutingModule } from '../users-routing.module';
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

describe('UserComponent', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [{ provide: UserService, useClass: MockUserService },
            { provide: TranslateService, useClass: TranslateServiceStub }],
            declarations: [
                TranslatePipeStub,
                UserComponent
            ],
            imports: [
                SharedModule,
                FormsModule,
                UsersRoutingModule,
                BrowserAnimationsModule,
                HttpClientModule,
                ToastrModule.forRoot(),
                RouterTestingModule,
                NgSelectModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
