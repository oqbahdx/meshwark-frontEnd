import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api'; // Adjusted path
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

interface Rider { // Can reuse User interface if structure is identical
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  // Add any other specific rider properties if they differ from a generic user
}

@Component({
  selector: 'app-rider-list',
  templateUrl: './rider-list.html', // Adjusted path
  styleUrls: ['./rider-list.scss'], // Adjusted path
  standalone: true,
  imports: [CommonModule]
})
export class RiderListComponent implements OnInit {
  riders: Rider[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchRiders();
  }

  fetchRiders(): void {
    this.isLoading = true;
    this.error = null;
    this.apiService.getAllRiders().subscribe({ // Using getAllRiders endpoint
      next: (response) => {
        this.riders = Array.isArray(response) ? response : response.data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching riders:', err);
        this.error = 'فشل تحميل قائمة الركاب. الرجاء المحاولة مرة أخرى.';
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'خطأ في التحميل',
          text: this.error
        });
      }
    });
  }

  viewRiderDetails(riderId: string): void {
    // Assuming rider details are viewed via the same user details component
    this.router.navigate(['/users', riderId]);
  }
}
