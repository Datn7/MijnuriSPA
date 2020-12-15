import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(
    public _authService: AuthService,
    private _alertify: AlertifyService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._authService.currentPhotoUrl.subscribe((photoUrl) => {
      this.photoUrl = photoUrl;
    });
  }

  login() {
    this._authService.login(this.model).subscribe(
      (next) => {
        console.log('შეხვედით');
        this._alertify.success('წარმატებით შეხვედით');
      },
      (error) => {
        console.log(error);
        this._alertify.error(error);
      },
      () => {
        //use router sevice to navcigate by url
        this._router.navigate(['/members']);
      }
    );
  }

  loggedIn() {
    return this._authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._authService.decodedToken = null;
    this._authService.currentUser = null;
    console.log('გახვედით');
    this._alertify.message('გახვედით სისტემიდან');
    this._router.navigate(['/']);
  }
}
