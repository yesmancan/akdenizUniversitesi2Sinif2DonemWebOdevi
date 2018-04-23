import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MainService } from './../../services/main.service';
import { News } from '../../models/news';

@Component({
  selector: 'app-kategoriler',
  templateUrl: './kategoriler.component.html',
  styleUrls: ['./kategoriler.component.css']
})
export class KategorilerComponent implements OnInit {

  @Input() news: News[] = [];
  firstNews: News = new News;
  title: String = '';
  paramId: Number = 0;
  constructor(private route: ActivatedRoute, private mainService: MainService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.paramId = params.id;
      this.title = params.name;
      this.getNews(this.paramId);
    });
  }
  getNews(id: Number) {
    this.mainService.getNewsByCategory(id)
      .subscribe(
        (data) => {
          if (data.length > 0) {
            this.firstNews = data[0];
            this.news = data.filter(item => item.id !== this.firstNews.id);
            console.log(this.news);

          }
        },
        (err) => { console.error(err); },
        () => {
          console.log('done');
        }
      );
  }
  urlFixed(data: String) {
    if (data !== undefined) {
      data = data.replace(/ /gi, '-')
        .replace(/'/gi, '-');

      if (data.substring(1, 1) === '-') {
        data = data.replace('-', '');
      }
    }
    return data;
  }

}
