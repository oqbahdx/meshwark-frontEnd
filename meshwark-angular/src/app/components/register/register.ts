import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth'; // Adjusted path
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.html', // Adjusted path
  styleUrls: ['./register.scss'], // Adjusted path
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      // Add other fields as per your registration API requirements
      // e.g., userType: ['rider', Validators.required] // Assuming 'rider' is a default or selectable
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'تم التسجيل بنجاح',
          text: 'يمكنك الآن تسجيل الدخول باستخدام حسابك الجديد.',
          showConfirmButton: true,
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration error:', error);
        let errorMessage = 'فشل التسجيل. الرجاء المحاولة مرة أخرى.';
        if (error.status === 0) {
          errorMessage = 'لا يمكن الوصول إلى الخادم. يرجى التحقق من اتصالك بالإنترنت.';
        } else if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.error && error.error.errors) {
            // Handle validation errors from ASP.NET Core Identity
            const validationErrors = error.error.errors;
            let messages = [];
            for (const key in validationErrors) {
                if (validationErrors.hasOwnProperty(key)) {
                    messages.push(validationErrors[key].join(' '));
                }
            }
            errorMessage = messages.join('\n');
        }
        Swal.fire({
          icon: 'error',
          title: 'خطأ في التسجيل',
          text: errorMessage
        });
      }
    });
  }
}
