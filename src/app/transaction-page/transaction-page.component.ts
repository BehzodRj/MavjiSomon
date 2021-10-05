import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent implements OnInit {
  transactionsReplenish: any
  transactionsWithdrawal: any

  constructor(private requests: RequestService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe( (params: Params) => {
      this.requests.transactionReplenishData(params.id).subscribe(response => {
        this.transactionsReplenish = response          
      }, error => {
        if(error.status == 401) {
          alert('Ошибка Сервера')
          this.router.navigate(['/account'])
        }
      })
      

      this.requests.transactionWithdrawalData(params.id).subscribe(response => {
        console.log(response);
        this.transactionsWithdrawal = response
      })    
    })

  }

}
