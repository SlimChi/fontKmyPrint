import {Component, OnInit} from '@angular/core';
import {UserDto} from "../../swagger/services/models/user-dto";
import {User} from "../../swagger/services/models/user";
import {AdresseDto} from "../../swagger/services/models/adresse-dto";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../swagger/services/services/user.service";
import {AddressService} from "../../swagger/services/services/address.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HelperService} from "../../services/helper/helper.service";
import {Adresse} from "../../swagger/services/models/adresse";
import {Observable} from "rxjs";

@Component({
  selector: 'app-update-adresse',
  templateUrl: './update-adresse.component.html',
  styleUrls: ['./update-adresse.component.css']
})
export class UpdateAdresseComponent implements OnInit{

  userDto: UserDto = {password: '', email: '', firstName: '', lastName: ''};
  adresse: AdresseDto = {id: 0, rue: '', ville: '', codePostal: ''};
  errorMessage: string | null = null;
  successMsg = '';
  errorMessages: Array<string> = [];
  constructor(
    private adresseService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    const adresseId = Number(this.route.snapshot.paramMap.get('id'));
    this.getAdresseById(adresseId);
  }

  getAdresseById(adresseId: number) {
    this.adresseService.findById1({'address-id': adresseId})      .subscribe({
        next: (data) => {
          this.adresse = data;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error retrieving address details';
        }
      });
  }

  updateAdresse() {
    this.successMsg = '';
    if (this.adresse.id) {
      this.adresseService.save2({
        body: this.adresse

      })
      .subscribe({
          next: () => {
            this.successMsg = 'Votre adresse a été mise à jour';
          },
          error: (err) => {
            console.error(err);
            this.errorMessage = 'Error updating address';
          }
        });
    }
  }

  addAdresse() {
    this.successMsg = '';
    this.adresseService.save2({
      body: this.adresse
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



  async cancel() {
    await this.router.navigate(['user/adresses']);
  }
}
