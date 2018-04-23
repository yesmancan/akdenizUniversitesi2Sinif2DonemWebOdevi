import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Tag } from '../models/tag';

@Injectable()
export class TagsService {
    private tokeyKey = "token";
    private token: string;
    private path = "http://localhost:5000/api/Tags/"

    constructor(private http: Http) { }

    getTags() {
        let headers = this.initAuthHeaders();
        return this.http.get(this.path, { headers: headers })
            .map(res => res.json() as Tag[]);
    };

    addTag(tag: Tag) {
        let headers = this.initAuthHeaders();
        let body = JSON.stringify(tag);
        return this.http.post(this.path, body, { headers: headers })
            .map(res => {
                if (res.status == 200) return tag;
                return new Tag;
            });
    };

    delTag(tag: Tag) {
        let headers = this.initAuthHeaders();
        return this.http.delete(this.path + tag.id, { headers: headers })
            .map(res => res.json() as Tag)
    };

    updateTag(tag: Tag) {
        let headers = this.initAuthHeaders();
        let body = JSON.stringify(tag);
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
}
