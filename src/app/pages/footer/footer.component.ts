import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  userRole: boolean = false;
  adminRole: boolean = false;
  year: number = new Date().getFullYear();
}
