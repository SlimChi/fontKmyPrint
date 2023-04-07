import {Component, DoCheck, OnInit} from '@angular/core';
import {TokenService} from "../../services/token-service/token.service";
import {NavigationEnd, Router} from "@angular/router";
import {StorageService} from "../../services/clearStorage/storage.service";
import {HelperService} from "../../services/helper/helper.service";
import {JwtHelperService} from "@auth0/angular-jwt";



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck{

  loggedInUserName: string | undefined = undefined;
  userRole: boolean = false;
  adminRole: boolean = false;
  currentLang: string = "fr"; // default language
  constructor(
    private tokenService: TokenService,
    private storageService: StorageService,
    private helperService: HelperService,
    private router: Router,

  ) {   }

  ngOnInit(): void {
    this.loggedInUserName= this.helperService.userFullname;
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = helper.decodeToken(token);
      this.userRole = decodedToken.authorities[0].authority === 'USER';
      console.log(this.userRole)
      this.adminRole = decodedToken.authorities[0].authority === 'ADMIN';
      console.log(this.adminRole)
    }
    this.tokenService.getToken();
  }

  logout(): void {
    this.tokenService.clearToken();
    this.storageService.clear();
    this.router.navigateByUrl('/login');
  }


  isLogout = false;

  ngDoCheck(): void {
    let url = this.router.url;
    if (url == '/login' || url == '/register' || url == '/home') {
      this.isLogout = false;
    } else {
      this.isLogout = true;
    }
  }
  switchLanguage(lang: string) {
    this.currentLang = lang; // update the current language
  }

  isAuthenticated(): boolean {
    return this.tokenService.isLogged();
  }

}
