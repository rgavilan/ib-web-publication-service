import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { MockUserService } from 'src/app/_services/_testingServices/mockUser.service';
import { UserDetailComponent } from './user-detail.component';



describe('UserDetailComponent', () => {
    let component: UserDetailComponent;
    let fixture: ComponentFixture<UserDetailComponent>;

    beforeEach(async(() => {
        TestingHelper.configureTest().compileComponents();
        TestBed.configureTestingModule({

            providers: [{ provide: UserService, useClass: MockUserService },
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
            console.log(component.userId);
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
