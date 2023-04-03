import {Component, OnInit} from '@angular/core';
import {UserDto} from "../../swagger/services/models/user-dto";
import {AdresseDto} from "../../swagger/services/models/adresse-dto";
import {AddressService} from "../../swagger/services/services/address.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HelperService} from "../../services/helper/helper.service";
import {UserService} from "../../swagger/services/services/user.service";
import {User} from "../../swagger/services/models/user";

@Component({
  selector: 'app-add-adresse',
  templateUrl: './add-adresse.component.html',
  styleUrls: ['./add-adresse.component.css']
})
export class AddAdresseComponent implements OnInit{

  adresse: AdresseDto = {id: 0, rue: '', ville: '', codePostal: ''};
  errorMessage: string | null = null;
  successMsg = '';

  userDto: UserDto = {password: '', email: '', firstName: '', lastName: ''};
  user: User = {email: '', firstName: '', lastName: ''};

  users: Array<UserDto> = [];

  constructor(
    private adresseService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private helperService: HelperService

  ) { }

  ngOnInit(): void {
    this.findUserById();
    console.log(this.helperService.userId);
  }

  addAdresse() {
    this.successMsg = '';
    const adresseDto: AdresseDto = {
      codePostal: this.adresse.codePostal,
      complement: this.adresse.complement,
      rue: this.adresse.rue,
      ville: this.adresse.ville,
      typeAdresse: this.adresse.typeAdresse, // Ajout de typeAdresse
      userId: this.helperService.userId
    };

    this.userService.addAdresseToUser({
      body: adresseDto
    })
      .subscribe({
        next: () => {
          this.successMsg = 'Votre adresse a été ajoutée';
          // rediriger vers la liste des adresses
          this.router.navigate(['user/adresses']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Erreur lors de l\'ajout de l\'adresse';
        }
      });
  }

  private findUserById() {
    this.userService.findById(
      {"user-id": this.helperService.userId})
      .subscribe({
        next: (data) => {
          this.userDto = data;
          console.log(data);

        },
        error: (err) => {
          console.error(err);
          // handle the error scenario here
        }
      });
  }


  async cancel() {
    await this.router.navigate(['user/adresses']);
  }
}
