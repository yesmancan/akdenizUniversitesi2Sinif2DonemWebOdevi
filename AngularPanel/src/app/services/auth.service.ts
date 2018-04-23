import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import "rxjs/add/operator/toPromise";

import { RequestResult } from "../models/RequestResult";

@Injectable()
export class AuthService {
    private tokeyKey = "token";
    private token: string;
    private path = "http://localhost:5000/api/TokenAuth/"

    constructor(private http: Http) { }

    login(mail: string, pass: string): Promise<RequestResult> {
        return this.http.post(this.path, { email: mail, password: pass }).toPromise()
            .then((res) => {
                let result = JSON.parse(JSON.stringify(res).replace('_body', 'body'));
                result.body = JSON.parse(result.body);
                if (result.status == 200) {
                    sessionStorage.setItem("token", result.body.token);
                    sessionStorage.setItem("userId", result.body.userID);
                } else {
                    alert("Şifre Veya Kullanıcı Adı Yanlış");
                }
                console.log(result)
                return result;
            })
            .catch(() => {
                alert("Şifre Veya Kullanıcı Adı Yanlış");
            });
    }
    LogOut() {
        if (!this.token) this.token = sessionStorage.removeItem(this.tokeyKey) && sessionStorage.removeItem('userId') || '';
    }

    checkLogin(): boolean {
        var token = sessionStorage.getItem(this.tokeyKey);
        return token != null;
    }

    getUserInfo(): Promise<RequestResult> {
        return this.authGet("/api/TokenAuth");
    }

    authPost(url: string, body: any): Promise<RequestResult> {
        let headers = this.initAuthHeaders();
        return this.http.post(url, body, { headers: headers }).toPromise()
            .then(response => response.json() as RequestResult)
            .catch(this.handleError);
    }

    authGet(url: string): Promise<RequestResult> {
        let headers = this.initAuthHeaders();
        return this.http.get(url, { headers: headers }).toPromise()
            .then(response => response.json() as RequestResult)
            .catch(this.handleError);
    }

    private getLocalToken(): string {
        if (!this.token) {
            this.token = sessionStorage.getItem(this.tokeyKey) || '';
        }
        return this.token;
    }

    private initAuthHeaders(): Headers {
        let token = this.getLocalToken();
        if (token === null) throw "No token";

        var headers = new Headers();
        headers.append("Authorization", "Bearer " + token);
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Origin', '*');

        return headers;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
