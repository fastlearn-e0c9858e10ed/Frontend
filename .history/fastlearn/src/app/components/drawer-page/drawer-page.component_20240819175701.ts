import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drawer-page',
  templateUrl: './drawer-page.component.html',
  styleUrls: ['./drawer-page.component.css']
})
export class DrawerPageComponent {
  isDrawerOpen = false;

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
    this.closeDrawer(); // Optionally close the drawer after navigation
  }
}
