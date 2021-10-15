import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../all.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-creat-page',
  templateUrl: './creat-page.component.html',
  styleUrls: ['./creat-page.component.css']
})
export class CreatPageComponent implements OnInit {
  creatForm!: FormGroup
  tarifData: any
  regionData: any
  mastersData: any

  constructor(private router: Router, private requests: RequestService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.creatForm = new FormGroup({
      fio: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      passport: new FormControl('', Validators.required),
      phone: new FormControl(null, Validators.required),
      card_number: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      device_type: new FormControl('', Validators.required),
      comment: new FormControl(''),
      master: new FormControl('', Validators.required),
      contract: new FormControl('', Validators.required),
      tarif_id: new FormControl('', Validators.required)
    })

    this.requests.getTarifData().subscribe(response => {
      this.tarifData = response
    })
    this.requests.getRegionData().subscribe(response => {
      this.regionData = response
    })
    this.requests.getMasterData().subscribe(response => {
      this.mastersData = response
    })
    
  }

  creat() {
      const creatFormData = {...this.creatForm.value}

      let phone = creatFormData.phone!=null?creatFormData.phone.toString():'';
      this.requests.postAccountData(this.localStorage.get('access_token'), creatFormData.fio, creatFormData.address, creatFormData.passport, phone, creatFormData.region, creatFormData.card_number, creatFormData.tarif_id, creatFormData.device_type, creatFormData.master, creatFormData.contract, creatFormData.comment).subscribe(response => {
        alert('Ваши данные успешно сохранены')
        this.router.navigate(['/account'])
      }, error => {
        if(error.status == 400) {
          alert('Ошибка Клиента')
        }
        if(error.status == 401) {
          alert('Ошибка Сервера')
          this.router.navigate(['/account'])
        }
      })
  }

}
