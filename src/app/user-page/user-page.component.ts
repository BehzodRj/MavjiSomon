import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { RequestService } from '../all.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  formTarif!: FormGroup
  user: any = []
  tarifs: any = []

  constructor(private localStorage: LocalStorageService, private request: RequestService, private router: Router) { }

  ngOnInit(): void {
    this.formTarif = new FormGroup({
      changeTr: new FormControl()
    })
    var token: any  = jwt_decode(this.localStorage.get('access_token'));
    console.log(token);

    this.request.getAccountUser(this.localStorage.get('access_token'), token.user_id).subscribe(response => {
      this.user = response
      this.formTarif.controls['changeTr'].setValue(this.user?.tarif_id, {onlySelf: true});
      console.log(response);
      
    }, error => {
      if(error.status == 401) {
        this.request.postRequestRefreshAuth(this.localStorage.get('refresh_token')).subscribe( (response: any) => {
          this.localStorage.set('access_token', response.access_token)
          this.localStorage.set('refresh_token', response.refresh_token)
          window.location.reload()
        }, error => {
          localStorage.clear()
          this.router.navigate(['/'])
        })
      }
    })
    this.request.getTarifData().subscribe(response => {
      this.tarifs = response
    })

  }

  change() {
    const formChangeTrData = {...this.formTarif.value}

    this.request.changeTarifData(formChangeTrData.changeTr, this.user.account_id).subscribe(response => {
      window.location.reload()
    }, error => {
      alert(error.error.Error)
    })
    
  }

  

}
