import { News } from './../models/news';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class NewsService {

  private tokeyKey = 'token';
  private token: string;
  private path = 'http://localhost:5000/api/News';

  constructor(private http: Http) { }

  getNews() {
    const headers = this.initAuthHeaders();
    return this.http.get(this.path, { headers: headers })
      .map(res => res.json() as News[]);
  }
  getNew(id: Number) {
    const headers = this.initAuthHeaders();
    return this.http.get(this.path + '/' + id, { headers: headers })
      .map(res => res.json() as News);
  }
  addNews(n: News) {
    const headers = this.initAuthHeaders();
    const body = JSON.stringify(n);
    return this.http.post(this.path, body, { headers: headers })
      .map(res => {
        if (res.status === 200) { return News; }
        return new News;
      });
  }
  searchNews(val: String) {
    const headers = this.initAuthHeaders();
    return this.http.get(this.path + '/' + val, { headers: headers })
      .map(res => res.json() as News[]);
  }
  delNews(n: News) {
    const headers = this.initAuthHeaders();
    return this.http.delete(this.path + '/' + n.id, { headers: headers })
      .map(res => res.json() as News);
  }

  updateNews(cat: News) {
    const headers = this.initAuthHeaders();
    const body = JSON.stringify(cat);
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
    const token = this.getLocalToken();
    if (token === null) { throw new Error('No token'); }

    // tslint:disable-next-line:prefer-const
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return headers;
  }
}
