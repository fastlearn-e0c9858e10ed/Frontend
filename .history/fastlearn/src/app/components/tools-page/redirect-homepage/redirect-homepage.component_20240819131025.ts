import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-redirect-homepage',
  templateUrl: './redirect-homepage.component.html',
  styleUrls: ['./redirect-homepage.component.css']
})
export class RedirectHomepageComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}


  viewHomePage(): void {
    this.router.navigate(['/homepage']); // Navigate to homepage
  }
}
