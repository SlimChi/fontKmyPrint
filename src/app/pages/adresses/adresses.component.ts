import {Component, OnInit} from '@angular/core';
import {AdresseDto} from "../../swagger/services/models/adresse-dto";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {HelperService} from "../../services/helper/helper.service";
import {AddressService} from "../../swagger/services/services/address.service";
import {UserDto} from "../../swagger/services/models/user-dto";
import {User} from "../../swagger/services/models/user";
import {UserService} from "../../swagger/services/services/user.service";
import {forkJoin} from "rxjs";
import {TypeAdresse} from "../../swagger/services/models/type-adresse";


@Component({
  selector: 'app-adresses',
  templateUrl: './adresses.component.html',
  styleUrls: ['./adresses.component.css']
})
export class AdressesComponent implements OnInit{

  userDto: UserDto = {password: '', email: '', firstName: '', lastName: ''};
  user: User = {email: '', firstName: '', lastName: ''};

  users: Array<UserDto> = [];
  adresse: Array<AdresseDto> = [];
  typesAdresse: Array<TypeAdresse> = []; // étape 1
  url: string | null = '';
  errorMessage: string | undefined;
  successMsg = '';

  constructor(
    private http: HttpClient,
    private adresseService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private helperService: HelperService
  ) { }


  ngOnInit(): void {
    this.errorMessage ='';
    this.findById();
    this.getAllTypeAdresse(); // étape 2
    // console.log(this.helperService.userId);
  }

  private findById() {
    forkJoin([
      this.userService.findById({"user-id": this.helperService.userId}),
      this.adresseService.findAll1() // étape 2
    ]).subscribe({
      next: ([userData, typesAdresseData]) => {
        this.userDto = userData;
        this.adresse = userData.adresse ?? [];
        this.typesAdresse = typesAdresseData; // étape 2
      },
      error: (err) => {
        console.error(err);
        // handle the error scenario here
      }
    });
  }

  editAdresse(adresseId: number, typeAdresseId: number) { // étape 3
    let apiUrl = this.router.navigate(['user/update-adresse', adresseId], { state: { typeAdresseId: typeAdresseId }});
    console.log(adresseId);
  }

  confirmDelete(adresseId: number) {
    if (confirm('Voulez-vous vraiment supprimer cette adresse ?')) {
      this.deleteAdresse(adresseId);
    } else {
      this.router.navigate(['user/adresses']); // Redirection vers la page des adresses de l'utilisateur
    }
  }

  deleteAdresse(adresseId: number) {
    if(confirm("Voulez-vous vraiment supprimer cette adresse ?")) {
      this.adresseService.delete1({'address-id': adresseId}).subscribe({
        next: () => {
          this.successMsg = 'Adresse supprimée avec succès';
          // Rechargez la liste des adresses ici, si nécessaire
          this.router.navigate(['user/adresses']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Erreur lors de la suppression de l\'adresse';
        }
      });
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
