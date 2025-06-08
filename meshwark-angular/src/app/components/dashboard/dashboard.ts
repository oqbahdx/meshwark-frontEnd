import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts'; // Import NgChartsModule
import { ChartConfiguration, ChartData, ChartType, ChartEvent } from 'chart.js'; // Import Chart.js types
import { ApiService } from '../../services/api'; // Adjusted path
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html', // Adjusted path
  styleUrls: ['./dashboard.scss'], // Adjusted path
  standalone: true,
  imports: [CommonModule, NgChartsModule] // Import NgChartsModule
})
export class DashboardComponent implements OnInit {
  isLoading = true;
  counts: { users?: number; drivers?: number; admins?: number; riders?: number; trips?:number } = {}; // Define trips for example

  // Chart.js configurations
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {},
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1 // Ensure y-axis shows whole numbers for counts
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['المستخدمين', 'السائقين', 'الإداريين', 'الركاب'], // 'الرحلات' can be added if API provides it
    datasets: [
      {
        data: [0, 0, 0, 0], // Initial data, 'رحلات' count can be added
        label: 'إحصائيات النظام',
        backgroundColor: ['#4C6DAA', '#5cb85c', '#f0ad4e', '#d9534f', '#5bc0de'], // Colors for bars
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1
      }
    ]
  };

  // Doughnut chart (example, if relevant)
  public doughnutChartLabels: string[] = ['نشط', 'غير نشط']; // Example
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [0,0], // Example: active vs inactive users/drivers
        backgroundColor: ['#5cb85c', '#d9534f'],
      }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };


  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchCounts();
  }

  fetchCounts(): void {
    this.isLoading = true;
    this.apiService.getCounts().subscribe({
      next: (response) => {
        this.counts = response; // Assuming API returns { users: 10, drivers: 5, ... }
        this.updateBarChartData();
        // this.updateDoughnutChartData(); // If you have data for it
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching counts:', error);
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'خطأ في تحميل البيانات',
          text: 'لم نتمكن من تحميل إحصائيات لوحة التحكم.'
        });
      }
    });
  }

  updateBarChartData(): void {
    const data = [
      this.counts.users || 0,
      this.counts.drivers || 0,
      this.counts.admins || 0,
      this.counts.riders || 0,
      // this.counts.trips || 0 // if trips count is available
    ];
    this.barChartData.datasets[0].data = data;
    // If you need to dynamically add/remove labels based on available counts:
    // this.barChartData.labels = Object.keys(this.counts).map(key => this.translateKeyToLabel(key));
  }

  // Optional: if you want to translate keys to Arabic labels dynamically
  // translateKeyToLabel(key: string): string {
  //   const map: { [key: string]: string } = {
  //     users: 'المستخدمين',
  //     drivers: 'السائقين',
  //     admins: 'الإداريين',
  //     riders: 'الركاب',
  //     trips: 'الرحلات'
  //   };
  //   return map[key] || key;
  // }

  // Chart events (optional)
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
}
