import { Component, OnInit } from '@angular/core';
import {HelperService} from "../../services/helper/helper.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {AdresseDto} from "../../swagger/services/models/adresse-dto";
import {UtilisateursService} from "../../swagger/services/services/utilisateurs.service";
import {UtilisateurDto} from "../../swagger/services/models/utilisateur-dto";
import {RegisterRequest} from "../../swagger/services/models/register-request";
import {TypeAdresse} from "../../swagger/services/models/type-adresse";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  userDto: RegisterRequest = {password: '', email: '', nom: '', prenom: '',telephone:''};
  user: UtilisateurDto = {email: '', nom: '', prenom: '',telephone:''};

  users: Array<UtilisateurDto> = [];
  adresse: Array<AdresseDto> = [];
  editMode = false;
  url: string | null = '';
  successMsg = '';
  errorMessage: Array<string> = [];
  errorMessage2: string | null = null;
  constructor(
    private http: HttpClient,
    private userService: UtilisateursService,
    private router: Router,
    public helperService: HelperService,

  ) { }


  ngOnInit(): void {
    this.errorMessage =[];
    this.findById();
    console.log(this.helperService.userId);
    console.log(this.findById());
  }
  private findById() {
    this.userService.getUtilisateurById({"idUtilisateur": this.helperService.userId})
      .subscribe({
        next: (data) => {
          this.userDto = data as RegisterRequest; // Cast de la variable data en RegisterRequest
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
    if (!this.userDto.nom || !this.userDto.prenom) {
      this.errorMessage2 = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    // Assign the properties of this.userDto to this.user
    this.userService.updateUser({
      id: this.helperService.userId,
      firstName: this.userDto.prenom,
      lastName: this.userDto.nom,
      email: this.userDto.email ?? '',
      telephone: this.userDto.telephone ?? ''
    }).subscribe({
      next: () => {
        this.successMsg = 'Votre profil a été mis à jour';
        this.editMode = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error.errorMessage || 'Une erreur s\'est produite lors de la mise à jour de votre profil';
      }
    });

  }


  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  async cancel() {
    await this.router.navigate(['home']);
  }

  onDeleteUser() {

  }

  async back() {
    await this.router.navigate(['user/home']);
    this.editMode = false;
  }

}
