import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { TestingHelper } from 'src/app/_helpers/testing.spec';
import { Helper } from 'src/app/_helpers/utils';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { UserDetailComponent } from './user-detail.component';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let httpMock: HttpTestingController;
  beforeEach(async(() => {
    const user: User = new User();
    user.name = 'flor';
    user.id = '123';
    TestingHelper.configureTest().compileComponents();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            snapshot: {}
          }
        },
        {
          provide: UserService,
          useValue: {
            get: () => { return of(user) },
            save: () => { return of(user) },
            update: () => { return of(user) }
          }
        }]
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init component with id and search user by id and add data to user', async () => {
      component.ngOnInit();
      expect(component.user.credentialsNonExpired).toBeUndefined();
      expect(component.user.name).toBe('flor');
    });
  });

  describe('save', () => {
    it('should create new user', () => {
      const userService = fixture.debugElement.injector.get(UserService);
      const spy = spyOn(userService, 'save').and.callThrough();
      component.createMode = true;
      component.save();
      expect(userService.save).toHaveBeenCalled();
    });

    it('should update user', () => {
      const userService = fixture.debugElement.injector.get(UserService);
      const spy = spyOn(userService, 'update').and.callThrough();
      component.createMode = false;
      component.save();
      expect(userService.update).toHaveBeenCalled();
    });

    it('should return error', () => {
      const userService = fixture.debugElement.injector.get(UserService);
      const spy = spyOn(userService, 'update').and.returnValue(throwError({ status: 404 }));
      component.createMode = false;
      component.save();
      expect(userService.update).toHaveBeenCalled();
    });
  });
});
