import {Component, OnInit} from '@angular/core';
import {UserService} from "../../swagger/services/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";

import {NewPassword} from "../../swagger/services/models/new-password";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  errorMessages: Array<string> = [];
  newPassword: NewPassword = {};
  token?: string;
  tokenUrl = '';

  ngOnInit(): void {
    this.tokenUrl = this.route.snapshot.queryParams['token'];
    this.newPassword.tokenPassword = this.tokenUrl;
  }

  constructor(private auth: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  resetPassword() {
    this.auth.resetPassword({
      token: this.tokenUrl,
      body:  this.newPassword
    }).subscribe({
      next: async (data) => {
        await this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err);
        this.errorMessages = err.error.validationErrors;
      }
    });
  }
}
