import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth'; // Adjusted path
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Added for the new AuthService instantiation in one test

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  const mockLoginResponse = { token: 'test-token123' };
  const apiUrl = 'https://localhost:7217/api/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]) // Basic router setup for navigation tests
      ],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    localStorage.removeItem('token'); // Ensure clean state
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
    localStorage.removeItem('token');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isAuthenticated$ should initially be false if no token', (done) => {
    service.isAuthenticated$.subscribe(isAuthenticated => {
      expect(isAuthenticated).toBeFalse();
      done();
    });
  });

  it('login() should store token and set isAuthenticated$ to true', (done) => {
    const credentials = { email: 'test@example.com', password: 'password' };
    service.login(credentials).subscribe(response => {
      expect(response.token).toEqual(mockLoginResponse.token);
      service.isAuthenticated$.subscribe(isAuthenticated => {
        expect(isAuthenticated).toBeTrue();
        expect(localStorage.getItem('token')).toEqual(mockLoginResponse.token);
        done();
      });
    });

    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockLoginResponse);
  });

  it('logout() should remove token, set isAuthenticated$ to false, and navigate to /login', (done) => {
    localStorage.setItem('token', 'dummy-token');
    // Re-initialize service to make BehaviorSubject pick up the token for this test case.
    // This ensures hasToken() in constructor sets initial state of isAuthenticatedSubject correctly.
    service = new AuthService(router, TestBed.inject(HttpClient));

    const navigateSpy = spyOn(router, 'navigate');

    service.logout();

    service.isAuthenticated$.subscribe(isAuthenticated => {
      expect(isAuthenticated).toBeFalse();
      expect(localStorage.getItem('token')).toBeNull();
      expect(navigateSpy).toHaveBeenCalledWith(['/login']);
      done();
    });
  });

  it('getToken() should return the token from localStorage', () => {
    localStorage.setItem('token', 'my-test-token');
    expect(service.getToken()).toEqual('my-test-token');
  });

  it('getToken() should return null if no token in localStorage', () => {
    localStorage.removeItem('token');
    expect(service.getToken()).toBeNull();
  });
});
