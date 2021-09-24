import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';


export interface Account {
    account_id: string,
    fio: string,
    phone: string,
    adress: string,
    passport_info: string,
    stb_serial_number: string,
    region_id: string,
    balance: number,
    tarif_id: string,
    user_id: string,
    end_date:  string
}

@Injectable({
    providedIn: 'root'
})

export class RequestService {
    private url: string = "http://10.251.2.68:8888";
    constructor(private http: HttpClient) {}

    header: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    })

    // auth requests

    postRequestAuth(text: string, number: string) {
        return this.http.post(this.url + '/login', {"login": text, "password": number}, { headers: this.header });
    }
    postRequestRefreshAuth(token: string) {
        return this.http.post(this.url + '/refresh', {"refresh_token": token}, { headers: this.header });
    }

    getRequestAuth(token: string, ) {
        let header: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this.http.get(this.url + '/test', {headers: header})
    }

    postRegistration(account_id: string) {
        return this.http.post(this.url + '/reg', {"account_id": account_id}, {headers: this.header})
    }

    postPinCode(login: string, account_id: string, pincode: number, password: string) {
        return this.http.post(this.url + '/reg/reg', {"login": login, "account_id": account_id, "pin": pincode, "password": password}, {headers: this.header})
    }

    getAccountData(token: any) {
        let header: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": token
        });

        return this.http.get(this.url + "/api/account/all", {headers: header})
    }

    postAccountData(token: string, fio: string, address: string, passport: string, phone: string, region: string, card_number: string, tarif: string) {
        let header: HttpHeaders = new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": token
        });

        return this.http.post(this.url + "/api/account", {"fio": fio, "adress": address, "passport_info": passport, "phone": phone, "region_id": "960f1b46-70a0-4a32-af20-555b550a226d", "stb_serial_number": card_number, "tarif_id": "de8b8d67-760c-4ed8-a2a2-a645e5ae0db5"}, {headers: header})
    }
}