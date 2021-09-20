import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {RequestService } from '../all.service';
import { LocalStorageService } from '../local-storage.service';

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

    this.requests.getRequestAuth(this.localStorage.get('access_token')).subscribe(response=>{}, (error) => {
      if(error.status == 401) {
        this.requests.postRequestRefreshAuth(this.localStorage.get('refresh_token')).subscribe((response: any)=>{
          this.localStorage.set('access_token', response.access_token);
          this.localStorage.set('refresh_token', response.refresh_token);
          
          
        }, (error) => { 
          this.localStorage.remove('refresh_token');
          this.localStorage.remove('access_token')
          this.router.navigate(['/'])
        })  
      }
    })
    
  }
  
  submit() {
    let formData = {...this.form.value}
       
    this.requests.postRequestAuth(formData.login, formData.password).subscribe( (response: any) => {
      this.localStorage.set('access_token', response.access_token)
      this.localStorage.set('refresh_token', response.refresh_token)
      this.router.navigate(['/account'])
    }, () => {
      alert("логин или пароль неверный"); 
    })
    
  }

}
