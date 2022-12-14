import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthentificationGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        //console.log('canActivate() : ' +localStorage.getItem('ICRUser')!);
        if (localStorage.getItem('ICRAuthToken')) {
            // logged in so return true
            return true;
        }

        
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}
