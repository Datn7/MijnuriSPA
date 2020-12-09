import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this._authService.login(this.model).subscribe(
      (next) => {
        console.log('შეხვედით');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    //if yes return true if no return false
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('გახვედით');
  }
}
