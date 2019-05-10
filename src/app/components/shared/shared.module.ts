import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { MaterialModule } from 'src/app/app-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from '../main.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidebarService } from './sidebar/sidebar.service';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconSidenavDirective } from './sidebar/icon.sidebar.directive';

@NgModule({
  declarations: [
    MainComponent,
    SidenavItemComponent,
    SidebarComponent,
    IconSidenavDirective
  ],
  exports: [
    MainComponent,
    SidebarComponent,
    IconSidenavDirective
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule,
    FlexLayoutModule
  ],
  providers: [SidebarService]
})
export class SharedModule { }
