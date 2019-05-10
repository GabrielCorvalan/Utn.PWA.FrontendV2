import {Directive, HostBinding, HostListener, OnInit, OnDestroy} from '@angular/core';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { SidebarService } from './sidebar.service';
import { SidenavItem } from '../sidenav-item/sidenav-item.model';

@Directive({
  selector: '[appMsIconSidenav]'
})
export class IconSidenavDirective implements OnInit, OnDestroy {

  private mediaSubscription: Subscription;
  isMobile = false;

  @HostBinding('class.icon-sidenav')
  get isIconSidenav(): boolean {
    return this.sidenavService.isIconSidenav;
  }

  @HostBinding('class.collapsed')
  collapsed: boolean;

  currentlyOpen: SidenavItem[];

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.isIconSidenav && !this.isMobile) {
      this.collapsed = false;

      this.sidenavService.nextCurrentlyOpen(this.currentlyOpen);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.isIconSidenav && !this.isMobile) {
      this.collapsed = true;

      this.currentlyOpen = this.sidenavService.currentlyOpen;
      this.sidenavService.nextCurrentlyOpen([]);
    }
  }

  constructor(
    private sidenavService: SidebarService,
    private mediaObserver: MediaObserver
  ) { }

  ngOnInit() {
    this.mediaSubscription = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');
    });
  }

  ngOnDestroy() {
    this.mediaSubscription.unsubscribe();
  }
}
