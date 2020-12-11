import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { TestingHelper } from '../_helpers/testing.spec';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Helper } from '../_helpers/utils';
import { User } from '../_models/user';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestingHelper.configureTest();
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login function', () => {
    it('be able to retrieve posts from the API via GET', async () => {
      const respo: Response = new Response();
      service.login('flor', 'password').subscribe(result => {
        expect(result.status).toBe(200);
        expect(localStorage.getItem('username')).toEqual('flor');
      });
      const request = httpMock.expectOne(Helper.getUrl('/oauth/token'));
      expect(request.request.method).toBe('POST');
      request.flush(respo);
    });

    it('it should return no response and go to error', () => {
      const respo: Response = null;
      service.login('flor', 'password').subscribe(result => {
        expect(result).toBeNull();
      });
      const request = httpMock.expectOne(Helper.getUrl('/oauth/token'));
      expect(request.request.method).toBe('POST');
      request.flush(respo);
    });
  });

  describe('refresh token function', () => {
    it('refresh token exist so it should make the api call', async () => {
      const respo: Response = new Response();
      localStorage.setItem('refresh_token', 'refreshme');
      service.refreshToken().subscribe(response => {

      });
      const request = httpMock.expectOne(Helper.getUrl('/oauth/token'));
      expect(request.request.method).toBe('POST');
      request.flush(respo);
    });

    it('refresh token exist so it should make the api call', async () => {
      const respo: Response = null;
      localStorage.setItem('refresh_token', 'refreshme');
      service.refreshToken().subscribe(response => {

      });
      const request = httpMock.expectOne(Helper.getUrl('/oauth/token'));
      expect(request.request.method).toBe('POST');
      request.flush(respo);
    });

    it('refresh token does not exist so it shoul not call http', async () => {
      const respo: Response = new Response();
      const result = service.refreshToken().subscribe();
      expect(result.closed).toBeTruthy();
    });
  })


  it('get Current User', () => {
    const user: User = new User();
    user.email = 'test@test.com';
    localStorage.setItem('current_user', JSON.stringify(user));
    const currentUser = service.getCurrentUser();
    expect(currentUser.email).toBe('test@test.com');
  });


  it('is Logged In should return if user is logged in', () => {
    const isLog = service.isLoggedIn();
    expect(isLog).toBeFalsy();

  });


});
