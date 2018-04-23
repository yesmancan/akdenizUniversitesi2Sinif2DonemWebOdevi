import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor() { }
    
    public isAuthenticated(): boolean {
        const token = sessionStorage.getItem('token');

        return token != undefined;
    }
}
