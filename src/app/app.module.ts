import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountPageComponent } from './account-page/account-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ResistrationPageComponent } from './resistration-page/resistration-page.component';
import { CreatPageComponent } from './creat-page/creat-page.component';
import { HeaderPageComponent } from './header-page/header-page.component';
import { PincodePageComponent } from './pincode-page/pincode-page.component';
import { ChangePangeComponent } from './change-pange/change-pange.component';
import { ToUpBalancePageComponent } from './to-up-balance-page/to-up-balance-page.component';
import { TransactionPageComponent } from './transaction-page/transaction-page.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    AccountPageComponent,
    ErrorPageComponent,
    ResistrationPageComponent,
    CreatPageComponent,
    HeaderPageComponent,
    PincodePageComponent,
    ChangePangeComponent,
    ToUpBalancePageComponent,
    TransactionPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
