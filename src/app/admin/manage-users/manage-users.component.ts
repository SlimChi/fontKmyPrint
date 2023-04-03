import { Component, OnInit } from '@angular/core';
import {UserDto} from "../../swagger/services/models/user-dto";
import {UserService} from "../../swagger/services/services/user.service";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
})
export class ManageUsersComponent implements OnInit {

  users: Array<UserDto> = [];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.findAllusers();
  }

  private findAllusers() {
    this.userService.findAll()
      .subscribe({
        next: (value) => {
          this.users = value;
        }
      });
  }

}
