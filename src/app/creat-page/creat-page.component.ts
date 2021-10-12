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

  constructor(private router: Router, private requests: RequestService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.creatForm = new FormGroup({
      fio: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      passport: new FormControl('', Validators.required),
      phone: new FormControl(null, Validators.required),
      card_number: new FormControl('', Validators.required),
      tarif_id: new FormControl('', Validators.required)
    })

    this.requests.getTarifData().subscribe(response => {
      this.tarifData = response
    })
  }

  creat() {
      const creatFormData = {...this.creatForm.value}

      console.log(creatFormData);

      this.requests.postAccountData(this.localStorage.get('access_token'), creatFormData.fio, creatFormData.address, creatFormData.passport, creatFormData.phone.toString(), '', creatFormData.card_number, creatFormData.tarif_id).subscribe(response => {
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
