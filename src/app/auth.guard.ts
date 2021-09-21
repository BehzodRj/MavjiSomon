import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {
    constructor(private localStorage: LocalStorageService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.localStorage.get('access_token')){
            return true
        }
        this.router.navigate(['/'])
        return false
    }
}