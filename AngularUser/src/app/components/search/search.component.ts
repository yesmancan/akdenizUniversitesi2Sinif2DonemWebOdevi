import { NewsService } from './../../services/news.service';
import { Component, OnInit, Input } from '@angular/core';
import { News } from '../../models/news';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() Searchnews: News[] = [];
  @Input() SearchInfo: Boolean = false;
  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit() {

  }
  search(val: String): void {
    this.newsService.searchNews(val)
      .subscribe(
        data => this.Searchnews = data,
        err => console.error(err),
        () => console.log('done')
      );
    console.log(this.Searchnews);
  }
  openSearc(): void {
    this.SearchInfo = true;
  }
  closeSearch(): void {
    this.SearchInfo = false;
  }
}
