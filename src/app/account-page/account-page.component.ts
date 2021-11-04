import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account, RequestService } from '../all.service';
import { LocalStorageService } from '../local-storage.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {
  accounts: Account[] = []
  search: any;
  page: any
  showDelete = false
  
  constructor(private router: Router, private requests: RequestService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.requests.getAccountData(this.localStorage.get('access_token')).subscribe( (response: any) => { 
      this.accounts = response
      this.accounts = this.accounts.sort((a,b) => b.account_id.localeCompare(a.account_id));
      
    }, error => {
      if(error.status == 401) {
        this.requests.postRequestRefreshAuth(this.localStorage.get('refresh_token')).subscribe( (response: any) => {
          this.localStorage.set('access_token', response.access_token);
          this.localStorage.set('refresh_token', response.refresh_token);
          window.location.reload()
        }, error => {
          localStorage.clear()
          this.router.navigate(['/'])
        })
      }
      
    })
    var token: any  = jwt_decode(this.localStorage.get('access_token'));
    if(token.user_role == "admin") {
      this.showDelete = true
    }
  }

  logOut() {
    localStorage.clear()
    this.router.navigate(['/'])
  }
  deleteAccount(account_id:string) {
      const conf = confirm('Вы хотите удалить Аккаунт '+ account_id)
      if(conf == true) {
        this.requests.deleteAccountData(account_id).subscribe(response => {})
        window.location.reload()
      }
      
  }  
  refreshtarif(account_id:string) {
      this.requests.refreshTarif(account_id).subscribe(response => {alert("Запрос успешно выполнен!");}, error => {
        alert("Произошла ощибка обратитесь к администратору!");
      })
      
    
}  

}
