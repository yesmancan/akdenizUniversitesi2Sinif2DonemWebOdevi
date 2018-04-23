import { Component, OnInit } from '@angular/core';

import { CatsService } from './../../services/cats.service';
import { NewsService } from './../../services/news.service';

import { News } from '../../models/news';
import { Cat } from '../../models/cat';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: News[] = [];
  cats: Cat[] = [];
  constructor(private newsService: NewsService, private categoryService: CatsService) { }

  ngOnInit() {
    this.categoryService.getCats().subscribe((res) => {
      this.cats = res;
    });
    this.newsService.getNews().subscribe(res => {
      res.forEach(e => {
        this.cats.forEach(c => {
          ((e.cat == c.id) && (e.cat = c.name));
        });
      });
      this.news = res;
    });
  }
  urlFixed(data: String) {
    if (data !== undefined) {
      data = data.replace(/ /gi, '-')
        .replace(/'/gi, '-');

      if (data.substring(1, 1) == '-') {
        data = data.replace('-', '');
      }
    }
    return data;
  }
  deleteNew(news: News) {
    if (confirm(news.name + " Haberini Silmek İstediğinizden Emin misiniz ?")) {
      const i: number = this.news.indexOf(news);
      this.newsService.delNews(news).subscribe(() => {
        this.news.splice(i, 1);
      });
    }
  }
}
