import { AuthInterceptor } from './auth.interceptor';
import { MaterialModule } from './app-material.module';
import { BrowserModule } from '@angular/platform-browser'; import { NgModule } from '@angular/core';
import { AppComponent } from './app.component'; import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './components/pages/login/login.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchDialogComponent } from './components/pages/teacher/search-dialog/search-dialog.component';
import { SimpleNotificationsModule } from 'angular2-notifications'; import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SharedModule } from './components/shared/shared.module';
import { PagesModule } from './components/pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    NgxWebstorageModule.forRoot(),
    LoginModule,
    FlexLayoutModule,
    SharedModule,
    PagesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [SearchDialogComponent]
})
export class AppModule { }
