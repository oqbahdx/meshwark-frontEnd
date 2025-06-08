import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api'; // Adjusted path
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface Admin { // Can reuse User interface if structure is identical
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  // Add any other specific admin properties
}

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.html', // Adjusted path
  styleUrls: ['./admin-list.scss'], // Adjusted path
  standalone: true,
  imports: [CommonModule]
})
export class AdminListComponent implements OnInit {
  admins: Admin[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAdmins();
  }

  fetchAdmins(): void {
    this.isLoading = true;
    this.error = null;
    this.apiService.getAllAdmins().subscribe({ // Using getAllAdmins endpoint
      next: (response) => {
        this.admins = Array.isArray(response) ? response : response.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching admins:', err);
        this.error = 'فشل تحميل قائمة الإداريين. الرجاء المحاولة مرة أخرى.';
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'خطأ في التحميل',
          text: this.error
        });
      }
    });
  }

  viewAdminDetails(adminId: string): void {
    // Assuming admin details are viewed via the same user details component
    this.router.navigate(['/users', adminId]);
  }
}
