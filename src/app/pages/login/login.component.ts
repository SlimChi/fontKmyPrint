import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";

import {AuthenticationRequest} from "../../swagger/services/models/authentication-request";

import {TokenService} from "../../services/token-service/token.service";
import {HelperService} from "../../services/helper/helper.service";
import {UtilisateurDto} from "../../swagger/services/models/utilisateur-dto";
import {RegisterRequest} from "../../swagger/services/models/register-request";
import {AuthentificationService} from "../../swagger/services/services/authentification.service";
import {UtilisateursService} from "../../swagger/services/services/utilisateurs.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  userDto: RegisterRequest = {prenom: '', nom: '', email: '',password:''};
  showPassword = false;
  public rememberMe: boolean = false;
  authRequest: AuthenticationRequest = {};
  errorMessages: Array<string> = [];
  errorMessage: Array<string> = [];
  url = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthentificationService,
    private userService: UtilisateursService,
    private helperService: HelperService,
    private tokenService: TokenService
  ) {

  }

  ngOnInit(): void {

  }

  login() {
    this.errorMessage = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: async (data) => {
        localStorage.setItem('token', data.token as string);

        if (this.rememberMe) {
          console.log(data.token)
          // If "remember me" is checked, save the token in a cookie
          this.tokenService.savetokenInCookie(data.token as string);
        } else {
          // Otherwise, save the token in localStorage
          this.tokenService.savetoken(data.token as string);
        }

        this.tokenService.savetoken(data.token as string)
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(<string>data.token);
        console.log(decodedToken)
        if (decodedToken.authorities[0].authority === 'ADMIN') {
          await this.router.navigate(['admin/users']);
        } else {
          await this.router.navigate(['user/profile']);
          window.location.reload();

        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessage.push(err.error.errorMessage);
      }
    });
  }

  register() {
    this.errorMessages = [];

    this.authService.registerUser({
      body: this.userDto
    }).subscribe({
      next: async (data) => {
        await this.router.navigate(['confirm-register']);
        alert('Enregistrement réussi !');
      },
      error: (err) => {
        console.log(err);
        this.errorMessages = err.error.validationErrors;
        alert('Échec de l\'enregistrement.');
      }
    });
  }

  toggleShowPasswordLogin() {
    this.showPassword = !this.showPassword;
  }

  toggleShowPasswordRegister() {
    this.showPassword = !this.showPassword;
  }

}
