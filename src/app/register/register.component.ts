import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  model: any = {};

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {}

  register() {
    console.log(this.model);
    this._authService.register(this.model).subscribe(
      () => {
        console.log('წარმატებით დარეგისტრირდით');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancel() {
    console.log('უკან გახვედით');
  }
}
