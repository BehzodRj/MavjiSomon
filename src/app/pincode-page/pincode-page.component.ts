import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../all.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-pincode-page',
  templateUrl: './pincode-page.component.html',
  styleUrls: ['./pincode-page.component.css']
})
export class PincodePageComponent implements OnInit {
  formPin!: FormGroup
  account_id!: string

  constructor(private router: Router,
    private route: ActivatedRoute, private requests: RequestService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params:any) => {
        this.account_id = params['account_id'];
        
      });

    this.formPin = new FormGroup({
      pincode: new FormControl(null),
      login: new FormControl(''),
      password: new FormControl(''),
    })

  }

  sendPin() {
    const formPinData = {...this.formPin.value}
    this.requests.postPinCode(formPinData.login, this.account_id, formPinData.pincode, formPinData.password).subscribe(response => {
      this.router.navigate(['/account'])
    }, error => {
      alert(error.error.Error)
    })
  }

}
