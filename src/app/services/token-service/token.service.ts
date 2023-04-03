import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private router: Router) {
  }
  private jwtHelper = new JwtHelperService();
  savetoken(token: string): void {
    localStorage.setItem('token', token)
    this.router.navigate(['admin','user'])
  }

  public isLogged(): boolean {
    const token = localStorage.getItem('token')
    console.log(token)
    return !!token
  }

  public clearToken(): void {
    localStorage.removeItem('token')
    this.router.navigate(['login'])
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

}
