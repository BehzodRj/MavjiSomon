import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account, RequestService } from '../all.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {
  account!: Account

  constructor(private router: Router, private requests: RequestService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.requests.postAccountData(this.localStorage.get('access_token')).subscribe( response => {
      console.log(response);    
    })
  }

  logOut() {
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
