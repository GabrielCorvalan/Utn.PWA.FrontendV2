import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';
import { SidebarService } from './shared/sidebar/sidebar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MatSidenav;

  sidenavMode = 'side';
  isMobile = false;
  menu = 'menu';

  private mediaSubscription: Subscription;
  public routerEventsSubscription: Subscription;

  constructor(
    private mediaObserver: MediaObserver,
    private router: Router,
    private sidenavService: SidebarService
    ) { }

  ngOnInit() {
    this.mediaSubscription = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      const isMobile = change.mqAlias === 'xs' || change.mqAlias === 'sm';
      this.isMobile = isMobile;
      this.sidenavMode = isMobile ? 'over' : 'side';
      if (!isMobile) {
        this.sidenav.open();
      } else {
        this.sidenav.opened = false;
      }
    });

    this.routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isMobile && this.sidenav != undefined) {
        if (this.sidenav != null) {
          this.sidenav.close();
        }
      }
    });
  }

  ngOnDestroy() {
    this.mediaSubscription.unsubscribe();
  }

  openCloseSidenav() {
    if (this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
    this.toggleIcon();
  }

  toggleIcon() {
    this.sidenavService.isSidenavClose(this.sidenav).subscribe((closeSidenavResponse: any) => {
      this.menu = closeSidenavResponse ? 'close' : 'menu';
    });
  }

}
