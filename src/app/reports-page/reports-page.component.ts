import { Component, OnInit } from '@angular/core';
import { RequestService } from '../all.service';

@Component({
  selector: 'app- reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent implements OnInit {

  constructor(private requests: RequestService) {}

  ngOnInit(): void {

    this.requests.getRepostsData().subscribe(response => {
      console.log(response);
    })
    
  } 
}
