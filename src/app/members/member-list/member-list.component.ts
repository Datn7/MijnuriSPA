import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user.model';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(
    private _userService: UserService,
    private _alertifyService: AlertifyService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe((data) => {
      this.users = data['users'];
    });
  }

  /*
  loadUsers() {
    this._userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        this._alertifyService.error(error);
      }
    );
  }
 */
}
