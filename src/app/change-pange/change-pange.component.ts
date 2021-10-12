import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Account, RequestService } from '../all.service';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-change-pange',
  templateUrl: './change-pange.component.html',
  styleUrls: ['./change-pange.component.css']
})
export class ChangePangeComponent implements OnInit {
  changeAccount: any
  changeTarif: any
  formChange!: FormGroup 

  constructor(private requests: RequestService, private router: Router, private route: ActivatedRoute, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.formChange = new FormGroup({
      fio: new FormControl(''),
      address: new FormControl(''),
      passport: new FormControl(''),
      phone: new FormControl(''),
      card_number: new FormControl(''),
      tarif_id: new FormControl('')
    })
    
    this.requests.getAccountData(this.localStorage.get('access_token')).subscribe(response => {
      this.changeAccount = response
      this.route.params.subscribe( (params: Params) => {
        this.changeAccount = this.changeAccount.find( (result: any) => result.account_id === params.id )
        this.formChange.controls['tarif_id'].setValue(this.changeAccount?.tarif_id, {onlySelf: true});
      })
    })

    this.requests.getTarifData().subscribe(response => {
      this.changeTarif = response
    })
    
  }
  sendChange() {

    const formChangeData = {...this.formChange.value}

    this.route.params.subscribe((params: any) => {
      this.requests.changeAccountData(params.id, formChangeData.fio, formChangeData.address, formChangeData.passport, formChangeData.phone, formChangeData.card_number, formChangeData.tarif_id).subscribe(response => {
        alert('Ваши данные успешно изменены')
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
      
    })
    

  }

}