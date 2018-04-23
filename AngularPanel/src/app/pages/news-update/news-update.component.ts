import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { NewsService } from '../../services/news.service';
import { CatsService } from '../../services/cats.service';
import { TagsService } from '../../services/tags.service';

import { News } from '../../models/news';
import { Cat } from '../../models/cat';
import { Tag } from './../../models/tag';

@Component({
  selector: 'app-news-update',
  templateUrl: './news-update.component.html',
  styleUrls: ['./news-update.component.scss']
})
export class NewsUpdateComponent {

  ImgUrl: String;
  imgbase64: String;
  paramId: Number = 0;
  cats: Cat[] = [];
  tags: Tag[] = [];
  tagselectedTags: string[] = [];
  news: News = new News;

  constructor(
    private newsService: NewsService,
    private categoryService: CatsService,
    private tagsService: TagsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryService.getCats().subscribe((res) => {
      this.cats = res;
    });
    this.tagsService.getTags().subscribe((res) => {
      this.tags = res;
    });
    this.route.params.subscribe((params) => {
      this.paramId = params.id;
      this.getData(this.paramId);
    });
  }
  getData(p: Number) {
    this.newsService.getNew(p)
      .map((res) => res)
      .subscribe(
        data => {
          this.news = data;
          this.ImgUrl = data.img;
          this.imgbase64 = data.img;
        },
        err => console.error(err),
        () => {
          //ckeditor için işlemleri html üzerine uyguluyoruz 
          let editor = document.querySelector('app-ckeditor').querySelector('textarea');
          editor.innerHTML = this.news.context;
          console.log('done');
        }
      );

  }
  GetCat(event) {
    this.news.cat = event.value;
  }
  GetTags(event) {
    console.log(event);
    this.news.label += event.value;
    this.tagselectedTags.push(event);
  }
  UpdateNew(ckeditor: any, Header: any, Name: any): void {
    this.news.context = ckeditor;
    this.news.name = Name;
    this.news.header = Header;
    this.news.img = this.imgbase64;
    this.newsService.updateNews(this.news).subscribe((res) => {
      if (res.status === 200) {
        alert("Güncelleme İşlemi Tamamlanmıştır.");
      }
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
