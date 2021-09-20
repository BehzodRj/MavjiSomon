import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

}