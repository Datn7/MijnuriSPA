import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    public _authService: AuthService,
    private _alertify: AlertifyService
  ) {}

  ngOnInit(): void {}

  login() {
    this._authService.login(this.model).subscribe(
      (next) => {
        console.log('შეხვედით');
        this._alertify.success('წარმატებით შეხვედით');
      },
      (error) => {
        console.log(error);
        this._alertify.error(error);
      }
    );
  }

  loggedIn() {
    return this._authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    console.log('გახვედით');
    this._alertify.message('გახვედით სისტემიდან');
  }
}
