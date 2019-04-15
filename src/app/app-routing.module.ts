// tslint:disable-next-line:import-spacing
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SearchDialogComponent } from './components/pages/teacher/search-dialog/search-dialog.component';

const routes: Routes = [
  // { path: '', redirectTo: '/internships', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '', component: MainComponent, canActivate: [ AuthGuard ], children: [
    { path: 'teachers', loadChildren: './components/pages/teacher/teacher.module#TeacherModule' },
    { path: 'careers', loadChildren: './components/pages/career/career.module#CareerModule' },
    { path: 'companies', loadChildren: './components/pages/company/company.module#CompanyModule' },
    { path: 'internships', loadChildren: './components/pages/internship/internship.module#InternshipModule' },
    { path: 'students', loadChildren: './components/pages/student/student.module#StudentModule' },
    { path: 'users', loadChildren: './components/pages/user/user.module#UserModule' },
    { path: 'company-tutors', loadChildren: './components/pages/company-tutor/company-tutor.module#CompanyTutorModule' },
    { path: 'search:id', component: SearchDialogComponent }
  ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
