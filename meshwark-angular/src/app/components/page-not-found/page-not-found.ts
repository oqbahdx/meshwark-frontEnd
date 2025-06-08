import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Import RouterLink

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.html', // Adjusted path
  // styleUrls: ['./page-not-found.scss'] // Optional: if specific styles are needed
  standalone: true,
  imports: [CommonModule, RouterLink] // Import RouterLink
})
export class PageNotFoundComponent {
  constructor() { }
}
