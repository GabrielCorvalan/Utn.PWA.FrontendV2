import { MaterialModule } from './app-material.module';
import { BrowserModule } from '@angular/platform-browser'; import { NgModule } from '@angular/core';
import { AppComponent } from './app.component'; import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './components/pages/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { TeacherSearchDialogComponent } from './components/pages/teacher/teacher-search-dialog/teacher-search-dialog.component';
import { SharedModule } from './components/shared/shared.module';
import { PagesModule } from './components/pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TeacherSearchDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    LoginModule,
    SharedModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TeacherSearchDialogComponent]
})
export class AppModule { }
