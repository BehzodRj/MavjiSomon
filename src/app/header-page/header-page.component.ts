import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { LocalStorageService } from '../local-storage.service';


@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css']
})
export class HeaderPageComponent implements OnInit {

  constructor(private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.clear()
    this.router.navigate(['/'])
  }
  page() {
    var token: any  = jwt_decode(this.localStorage.get('access_token'));
    if(token.user_role == "admin") {
      this.router.navigate(['/account'])
    }
  }

}
