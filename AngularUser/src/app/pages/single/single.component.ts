import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MainService } from './../../services/main.service';
import { News } from '../../models/news';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  news: News = new News;
  title: String = '';
  paramId: Number = 0;

  constructor(private route: ActivatedRoute, private mainService: MainService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params);
      this.paramId = params.singleId;
      this.title = params.name;
      this.mainService.getNew(this.paramId).subscribe(
        (data) => {
          this.news = data;
          console.log(data);
        },
        err => console.log(err),
        () => console.log('done'));
    });
  }

}
