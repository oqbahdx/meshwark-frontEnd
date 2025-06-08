import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For ngIf, ngFor etc.
import { RouterLink } from '@angular/router'; // For routerLink

@Component({
  selector: 'app-home',
  templateUrl: './home.html', // Adjusted path
  styleUrls: ['./home.scss'], // Adjusted path
  standalone: true,
  imports: [CommonModule, RouterLink] // Import CommonModule and RouterLink
})
export class HomeComponent {
  currentYear = new Date().getFullYear();
  // Based on the React Home.js, it seems to be primarily static content.
  // If it had logic (e.g., fetching data), it would go here.
  // For now, it's just a container for the presentation.
  constructor() {}
}
