import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../all.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-resistration-page',
  templateUrl: './resistration-page.component.html',
  styleUrls: ['./resistration-page.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ResistrationPageComponent implements OnInit {
  formReg!: FormGroup;

  constructor(private requests: RequestService, private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    
    this.formReg = new FormGroup({
      account_id: new FormControl(''),
    })

  }

  send() {
    const formRegData = {...this.formReg.value}

      this.requests.postRegistration(formRegData.account_id).subscribe(response => {
        if(formRegData.login == '' || formRegData.account_id == '') {
          alert("Поля не должен быть пустым")
        } else {
          this.router.navigate(['/pincode'], { queryParams: { account_id: formRegData.account_id } })
        }
      })
    }
  }
