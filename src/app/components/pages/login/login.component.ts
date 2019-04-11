import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  .contenedor {
    margin: 10px auto;
    width: 100%;
    background-color: #E7F6F6;
    border: 1px solid #99cccc;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .contenido {
      padding-top: 80px;
      padding-bottom: 80px;
  }
  .center-div {
      margin: 0 auto;
  }
  .form-login {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
  }
  .button-row {
      margin-right: 8px;
  }
  `]
})
export class LoginComponent implements OnInit {
    formGroup = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern('[0-9]{8,10}')]],
      password: ['', Validators.required]
    });
    constructor(private fb: FormBuilder,
                private loginService: LoginService,
                private notificationService: NotificationsService) { }

    ngOnInit() {
    }

    postLogin(): void {
        this.loginService.postLogin(this.formGroup.value)
        .subscribe((res) => {
            console.log(res);
          },
          (error: any) => {
            this.notificationService.create('Ups... Hubo un problema', error, NotificationType.Error);
          }
        );
    }

    onKeyPress(event: KeyboardEvent) {
// tslint:disable-next-line: deprecation
      const keycode = event.which;
// tslint:disable-next-line: triple-equals
      if (!(event.shiftKey == false && (keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
        event.preventDefault();
      }
    }
}
