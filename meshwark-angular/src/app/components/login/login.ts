import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Correct path
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  standalone: true, // Mark as standalone
  imports: [ReactiveFormsModule, CommonModule] // Import ReactiveFormsModule and CommonModule
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Mark fields as touched to show errors
      return;
    }

    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        // The authService already updated the auth status and stored the token
        Swal.fire({
          icon: 'success',
          title: 'تم تسجيل الدخول بنجاح',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/dashboard']); // Navigate to dashboard or home
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        let errorMessage = 'فشل تسجيل الدخول. يرجى التحقق من البريد الإلكتروني أو كلمة المرور.';
        if (error.status === 0) {
          errorMessage = 'لا يمكن الوصول إلى الخادم. يرجى التحقق من اتصالك بالإنترنت.';
        } else if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        Swal.fire({
          icon: 'error',
          title: 'خطأ في تسجيل الدخول',
          text: errorMessage
        });
      }
    });
  }
}
