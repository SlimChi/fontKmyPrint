import { Component, OnInit } from '@angular/core';
import { UtilisateurDto } from '../../swagger/services/models/utilisateur-dto';
import { UtilisateursService } from '../../swagger/services/services/utilisateurs.service';
import { HelperService } from '../../services/helper/helper.service';
import {AddressService} from "../../swagger/services/services/address.service";
import {AdresseDto} from "../../swagger/services/models/adresse-dto";
import {TypeAdresse} from "../../swagger/services/models/type-adresse";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
})
export class ManageUsersComponent implements OnInit {
  users: Array<UtilisateurDto> = [];
  selectedUser: UtilisateurDto | null = null; // Initialize with null to avoid TS2322
  adresse: Array<AdresseDto> = [];
  showDetail = false;
  typesAdresse: Array<TypeAdresse> = []; // étape 1


  constructor(
    private userService: UtilisateursService,
    private helpService: HelperService,
    private adresseService: AddressService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.findAllusers();
    this.getAllTypeAdresse()
    console.log(this.findAllusers());
    console.log(this.findById());
    console.log(this.selectedUser)
    console.log(this.getAllTypeAdresse())

  }

  private findAllusers() {
    this.userService.getUtilisateurs().subscribe({
      next: (value) => {
        this.users = value;
      },
    });
  }

  showDetails(user: UtilisateurDto) {
    this.selectedUser = user;
    this.showDetail = true;
    this.findById();
    this.getAllTypeAdresse()
  }

  private findById() {
    this.userService.getUtilisateurById({
      "idUtilisateur": this.helperService.userId})
    this.adresseService.findAll1()
    if (this.helpService.userId) {
      this.adresseService.findAll1(this.helpService.userId).subscribe({
        next: (adresses) => {
          this.adresse = adresses.filter((adresse) => adresse.utilisateurId === this.helpService.userId);
          console.log(this.adresse)
        },
        error: (err) => {
          console.error(err);
          // gérer le cas d'erreur ici
        }
      });
    } else {
      console.error("this.helpService.userId is undefined"); // Afficher une erreur dans la console
    }
  }

  private getAllTypeAdresse() { // étape 2
    this.adresseService.findAll1().subscribe({
      next: (data) => {
        this.typesAdresse = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
