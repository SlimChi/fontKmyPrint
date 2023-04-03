import {Component, DoCheck, OnInit} from '@angular/core';
import {TokenService} from "../../services/token-service/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck{
  constructor(
  private tokenService: TokenService,
  private router: Router
  ) {}
  ngOnInit(): void {
  }

  logout(){
  this.tokenService.clearToken()
  }

  isLogout=false;

  ngDoCheck(): void {
    let url = this.router.url
    if(url == '/login' || url == '/register'|| url == '/home'){
      this.isLogout=false;
    }else {
      this.isLogout = true;
    }
  }
}
