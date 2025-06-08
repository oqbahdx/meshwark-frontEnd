import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api'; // Adjusted path
import { AuthService } from './auth'; // ApiService depends on AuthService for token

// Mock AuthService
class MockAuthService {
  getToken() {
    return 'fake-test-token';
  }
  // Add other methods if ApiService directly uses them, though it shouldn't for token.
  // Interceptor handles token attachment.
}

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://localhost:7217/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        { provide: AuthService, useClass: MockAuthService } // Provide mock for AuthService
      ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllDrivers() should fetch drivers from the correct endpoint', () => {
    const mockDrivers = [{ id: '1', name: 'Driver 1' }, { id: '2', name: 'Driver 2' }];
    service.getAllDrivers().subscribe(drivers => {
      expect(drivers.length).toBe(2);
      expect(drivers).toEqual(mockDrivers);
    });

    const req = httpMock.expectOne(`${baseUrl}/users/drivers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDrivers); // Simulate successful response
  });

  it('getCounts() should fetch counts from the correct endpoint', () => {
    const mockCounts = { users: 10, drivers: 5, admins: 2, riders: 3 };
    service.getCounts().subscribe(counts => {
      expect(counts.users).toBe(10);
      expect(counts).toEqual(mockCounts);
    });

    const req = httpMock.expectOne(`${baseUrl}/users/count`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCounts);
  });
});
