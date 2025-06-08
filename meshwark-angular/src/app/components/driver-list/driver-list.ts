import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngIf, *ngFor
import { ApiService } from '../../services/api'; // Adjusted path
import Swal from 'sweetalert2';
// import { TableModule } from 'primeng/table'; // Example if using PrimeNG
// For now, using basic Bootstrap table, so no extra module needed for table itself.

interface Driver {
  id: string; // or number, depending on your API
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  // Add any other relevant driver properties
}

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.html', // Adjusted path
  styleUrls: ['./driver-list.scss'], // Adjusted path
  standalone: true,
  imports: [CommonModule] // Add other modules like TableModule if using component libraries
})
export class DriverListComponent implements OnInit {
  drivers: Driver[] = [];
  isLoading = true;
  error: string | null = null;

  // Pagination properties (optional, can be added later)
  // currentPage = 1;
  // itemsPerPage = 10;
  // totalItems = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchDrivers();
  }

  fetchDrivers(): void {
    this.isLoading = true;
    this.error = null;
    this.apiService.getAllDrivers().subscribe({
      next: (response) => {
        // Assuming response is directly the array of drivers or { data: [...] }
        this.drivers = Array.isArray(response) ? response : response.data || [];
        this.isLoading = false;
        // this.totalItems = this.drivers.length; // if implementing pagination
      },
      error: (err) => {
        console.error('Error fetching drivers:', err);
        this.error = 'فشل تحميل قائمة السائقين. الرجاء المحاولة مرة أخرى.';
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'خطأ في التحميل',
          text: this.error
        });
      }
    });
  }

  // Placeholder for actions like view details, edit, delete
  viewDriverDetails(driverId: string): void {
    console.log('View details for driver:', driverId);
    // Navigate to driver details page: this.router.navigate(['/drivers', driverId]);
    Swal.fire('Info', `تفاصيل السائق: ${driverId} (لم يتم التنفيذ بعد)`, 'info');
  }

  // Add other methods for activate/deactivate, delete if needed. Example:
  // toggleDriverStatus(driver: Driver): void {
  //   const newStatus = !driver.isActive;
  //   // Call API to update status
  //   // On success, update driver.isActive and show success message
  //   Swal.fire('تغيير الحالة', `تم تغيير حالة ${driver.firstName} إلى ${newStatus ? 'مفعل' : 'غير مفعل'}`, 'success');
  // }
}
