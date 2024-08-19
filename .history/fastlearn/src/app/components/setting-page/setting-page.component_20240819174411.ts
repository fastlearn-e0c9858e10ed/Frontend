import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.css']
})
export class SettingPageComponent {
  constructor(private router: Router) {}

  navigateTo(section: string): void {
    // Navigate to the corresponding settings page or section
    this.router.navigate([`/settings/${section}`]);
  }
}
