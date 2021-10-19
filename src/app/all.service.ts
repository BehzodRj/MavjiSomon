import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';


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
export interface UserRole {
    "exp": number,
    "iat": number,
    "user_id": string,
    "user_role": string,
    "token_id": string,
    "token_type": string
}

@Injectable({
    providedIn: 'root'
})

export class RequestService {
    private url: string = "http://10.254.2.151:8888";
    // 10.254.2.151:8888
    // 45.94.219.124:8888
    constructor( private localStorage: LocalStorageService, private http: HttpClient) {}

    header: HttpHeaders = new HttpHeaders({
        'Access-Control-Allow-Origin': 'crm.mavjisomon.tj',
        'Content-Type': 'application/json'
    })

    // auth requests
    postRequestAuth(text: string, number: string) {
        return this.http.post(this.url + '/login', {"login": text, "password": number}, { headers: this.header });
    }
    getRequesTokenAuth() {
        return this.http.get(this.url + '/test', { headers: this.header });
    }
    postRequestRefreshAuth(token: string) {
        return this.http.post(this.url + '/refresh', {"refresh_token": token}, { headers: this.header });
    }

    postRegistration(account_id: string) {
        return this.http.post(this.url + '/reg', {"account_id": account_id}, {headers: this.header})
    }

    postPinCode(login: string, account_id: string, pincode: number, password: string) {
        return this.http.post(this.url + '/reg/reg', {"login": login, "account_id": account_id, "pin": pincode, "password": password}, {headers: this.header})
    }


    // Account Data requests
    getAccountData(token: any) {
        let header: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': 'crm.mavjisomon.tj',
            "Content-Type": "application/json",
            "Authorization": token
        });

        return this.http.get(this.url + "/api/account/all", {headers: header})
    }

    // Временно
    getAccountUser(token: any, user_id: string) {
        let header: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': 'crm.mavjisomon.tj',
            "Content-Type": "application/json",
            "Authorization": token
        });

        return this.http.get(this.url + "/api/account/byuserid?id=" + user_id, {headers: header})
    }

    postAccountData(token: string, fio: string, address: string, passport: string, phone: string, region: string, device_id: string, tarif_id: string, device_type: string, master: string, contract: string, comment: string) {
        let header: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': 'crm.mavjisomon.tj',
            "Content-Type": "application/json",
            "Authorization": token
        });

        return this.http.post(this.url + "/api/account", {"fio": fio, "adress": address, "passport_info": passport, "phone": phone, "region_id": region, "device_id": device_id, "tarif_id": tarif_id, "device_type": device_type, "master_id": master, "contract": contract, "comment": comment}, {headers: header})
    }

    deleteAccountData(account_id: string) {
        let header: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': 'crm.mavjisomon.tj',
            "Content-Type": "application/json",
            "Authorization": this.localStorage.get('access_token')
        });

        return this.http.delete(this.url + "/api/account?id="+account_id, {headers: header})
    }
    refreshTarif(account_id: string) {
        let header: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': 'crm.mavjisomon.tj',
            "Content-Type": "application/json",
            "Authorization": this.localStorage.get('access_token')
        });

        return this.http.get(this.url + "/api/refreshtarif?acc_id="+account_id, {headers: header})
    }

    changeAccountData(account_id: string, fio: string, address: string, passport: string, phone: string, card_number: string, tarif_id: string, contract: string, master: string, comment: string) {
        let header: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': 'crm.mavjisomon.tj',
            "Content-Type": "application/json",
            "Authorization": this.localStorage.get('access_token')
        });

        return this.http.put(this.url + "/api/account", {"account_id": account_id, "fio": fio, "adress": address, "passport_info": passport, "phone": phone,  "stb_serial_number": card_number, "tarif_id": tarif_id, "comment": comment, "master_id": master, "contract": contract}, {headers: header})
    }

    postBalanceData(account_id: string, balance: number) {
        let header: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': 'crm.mavjisomon.tj',
            "Content-Type": "application/json",
            "Authorization": this.localStorage.get('access_token')
        });

        return this.http.post(this.url + "/api/transaction", {"account_id": account_id, "summ": balance}, {headers: header})
    }

    
    // Transaction requests
    transactionReplenishData(id: string) {
        let header: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': 'crm.mavjisomon.tj',
            "Content-Type": "application/json",
            "Authorization": this.localStorage.get('access_token')
        });

        return this.http.get(this.url + "/api/transaction/byacc?acc_id=" + id, {headers: header})
    }

    transactionWithdrawalData(id: string) {
        let header: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': 'crm.mavjisomon.tj',
            "Content-Type": "application/json",
            "Authorization": this.localStorage.get('access_token')
        });

        return this.http.get(this.url + "/api/transaction/prolongation/byacc?acc_id=" + id, {headers: header})
    }

    
    // tarifs requests
    getTarifData() {
        let header: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': 'crm.mavjisomon.tj',
            "Content-Type": "application/json",
            "Authorization": this.localStorage.get('access_token')
        });
        return this.http.get(this.url + '/tariffs', {headers: header})
    }
    
    getRegionData() {
        let header: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': 'crm.mavjisomon.tj',
            "Content-Type": "application/json",
            "Authorization": this.localStorage.get('access_token')
        });
        return this.http.get(this.url + '/api/regions', {headers: header})
    }
    getMasterData() {
        let header: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': 'crm.mavjisomon.tj',
            "Content-Type": "application/json",
            "Authorization": this.localStorage.get('access_token')
        });
        return this.http.get(this.url + '/api/account/masters', {headers: header})
    }


    changeTarifData(tarif_id: string, account_id: string) {
        let header: HttpHeaders = new HttpHeaders({
            'Access-Control-Allow-Origin': 'crm.mavjisomon.tj',
            "Content-Type": "application/json",
            "Authorization": this.localStorage.get('access_token')
        });
        return this.http.post(this.url + '/tariffchange', {"account_id": account_id , "tariff_id": tarif_id}, {headers: header})
    }
} 