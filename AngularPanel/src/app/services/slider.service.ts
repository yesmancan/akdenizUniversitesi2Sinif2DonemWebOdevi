import { Slider } from './../models/slider';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class SliderService {

    private tokeyKey = "token";
    private token: string;
    private path = "http://localhost:5000/api/Slider/"

    constructor(private http: Http) { }

    headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    requestOptions = {
        headers: new Headers(this.headerDict)
    };

    getSliders() {
        let headers = this.initAuthHeaders();
        return this.http.get(this.path, { headers: headers })
            .map(res => res.json() as Slider[]);
    };
    getSlider(id: Number) {
        let headers = this.initAuthHeaders();
        return this.http.get(this.path + 'OnlyOne?id=' + id, { headers: headers })
            .map(res => res.json() as Slider);
    };
    addSlider(n: Slider) {
        let headers = this.initAuthHeaders();
        let body = JSON.stringify(n);
        return this.http.post(this.path, body, { headers: headers })
            .map(res => {
                if (res.status == 200) return Slider;
                return new Slider;
            });
    };
    delNSlider(n: Slider) {
        console.log(n);
        let headers = this.initAuthHeaders();
        return this.http.delete(this.path + "/" + n.id, { headers: headers })
            .map(res => res.json() as Slider)
    };

    updateSlider(cat: Slider) {
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

        return headers;
    }
}
