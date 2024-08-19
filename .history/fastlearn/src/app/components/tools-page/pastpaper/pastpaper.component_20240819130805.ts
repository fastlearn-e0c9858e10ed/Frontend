import { Component } from '@angular/core';

@Component({
  selector: 'app-pastpaper',
  templateUrl: './pastpaper.component.html',
  styleUrls: ['./pastpaper.component.css']
})
export class PastpaperComponent {
  constructor(
    private productService: ProductserviceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  viewHomePage(): void {
    this.router.navigate(['/homepage']); // Navigate to homepage
  }
}
