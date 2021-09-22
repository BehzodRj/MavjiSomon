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
@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    AccountPageComponent,
    ErrorPageComponent,
    ResistrationPageComponent,
    CreatPageComponent,
    HeaderPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
