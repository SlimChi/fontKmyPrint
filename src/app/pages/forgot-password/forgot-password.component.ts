import {Component, OnInit} from '@angular/core';
import {ResetPassword} from "../../swagger/services/models/reset-password";
import {Router} from "@angular/router";
import {UtilisateursService} from "../../swagger/services/services/utilisateurs.service";



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{
  resetPasssword: ResetPassword={email:''};
  errorMessages: Array<string> = [];
  errorMessage: string | null = null;
  constructor(
    private router: Router,
    private userService: UtilisateursService,

  ) {

  }

  ngOnInit(): void {

  }

  forgotPassword() {
    if (!this.resetPasssword.email) {
      this.errorMessage = 'Veuillez entrer votre émail et vous recevrez un lien de réinitialisation du mot de passe';
      return;
    }

    this.userService.resetPasswordEmail({
      body: this.resetPasssword
    }).subscribe({
      next: async (data) => {
        await this.router.navigate(['response-password']);

      },
      error: (err: { error: { validationErrors: string[]; }; }) => {
        console.log(err);
        this.errorMessages = err.error.validationErrors;
   ;
      }
    });
  }
  async cancel() {
    await this.router.navigate(['user/adresses']);
  }
}
