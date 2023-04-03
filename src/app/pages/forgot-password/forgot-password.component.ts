import {Component, OnInit} from '@angular/core';
import {ResetPassword} from "../../swagger/services/models/reset-password";
import {Router} from "@angular/router";
import {UserService} from "../../swagger/services/services/user.service";


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  resetPasssword: ResetPassword={email:''};
  errorMessages: Array<string> = [];

  constructor(
    private router: Router,
    private userService: UserService,

  ) {

  }

  ngOnInit(): void {
  }

  forgotPassword() {
    this.userService.resetPasswordEmail({
      body: this.resetPasssword
    }).subscribe({
      next: async (data) => {
        await this.router.navigate(['response-password']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessages = err.error.validationErrors;
      }
    });
  }

}
