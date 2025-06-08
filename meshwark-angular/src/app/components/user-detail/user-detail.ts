import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common'; // Import Location
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api'; // Adjusted path
import { AuthService } from '../../services/auth'; // For user roles or self-check
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { QrCodeModule } from 'ngx-qrcode'; // For QR Code
import { FormsModule } from '@angular/forms'; // For ngModel if using template-driven forms for updates

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string; // Optional
  userType: string;
  isActive: boolean;
  profileImage?: string; // Optional
  tripsCount?: number; // Optional, example
  registrationDate?: string; // Optional
  // Add any other fields your API provides for a user
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.html', // Adjusted path
  styleUrls: ['./user-detail.scss'], // Adjusted path
  standalone: true,
  imports: [CommonModule, QrCodeModule, FormsModule] // FormsModule for potential edits
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user: User | null = null;
  isLoading = true;
  error: string | null = null;
  qrCodeValue: string = ''; // For QR code if needed, e.g., user ID or profile link
  private routeSub: Subscription | undefined;

  // For editing (optional, can be expanded)
  isEditing = false;
  editableUser: User | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService, // For role checks or if user is viewing their own profile
    private location: Location // For 'back' button
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        this.fetchUserDetails(userId);
        this.qrCodeValue = `UserId: ${userId}`; // Or a URL to their profile
      } else {
        this.isLoading = false;
        this.error = 'لم يتم توفير معرف المستخدم.';
        this.showErrorAlert(this.error);
      }
    });
  }

  fetchUserDetails(userId: string): void {
    this.isLoading = true;
    this.error = null;
    this.apiService.getUserById(userId).subscribe({
      next: (response) => {
        this.user = response.data || response; // Adjust if API nests data
        this.isLoading = false;
        if (this.user) {
          this.editableUser = { ...this.user }; // For editing form
        } else {
          this.error = 'لم يتم العثور على المستخدم.';
          this.showErrorAlert(this.error);
        }
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
        this.error = 'فشل تحميل تفاصيل المستخدم.';
        this.isLoading = false;
        this.showErrorAlert(this.error);
        this.router.navigate(['/user-list']); // Optional: redirect if user not found
      }
    });
  }

  translateUserType(userType: string): string {
    switch (userType?.toLowerCase()) {
      case 'rider': return 'راكب';
      case 'driver': return 'سائق';
      case 'admin': return 'إداري';
      default: return userType || 'غير محدد';
    }
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing && this.user) {
      this.editableUser = { ...this.user }; // Reset editableUser on entering edit mode
    }
  }

  saveUserDetails(): void {
    if (!this.editableUser || !this.editableUser.id) return;

    this.isLoading = true; // Indicate loading state for save operation
    // Ensure only updatable fields are sent. API should handle this.
    const { id, ...updateData } = this.editableUser;

    this.apiService.updateUser(this.editableUser.id, updateData).subscribe({
      next: (response) => {
        this.user = { ...this.editableUser } as User; // Update main user object
        this.isLoading = false;
        this.isEditing = false;
        Swal.fire({
          icon: 'success',
          title: 'تم الحفظ',
          text: 'تم تحديث تفاصيل المستخدم بنجاح.',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error updating user details:', err);
        this.showErrorAlert('فشل تحديث تفاصيل المستخدم.');
      }
    });
  }

  // Example: Toggle Active Status
  toggleUserStatus(): void {
    if (!this.user) return;
    const newStatus = !this.user.isActive;
    const updateData = { ...this.user, isActive: newStatus };
     // Exclude id from the main payload if your updateUser method expects it separately
    const { id, ...payload } = updateData;


    Swal.fire({
      title: `هل أنت متأكد من ${newStatus ? 'تفعيل' : 'تعطيل'} هذا المستخدم؟`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم, قم بالتغيير!',
      cancelButtonText: 'إلغاء'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.apiService.updateUser(this.user!.id, payload).subscribe({
          next: () => {
            this.user!.isActive = newStatus; // Update local state
            if (this.editableUser) this.editableUser.isActive = newStatus;
            this.isLoading = false;
            Swal.fire('تم!', `تم ${newStatus ? 'تفعيل' : 'تعطيل'} المستخدم بنجاح.`, 'success');
          },
          error: (err) => {
            this.isLoading = false;
            console.error('Error updating user status:', err);
            this.showErrorAlert('فشل تحديث حالة المستخدم.');
          }
        });
      }
    });
  }


  showErrorAlert(message: string): void {
    Swal.fire({ icon: 'error', title: 'خطأ', text: message });
  }

  goBack(): void {
    this.location.back(); // Navigates to the previous page in history
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
