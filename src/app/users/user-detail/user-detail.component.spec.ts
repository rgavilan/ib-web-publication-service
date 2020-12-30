import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { MockUserService } from 'src/app/_services/_testingServices/mockUser.service';
import { UserDetailComponent } from './user-detail.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { TableResultsComponent } from 'src/app/common-display-data/table-results/table-results.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersRoutingModule } from '../users-routing.module';
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


describe('UserDetailComponent', () => {
    let component: UserDetailComponent;
    let fixture: ComponentFixture<UserDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [
                TranslatePipeStub,
                UserDetailComponent
            ],
            imports: [
                ToastrModule.forRoot(),
                HttpClientModule,
                FormsModule,
                SharedModule,
                BrowserAnimationsModule,
                NgSelectModule,
                UsersRoutingModule,
                RouterTestingModule],
            providers: [{ provide: UserService, useClass: MockUserService },
            { provide: TranslateService, useClass: TranslateServiceStub },
            {
                provide: ActivatedRoute,
                useValue: {
                    params: of({ id: '123' }),
                    snapshot: {}
                }
            }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('on init', () => {
        it('expect to receive an id', () => {
            expect(component.userId).toBe('123');
        });

        it('expect not to receive an id', () => {
            const activatedReoute = fixture.debugElement.injector.get(ActivatedRoute);
            activatedReoute.params = of({ id: null });
            component.ngOnInit();
            expect(component.createMode).toBeTruthy();
        });
    });

    describe('save', () => {
        it('expect to update user', () => {
            const userService = fixture.debugElement.injector.get(UserService);
            const spy = spyOn(userService, 'update').and.callThrough();
            component.user = new User();
            component.user.email = 'test@gmail.com';
            component.save();
            expect(userService.update).toHaveBeenCalled();
        });

        it('expect to save user', () => {
            component.createMode = true;
            const userService = fixture.debugElement.injector.get(UserService);
            const spy = spyOn(userService, 'save').and.callThrough();
            const routerService = fixture.debugElement.injector.get(Router);
            const spy2 = spyOn(routerService, 'navigate').and.callThrough();
            component.user = new User();
            component.user.email = 'test@gmail.com';
            component.user.id = '123';
            component.save();
            expect(userService.save).toHaveBeenCalled();
        });

        it('expect to throw error user', () => {
            component.createMode = true;
            const userService = fixture.debugElement.injector.get(UserService);
            const spy = spyOn(userService, 'save').and.returnValue(throwError({ status: 404 }));
            const routerService = fixture.debugElement.injector.get(Router);
            const spy2 = spyOn(routerService, 'navigate').and.callThrough();
            component.user = new User();
            component.user.email = 'test@gmail.com';
            component.user.id = '123';
            component.save();
            expect(userService.save).toHaveBeenCalled();
        });
    });

});
