import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {RequestService, UserRole } from '../all.service';
import { LocalStorageService } from '../local-storage.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  form!: FormGroup

  constructor(private requests: RequestService, private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit(): void { 
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl(null, Validators.required)
    })

    var token: any  = jwt_decode(this.localStorage.get('access_token'));
    if( this.localStorage.get('access_token')) {

      if(token.user_role == "admin") {
        this.router.navigate(['/account'])
      }

      if(token.user_role == "user") {
        this.router.navigate(['/user'])
      }

    } else {
      this.router.navigate(['/'])
    }

  }
  
  submit() {
    let formData = {...this.form.value}
       
    this.requests.postRequestAuth(formData.login, formData.password).subscribe( (response: any) => {
      this.localStorage.set('access_token', response.access_token)
      this.localStorage.set('refresh_token', response.refresh_token)
      var token: any  = jwt_decode(this.localStorage.get('access_token'));

      if(token.user_role == "admin") {
        this.router.navigate(['/account'])
      }

      if(token.user_role == "user") {
        this.router.navigate(['/user'])
      }
    }, () => {
      alert("логин или пароль неверный"); 
    })
    
  }

}
