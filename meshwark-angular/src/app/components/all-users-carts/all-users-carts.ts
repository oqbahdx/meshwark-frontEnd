import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api'; // Adjusted path
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface UserWithCartInfo { // Example interface
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  userType: string;
  cartItemCount?: number; // Example: number of items in cart or trips taken
  lastActivity?: string; // Example: last trip date or cart update
}

@Component({
  selector: 'app-all-users-carts',
  templateUrl: './all-users-carts.html', // Adjusted path
  styleUrls: ['./all-users-carts.scss'], // Adjusted path
  standalone: true,
  imports: [CommonModule]
})
export class AllUsersCartsComponent implements OnInit {
  usersData: UserWithCartInfo[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsersData();
  }

  fetchUsersData(): void {
    this.isLoading = true;
    this.error = null;
    // No specific "getAllUsersCarts" endpoint in original apiService.js.
    // Using getAllUsers and placeholder for cart data.
    // If a specific endpoint existed, e.g., apiService.getAllUserCartsData(), it would be used here.
    this.apiService.getAllUsers().subscribe({
      next: (response) => {
        const users = Array.isArray(response) ? response : response.data || [];
        // Map to UserWithCartInfo, adding placeholder cart data
        this.usersData = users.map((user: any) => ({
          ...user,
          cartItemCount: Math.floor(Math.random() * 10), // Placeholder random data
          lastActivity: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString() // Placeholder
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching users data for carts:', err);
        this.error = 'فشل تحميل بيانات المستخدمين. الرجاء المحاولة مرة أخرى.';
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'خطأ في التحميل',
          text: this.error
        });
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

  viewUserDetails(userId: string): void {
    this.router.navigate(['/users', userId]);
  }
}
