import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    formGroup: FormGroup;
    constructor(private fb: FormBuilder, private loginService: LoginService) { }

    ngOnInit() {
        this.loadAndCreateForm();
    }

    loadAndCreateForm(): void {
        this.formGroup = this.fb.group({
            dni: ['', [Validators.required, Validators.pattern('[0-9]{8,10}')]],
            password: ['', Validators.required]
        })
    }

    postLogin(): void {        
        this.loginService.postLogin(this.formGroup.value).subscribe();  
    }
}
