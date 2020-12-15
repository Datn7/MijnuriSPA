import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/user.model';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'MijnuriSPA';
  jwtHelper = new JwtHelperService();

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this._authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (user) {
      this._authService.currentUser = user;
      this._authService.changeMemberPhoto(user.photoUrl);
    }
  }
}
