import { SearchComponent } from './../search/search.component';
import { NewsService } from './../../services/news.service';
import { News } from './../../models/news';
import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  @Input() Searchnews: News[];
  private searchTerms = new Subject<string>();

  constructor(private newsService: NewsService, private src: SearchComponent) { }

  search(term: string): void {
    this.newsService.searchNews(term).subscribe(
      (data) => this.Searchnews = data,
      (err) => console.error(err),
      () => console.log('done')
    );
  }
  ngOnInit() {
  }
  close(): void {
    this.src.closeSearch();
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
