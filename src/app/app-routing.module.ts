import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from './account-page/account-page.component';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth-page/auth-page.component';

const routes: Routes = [
  { path: '', component: AuthPageComponent },
  { path: 'account', component: AccountPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
