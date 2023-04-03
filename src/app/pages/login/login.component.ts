import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserDto} from "../../swagger/services/models/user-dto";
import {AuthenticationRequest} from "../../swagger/services/models/authentication-request";
import {AuthenticationService} from "../../swagger/services/services/authentication.service";
import {UserService} from "../../swagger/services/services/user.service";
import {AdminService} from "../../swagger/services/services/admin.service";
import {TokenService} from "../../services/token-service/token.service";
import {HelperService} from "../../services/helper/helper.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  userDto: UserDto = {firstName: '', lastName: '', email: '', password: ''};

  authRequest: AuthenticationRequest = {};
  errorMessages: Array<string> = [];
  errorMessage: Array<string> = [];
  url = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private userService: UserService,
    private adminService: AdminService,
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
        this.tokenService.savetoken(data.token as string)
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(<string>data.token);
        console.log(decodedToken)
        if (decodedToken.authorities[0].authority === 'ROLE_ADMIN') {
          await this.router.navigate(['admin/users']);
        } else {
          await this.router.navigate(['user/profile']);
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

    this.userService.registerUser({
        body: this.userDto
      }
    ).subscribe({
      next: async (data) => {
        await this.router.navigate(['confirm-register']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessages = err.error.validationErrors;
      }
    });
  }

}
