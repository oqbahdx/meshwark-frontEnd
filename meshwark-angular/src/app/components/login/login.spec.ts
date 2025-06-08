import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { LoginComponent } from './login'; // Adjusted path
import { AuthService } from '../../services/auth'; // Adjusted path
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


// Mock AuthService
class MockAuthService {
  login(credentials: any) {
    if (credentials.email === 'test@example.com' && credentials.password === 'password') {
      return of({ token: 'mock-token' });
    } else {
      return throwError(() => new Error('Invalid credentials'));
    }
  }
  // Mock other methods if needed by the component
  isAuthenticated$ = of(false); // Mock this if component uses it directly
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    // Spy on Swal methods
    spyOn(Swal, 'fire').and.resolveTo({} as any); // Mock SweetAlert2

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]), // Basic router setup
        HttpClientTestingModule, // AuthService might depend on HttpClient if not fully mocked
        CommonModule, // LoginComponent is standalone and imports CommonModule
        LoginComponent // Import the standalone component itself
      ],
      // declarations: [LoginComponent], // Not needed for standalone components
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents(); // compileComponents is needed for standalone components with templateUrl/styleUrls

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService); // Get the mocked instance
    router = TestBed.inject(Router);
    fixture.detectChanges(); // Initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loginForm should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('email field validity', () => {
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalse();
    email.setValue('test');
    expect(email.hasError('email')).toBeTrue();
    email.setValue('test@example.com');
    expect(email.valid).toBeTrue();
  });

  it('password field validity', () => {
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalse();
    password.setValue('123');
    expect(password.valid).toBeTrue(); // No minLength in this form, just required
  });

  it('should call authService.login on valid form submission and navigate on success', () => {
    spyOn(authService, 'login').and.callThrough(); // Spy on the mock
    spyOn(router, 'navigate');

    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password');
    expect(component.loginForm.valid).toBeTrue();

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({ icon: 'success' }));
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show error Swal on login failure', () => {
    spyOn(authService, 'login').and.returnValue(throwError(() => ({ status: 401, error: 'Invalid credentials' })));
    // spyOn(Swal, 'fire'); // Already spied in beforeEach

    component.loginForm.controls['email'].setValue('wrong@example.com');
    component.loginForm.controls['password'].setValue('wrongpassword');
    component.onSubmit();

    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({ icon: 'error' }));
  });

  it('should not call authService.login on invalid form submission', () => {
    spyOn(authService, 'login');
    component.onSubmit(); // Submit empty form
    expect(authService.login).not.toHaveBeenCalled();
  });
});
