import { Component, OnInit } from '@angular/core';
import {UtilisateurDto} from "../../swagger/services/models/utilisateur-dto";
import {UtilisateursService} from "../../swagger/services/services/utilisateurs.service";


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
})
export class ManageUsersComponent implements OnInit {

  users: Array<UtilisateurDto> = [];

  constructor(
    private userService: UtilisateursService,
  ) { }

  ngOnInit(): void {
    this.findAllusers();
  }

  private findAllusers() {
    this.userService.getUtilisateurs()
      .subscribe({
        next: (value) => {
          this.users = value;
        }
      });
  }

}
