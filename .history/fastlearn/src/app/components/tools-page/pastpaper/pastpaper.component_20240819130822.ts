import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pastpaper',
  templateUrl: './pastpaper.component.html',
  styleUrls: ['./pastpaper.component.css']
})
export class PastpaperComponent {


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}


  viewHomePage(): void {
    this.router.navigate(['/homepage']); // Navigate to homepage
  }
}
