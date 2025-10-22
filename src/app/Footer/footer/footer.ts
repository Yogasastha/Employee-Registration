import { Component } from '@angular/core';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  copyright= faCopyright;
  
  currentYear: number = new Date().getFullYear();

}
