import { BrowserModule } from '@angular/platform-browser'; import { NgModule } from '@angular/core';
import { AppComponent } from './app.component'; import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { MainComponent } from './components/main.component'; import { MaterialModule } from './app-material.module';
import { PagesModule } from './components/pages/pages.module'; import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginModule } from './components/pages/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TeacherSearchDialogComponent } from './components/pages/teacher/teacher-search-dialog/teacher-search-dialog.component';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    MainComponent,
    TeacherSearchDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot(),
    HttpClientModule,
    MaterialModule,
    LoginModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TeacherSearchDialogComponent]
})
export class AppModule { }
