import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-to-up-balance-page',
  templateUrl: './to-up-balance-page.component.html',
  styleUrls: ['./to-up-balance-page.component.css']
})
export class ToUpBalancePageComponent implements OnInit {
  formBalance!: FormGroup

  constructor(private requests: RequestService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.formBalance = new FormGroup({
      balance: new FormControl(null)
    })
  }

  send() {
    const formBalanceData = {...this.formBalance.value}
    console.log(formBalanceData);

    this.route.params.subscribe( (params: Params) => {
      this.requests.postBalanceData(params.id, formBalanceData.balance).subscribe( response => {
        alert("Ваши данные успешно сохранены")
        this.router.navigate(['/account'])
      }, error => { 
        if(error.status == 400) {
          alert('Вы не добавили сумму')
        }
        if(error.status == 401) {
          alert('Ошибка Сервера')
          this.router.navigate(['/account'])
        }
      })
    })


    
  }

}
