import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Slider } from './../models/slider';
@Injectable()
export class SliderService {
    private path = 'http://localhost:5000/api/Slider/';

    constructor(private http: Http) { }

    getSliders() {
        const headers = this.initAuthHeaders();
        return this.http.get(this.path, { headers: headers })
            .map(res => res.json() as Slider[]);
    }
    getSlider(id: Number) {
        const headers = this.initAuthHeaders();
        return this.http.get(this.path + 'OnlyOne?id=' + id, { headers: headers })
            .map(res => res.json() as Slider);
    }

    private initAuthHeaders(): Headers {
        // tslint:disable-next-line:prefer-const
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        return headers;
    }
}
