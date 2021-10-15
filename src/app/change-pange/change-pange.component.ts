import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Account, RequestService } from '../all.service';
import { LocalStorageService } from '../local-storage.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-change-pange',
  templateUrl: './change-pange.component.html',
  styleUrls: ['./change-pange.component.css']
})
export class ChangePangeComponent implements OnInit {
  changeAccount: any
  changeTarif: any
  mastersData: any
  formChange!: FormGroup 
  token: any

  constructor(private requests: RequestService, private router: Router, private route: ActivatedRoute, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.token = jwt_decode(this.localStorage.get('access_token'));
    this.formChange = new FormGroup({
      fio: new FormControl(''),
      address: new FormControl(''),
      passport: new FormControl(''),
      phone: new FormControl(''),
      card_number: new FormControl(''),
      tarif_id: new FormControl(''),
      contract: new FormControl(''),
      master: new FormControl(''),
      
      comment: new FormControl(''),
    })
    
    this.requests.getAccountData(this.localStorage.get('access_token')).subscribe(response => {
      this.changeAccount = response
      this.route.params.subscribe( (params: Params) => {
        this.changeAccount = this.changeAccount.find( (result: any) => result.account_id === params.id )
        this.formChange.controls['tarif_id'].setValue(this.changeAccount?.tarif_id, {onlySelf: true});
        this.formChange.controls['master'].setValue(this.changeAccount?.master_id, {onlySelf: true});
      })
    })

    this.requests.getTarifData().subscribe(response => {
      this.changeTarif = response
    })
    this.requests.getMasterData().subscribe(response => {
      this.mastersData = response
    })
    
    
  }
  sendChange() {

    const formChangeData = {...this.formChange.value}
    let phone = formChangeData.phone!=null?formChangeData.phone.toString():'';
    this.route.params.subscribe((params: any) => {
      this.requests.changeAccountData(params.id, formChangeData.fio, formChangeData.address, formChangeData.passport, phone, formChangeData.card_number, formChangeData.tarif_id, formChangeData.contract, formChangeData.master, formChangeData.comment).subscribe(response => {
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