import { Component, OnInit } from '@angular/core';
import { AuthService } from '../all.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  constructor(public authGuard: AuthService) { }

  ngOnInit(): void {
  }

}
