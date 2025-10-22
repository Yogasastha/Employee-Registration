import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  subList = false;

  toggleSubmenu(): void {
    this.subList = !this.subList;
  }
}
