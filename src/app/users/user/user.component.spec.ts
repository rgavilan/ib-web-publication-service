import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { UserService } from 'src/app/_services/user.service';
import { MockUserService } from 'src/app/_services/_testingServices/mockUser.service';
import { UserComponent } from './user.component';


describe('UserComponent', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;

    beforeEach(async(() => {
        TestingHelper.configureTest().compileComponents();
        TestBed.configureTestingModule({
            providers: [{ provide: UserService, useClass: MockUserService }]
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
