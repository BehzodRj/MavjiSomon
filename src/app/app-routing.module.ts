import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from './account-page/account-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthGuard } from './auth.guard';
import { ChangePangeComponent } from './change-pange/change-pange.component';
import { CreatPageComponent } from './creat-page/creat-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PincodePageComponent } from './pincode-page/pincode-page.component';
import { ResistrationPageComponent } from './resistration-page/resistration-page.component';
import { ToUpBalancePageComponent } from './to-up-balance-page/to-up-balance-page.component';
import { TransactionPageComponent } from './transaction-page/transaction-page.component';

const routes: Routes = [
  { path: '', component: AuthPageComponent },
  { path: 'registration', component: ResistrationPageComponent },
  { path: 'pincode', component: PincodePageComponent },
  { path: 'account', component: AccountPageComponent, canActivate: [AuthGuard] },
  { path: 'creat', component: CreatPageComponent, canActivate: [AuthGuard] },
  { path: 'balance/:id', component: ToUpBalancePageComponent, canActivate: [AuthGuard] },
  { path: 'change/:id', component: ChangePangeComponent, canActivate: [AuthGuard] },
  { path: 'transaction/:id', component: TransactionPageComponent, canActivate: [AuthGuard] },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', redirectTo:"/error" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
