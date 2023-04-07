import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {NewPassword} from "../../swagger/services/models/new-password";
import {UtilisateursService} from "../../swagger/services/services/utilisateurs.service";

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
  successMsg = '';
  confirmPassword = '';
  showPassword = false;


  ngOnInit(): void {
    this.tokenUrl = this.route.snapshot.queryParams['token'];
    this.newPassword.tokenPassword = this.tokenUrl;
  }

  constructor(private auth: UtilisateursService,
              private route: ActivatedRoute,
              private router: Router) {
  }


  resetPassword() {
    if (this.newPassword.password !== this.confirmPassword) {
      this.errorMessages.push("Les deux mots de passe ne sont pas identique !!");
      return;
    }
    this.auth.resetPassword({
      token: this.tokenUrl,
      body: this.newPassword
    }).subscribe({
      next: async (data) => {
        this.successMsg = 'Votre mot de passe a été mis à jour';
        await this.router.navigate(['login']);
     ;
      },
      error: (err: { error: { validationErrors: string[]; }; }) => {
        console.log(err);
        this.errorMessages = err.error.validationErrors;
      }
    });
  }

  toggleShowPasswordNewPassword() {
    this.showPassword = !this.showPassword;
  }
}
