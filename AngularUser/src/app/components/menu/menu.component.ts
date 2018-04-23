import { Component, OnInit } from '@angular/core';

import { Cat } from '../../../models/Category';

import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  category: Cat[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategory();
  }
  getCategory() {
    this.categoryService.getCategorys()
      .subscribe(
        (data) => {
          if (data.length > 0) {
            this.category = data;
          }
        },
        (err) => { console.error(err); },
        () => { console.log('done'); })
  }
}
