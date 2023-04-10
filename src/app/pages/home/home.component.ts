import {Component, OnInit} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isLogout = true;

  constructor() {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = new JwtHelperService().decodeToken(token);
      this.isLogout = !(decodedToken.authorities[0].authority === 'USER');
    }
  }

}
