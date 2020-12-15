import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  user: User;

  constructor(
    private _route: ActivatedRoute,
    private _alertify: AlertifyService,
    private _userService: UserService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe((data) => {
      this.user = data['user'];
    });
  }

  updateUser() {
    console.log(this.user);
    this._userService
      .updateUser(this._authService.decodedToken.nameid, this.user)
      .subscribe(
        (next) => {
          this._alertify.success('პროფილი განახლდა წარმატებით');
          this.editForm.reset(this.user);
        },
        (error) => {
          this._alertify.error(error);
        }
      );
  }
}
