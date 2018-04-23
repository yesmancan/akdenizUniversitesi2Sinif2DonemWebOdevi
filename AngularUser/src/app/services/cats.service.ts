import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { Cat } from '../models/cat';


@Injectable()
export class CatsService {
    private tokeyKey = "token";
    private token: string;
    private path = "http://localhost:5000/api/Category/"

    constructor(private http: Http) { }

    getCats() {
        let headers = this.initAuthHeaders();
        return this.http.get(this.path, { headers: headers })
            .map(res => res.json() as Cat[]);
    };

    addCat(cat: Cat) {
        let headers = this.initAuthHeaders();
        let body = JSON.stringify(cat);
        return this.http.post(this.path, body, { headers: headers })
            .map(res => {
                if (res.status == 200) return cat;
                return new Cat;
            });
    };

    delCat(cat: Cat) {
        let headers = this.initAuthHeaders();
        return this.http.delete(this.path + cat.id, { headers: headers })
            .map(res => res.json() as Cat)
    };

    updateCat(cat: Cat) {
        let headers = this.initAuthHeaders();
        let body = JSON.stringify(cat);
        return this.http.put(this.path, body, { headers: headers })
            .map(res => res);

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

        return headers;
    }

    // private handleError(error: any): Promise<any> {
    //     console.error('An error occurred', error);
    //     return Promise.reject(error.message || error);
    // }
}
