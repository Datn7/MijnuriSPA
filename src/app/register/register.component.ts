import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  model: any = {};

  constructor(
    private _authService: AuthService,
    private _alertify: AlertifyService
  ) {}

  ngOnInit(): void {}

  register() {
    console.log(this.model);
    this._authService.register(this.model).subscribe(
      () => {
        console.log('წარმატებით დარეგისტრირდით');
        this._alertify.success('წარმატებით გაიარეთ რეგისტრაცია');
      },
      (error) => {
        console.log(error);
        this._alertify.error(error);
      }
    );
  }

  cancel() {
    console.log('უკან გახვედით');
  }
}
