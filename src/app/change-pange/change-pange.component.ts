import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-change-pange',
  templateUrl: './change-pange.component.html',
  styleUrls: ['./change-pange.component.css']
})
export class ChangePangeComponent implements OnInit {
  formChange!: FormGroup 

  constructor(private requests: RequestService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formChange = new FormGroup({
      fio: new FormControl(''),
      address: new FormControl(''),
      passport: new FormControl(''),
      phone: new FormControl(null),
      card_number: new FormControl(''),
    })
  }


  sendChange() {

    const formChangeData = {...this.formChange.value}

    console.log(formChangeData);

    this.route.params.subscribe((params: any) => {
      console.log(params.id);
      this.requests.changeAccountData(params.id, formChangeData.fio, formChangeData.address, formChangeData.passport, formChangeData.phone.toString(), formChangeData.card_number).subscribe(response => {
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