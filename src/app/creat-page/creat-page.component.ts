import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private router: Router, private requests: RequestService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.creatForm = new FormGroup({
      fio: new FormControl(''),
      address: new FormControl(''),
      passport: new FormControl(''),
      phone: new FormControl(''),
      region: new FormControl(''),
      card_number: new FormControl(''),
    })
  }

  creat() {
      const creatFormData = {...this.creatForm.value}
      console.log(creatFormData);

      this.requests.postAccountData(this.localStorage.get('access_token'), creatFormData.fio, creatFormData.address, creatFormData.passport, creatFormData.phone, '', creatFormData.card_number, '').subscribe(response => {
        alert('Ваши данные успешно сохранены')
        this.router.navigate(['/account'])
      }, error => {
        if(error.status == 400) {
          alert('Ошибка Клиента')
        }
        if(error.status == 401) {
          alert('Ошибка Сервера, Обновите Сайт')
          this.router.navigate(['/account'])
        }
      })
  }

}
