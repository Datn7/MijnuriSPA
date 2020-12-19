import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;
  user: User;

  locale = 'ka';

  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private _authService: AuthService,
    private _alertify: AlertifyService,
    private _fb: FormBuilder,
    private localeService: BsLocaleService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.bsConfig = {};
    this.createRegisterForm();
    /*
    this.registerForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      this.passwordMatchValidator
    );
   */
  }

  applyLocale(pop: any) {
    this.localeService.use(this.locale);
  }

  createRegisterForm() {
    this.registerForm = this._fb.group(
      {
        gender: ['male'],
        username: ['', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this._authService.register(this.user).subscribe(
        () => {
          this._alertify.success('რეგისტრაცია წარმატებით დასრულდა');
        },
        (error) => {
          this._alertify.error(error);
        },
        () => {
          this._authService.login(this.user).subscribe(() => {
            this._router.navigate(['/members']);
          });
        }
      );
    }

    /*
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
  */
    console.log(this.registerForm.value);
  }

  cancel() {
    console.log('უკან გახვედით');
    this.cancelRegister.emit(false);
  }
}
