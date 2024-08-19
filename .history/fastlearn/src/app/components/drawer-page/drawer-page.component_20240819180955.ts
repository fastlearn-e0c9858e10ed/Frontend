import { Component } from '@angular/core';

@Component({
  selector: 'app-drawer-page',
  templateUrl: './drawer-page.component.html',
  styleUrls: ['./drawer-page.component.css']
})
export class DrawerPageComponent {
  isDrawerOpen = false;

  constructor() {}

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
  }
}
