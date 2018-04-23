import { Component, OnInit } from '@angular/core';

import { CatsService } from '../../services/cats.service';
import { NewsService } from '../../services/news.service';

import { News } from './../../models/news';
import { Cat } from '../../models/cat';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss']
})
export class NewsAddComponent implements OnInit {
  cats: Cat[] = [];
  ne: News = new News;
  ImgUrl: String;
  imgbase64;

  constructor(private categoryService: CatsService, private newsService: NewsService) { }

  ngOnInit() {
    this.categoryService.getCats().subscribe((res) => {
      this.cats = res;
    });
  }
  SaveNew(ckeditor: any, sel: any, Header: any, Name: any): void {
    
    this.ne.cat = sel;
    this.ne.context = ckeditor;
    this.ne.name = Name;
    this.ne.header = Header;
    this.ne.img = this.imgbase64;
    this.ne.editor = Number(sessionStorage.getItem('userId') || 0);

    this.newsService.addNews(this.ne).subscribe((res) => {
      console.log(res);
    });

  }

  readImgUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.ImgUrl = event.target.result;
        this.imgbase64 = reader.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}