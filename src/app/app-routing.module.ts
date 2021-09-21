import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from './account-page/account-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthGuard } from './auth.guard';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ResistrationPageComponent } from './resistration-page/resistration-page.component';

const routes: Routes = [
  { path: '', component: AuthPageComponent },
  { path: 'account', component: AccountPageComponent, canActivate: [AuthGuard] },
  { path: 'registration', component: ResistrationPageComponent, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo:"/error" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
