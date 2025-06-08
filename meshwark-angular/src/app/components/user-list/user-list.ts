import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api'; // Adjusted path
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; // To navigate to user details

interface User {
  id: string; // or number
  firstName: string;
  lastName: string;
  email: string;
  userType: string; // e.g., 'rider', 'admin', 'driver'
  isActive: boolean;
  // Add any other relevant user properties
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html', // Adjusted path
  styleUrls: ['./user-list.scss'], // Adjusted path
  standalone: true,
  imports: [CommonModule]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  error: string | null = null;

  // You can add filtering for userType if needed
  // e.g., displayedUserType: 'all' | 'rider' | 'admin' = 'all';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.error = null;
    this.apiService.getAllUsers().subscribe({ // Using getAllUsers endpoint
      next: (response) => {
        this.users = Array.isArray(response) ? response : response.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.error = 'فشل تحميل قائمة المستخدمين. الرجاء المحاولة مرة أخرى.';
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'خطأ في التحميل',
          text: this.error
        });
      }
    });
  }

  viewUserDetails(userId: string): void {
    this.router.navigate(['/users', userId]); // Navigate to UserDetailsComponent
  }

  // Helper to translate userType to Arabic for display
  translateUserType(userType: string): string {
    switch (userType?.toLowerCase()) {
      case 'rider':
        return 'راكب';
      case 'driver':
        return 'سائق';
      case 'admin':
        return 'إداري';
      default:
        return userType || 'غير محدد';
    }
  }

  // Placeholder for future actions like edit, delete, toggle status
  // editUser(userId: string): void { ... }
  // deleteUser(userId: string): void { ... }
  // toggleUserStatus(user: User): void { ... }
}
