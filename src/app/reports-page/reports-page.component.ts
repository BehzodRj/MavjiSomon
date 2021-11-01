import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../all.service';
import { LocalStorageService } from '../local-storage.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app- reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.css']
})
export class ReportsPageComponent implements OnInit {
  formReport!: FormGroup
  operators: any
  getReports: any
  page: any
  amount: number = 0
  fileName= 'MavjiSomonDoc.xlsx';

  constructor(private requests: RequestService, private localStorage: LocalStorageService, private router: Router) {}

  ngOnInit(): void {
    
    this.formReport = new FormGroup({
      stDate: new FormControl(''),
      endDate: new FormControl(''),
      chOperator: new FormControl('')
    })  

    this.requests.getReportsData().subscribe(response => {
      this.operators = response
    }, error => {
      if(error.status == 401) {
        this.requests.postRequestRefreshAuth(this.localStorage.get('refresh_token')).subscribe( (response: any) => {
          this.localStorage.set('access_token', response.access_token);
          this.localStorage.set('refresh_token', response.refresh_token);
          window.location.reload()
        }, error => {
          localStorage.clear()
          this.router.navigate(['/'])
        })
      } else {
        alert(error.error.Error);
      }
    })
  } 
  // 2006-01-02T15:04:05Z07:00

  send() {
    const formReportData = {...this.formReport.value}
    formReportData.stDate = new Date(formReportData.stDate)
    formReportData.endDate = new Date(formReportData.endDate)

    this.requests.postReportsData(formReportData.stDate.toISOString(), formReportData.endDate.toISOString(), formReportData.chOperator).subscribe( (response: any) => {
      this.getReports = response
      let summ = 0;
      this.getReports.forEach( (element: any) => {
        summ = summ + element.summ
      });
      this.amount = summ;

      if(response == '') {
        alert("Нет никаких Записи")
      }
      
    }, error => {
      alert(error.error.Error)
    })
  }

  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       var wscols = [
        {wch:10},
        {wch:20},
        {wch:20},
        {wch:10},
        {wch:40},
        {wch:40},
        {wch:30},
    ];
    
    ws['!cols'] = wscols;

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

}
