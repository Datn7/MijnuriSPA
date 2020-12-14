import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _alertify: AlertifyService
  ) {}

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true;
    }

    this._alertify.error('შედით სისტემაში');
    this._router.navigate(['/home']);
    return false;
  }
}
