import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.html', // Adjusted path
  styleUrls: ['./privacy-policy.scss'], // Adjusted path
  standalone: true,
  imports: [CommonModule]
})
export class PrivacyPolicyComponent {
  // Content is primarily in the HTML template
  constructor() {}
}
