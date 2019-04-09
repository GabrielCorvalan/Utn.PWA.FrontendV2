import { Component } from '@angular/core';
import { LoginService } from '../../pages/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private loginService: LoginService) { }

  logout(): void {
    this.loginService.logout();
  }

}
