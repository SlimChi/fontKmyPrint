import { Component, OnInit } from '@angular/core';
import {HelperService} from "../../services/helper/helper.service";
import {UserService} from "../../swagger/services/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../swagger/services/models/user";
import {UserDto} from "../../swagger/services/models/user-dto";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdresseDto} from "../../swagger/services/models/adresse-dto";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  userDto: UserDto = {password: '', email: '', firstName: '', lastName: ''};
  user: User = {email: '', firstName: '', lastName: ''};

  users: Array<UserDto> = [];
  adresseDto: AdresseDto = {};
  adresse: Array<AdresseDto> = [];

  url: string | null = '';
  successMsg = '';
  errorMessage: Array<string> = [];

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private helperService: HelperService
  ) { }


  ngOnInit(): void {
    this.errorMessage =[];
    this.findById();
    console.log(this.helperService.userId);
  }

  private findById() {
    this.userService.findById(
      {"user-id": this.helperService.userId})
      .subscribe({
        next: (data) => {
          this.userDto = data;
          this.adresse = data.adresse ?? [];
          console.log(data);

        },
        error: (err) => {
          console.error(err);
          // handle the error scenario here
        }
      });
  }

  save() {
    this.successMsg = '';
    this.errorMessage = [];

    this.userService.updateUser({
      id : this.helperService.userId,
      body: this.userDto

    }).subscribe({
      next: () => {
        this.successMsg = 'Votre profil a été mis à jour';
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error.errorMessage || 'Une erreur s\'est produite lors de la mise à jour de votre profil';
      }
    });
  }

  async cancel() {
    await this.router.navigate(['home']);
  }

}
