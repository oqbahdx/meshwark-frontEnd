import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // Import RouterLink, RouterLinkActive
import { AuthService } from './services/auth'; // Adjusted path
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html', // Adjusted path
  styleUrls: ['./app.scss'], // Adjusted path
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive] // Add RouterLink, RouterLinkActive
})
export class AppComponent implements OnInit {
  title = 'meshwark-angular';
  isAuthenticated$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit() {
    // Optional: Close mobile navbar on navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
      const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;
      if (navbarToggler && navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarToggler.click(); // Simulate click to close if open
      }
    });
  }

  handleLogout(): void {
    this.authService.logout();
  }
}
