import { LoginService } from './../../pages/login/login.service';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidebarService } from './sidebar.service';
import { SidenavItem } from '../sidenav-item/sidenav-item.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit, OnDestroy {

  items: SidenavItem[];
  homeItem: SidenavItem = new SidenavItem({
    name: 'Inicio',
    icon: 'home',
    route: '',
    position: 1,
    subItems: [],
    description: null
  });
  exitItem: SidenavItem = new SidenavItem({
    name: 'Salir',
    icon: 'exit_to_app',
    route: '/exit',
    position: 12,
    subItems: [],
    description: null
  });

  private itemsSubscription: Subscription;
  private routerEventsSubscription: Subscription;

  constructor(
    private sidenavService: SidebarService,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.itemsSubscription = this.sidenavService.items$
      .subscribe((items: SidenavItem[]) => {
        this.items = items;
      });
    this.routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.sidenavService.nextCurrentlyOpenByRoute(event.url);
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 400);
      }
    });
  }

  toggleIconSidenav() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);

    this.sidenavService.isIconSidenav = !this.sidenavService.isIconSidenav;
  }

  isIconSidenav(): boolean {
    return this.sidenavService.isIconSidenav;
  }

  logout() {
    this.loginService.logout();
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
    this.routerEventsSubscription.unsubscribe();
  }

}
