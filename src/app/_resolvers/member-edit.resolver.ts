import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user.model';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _alertify: AlertifyService,
    private _authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this._userService
      .getUser(this._authService.decodedToken.nameid)
      .pipe(
        catchError((error) => {
          this._alertify.error('problem retrieving your data');
          this._router.navigate(['/members']);
          return of(null);
        })
      );
  }
}
