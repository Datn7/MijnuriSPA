import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss'],
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _alertify: AlertifyService
  ) {}

  ngOnInit(): void {}

  sendLike(id: number) {
    this._userService
      .sendLike(this._authService.decodedToken.nameid, id)
      .subscribe(
        (data) => {
          this._alertify.success('თქვენ შეგიყვარდათ: ' + this.user.knownAs);
        },
        (error) => {
          this._alertify.error(error);
        }
      );
  }
}
