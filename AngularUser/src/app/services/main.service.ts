import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { News } from '../models/news';

@Injectable()
export class MainService {

  private path = 'http://localhost:5000/api/';

  constructor(private http: Http) { }
  getNews() {
    const headers = this.initAuthHeaders();
    return this.http.get(this.path + 'News', { headers: headers })
      .map(res => res.json() as News[]);
  }

  getNew(id: Number) {
    const headers = this.initAuthHeaders();
    return this.http.get(this.path + 'News/' + id, { headers: headers })
      .map(res => res.json() as News);
  }

  getNewsByCategory(id: Number) {
    const headers = this.initAuthHeaders();
    return this.http.get(this.path + 'News/cat/' + id, { headers: headers })
      .map((res) => {
        return res.json() as News[];
      });
  }


  private initAuthHeaders(): Headers {

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');

    return headers;
  }
}
