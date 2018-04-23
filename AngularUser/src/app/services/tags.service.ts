import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Tag } from '../models/tag';

@Injectable()
export class TagsService {
    private path = 'http://localhost:5000/api/Tags/';

    constructor(private http: Http) { }

    getTags() {
        const headers = this.initAuthHeaders();
        return this.http.get(this.path, { headers: headers })
            .map(res => res.json() as Tag[]);
    }

    private initAuthHeaders(): Headers {
        // tslint:disable-next-line:prefer-const
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        headers.append('Access-Control-Allow-Headers', 'Content-Type');

        return headers;
    }
}
