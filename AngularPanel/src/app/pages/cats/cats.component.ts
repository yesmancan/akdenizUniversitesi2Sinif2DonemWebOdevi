import { Component, OnInit, Input } from '@angular/core';

import { CatsService } from '../../services/cats.service';
import { Cat } from '../../models/cat';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})
export class CatsComponent implements OnInit {
  
  cats: Cat[];
  @Input() cat: Cat = new Cat;

  constructor(private catsService: CatsService) { }

  ngOnInit(): void {
    this.getCats();
  };
  getCats(): void {
    this.catsService.getCats().subscribe(res => {
      this.cats = res;
    });
  };
  addCat(cat: Cat): void {
    console.log(cat);
    this.catsService.addCat(cat).subscribe(() => {
      this.cats.push(cat);
    });
  };
  delCat(cat: Cat): void {
    if (confirm(cat.name + " Kategorisini Silmek İstediğinizden Emin misiniz ?")) {
      const i: number = this.cats.indexOf(cat);
      this.catsService.delCat(cat).subscribe(() => {
        this.cats.splice(i, 1);
      });
    }
  };
  ngOnCatArray(cat: Cat): void {
    this.cat = cat;
  }
  updateCat(cat: Cat): void {
    if (confirm(cat.name + " Kategorisini Güncellemek İstediğinizden Emin misiniz ?")) {
      this.catsService.updateCat(cat).subscribe(res => {
        res.status === 200 && document.getElementById('formupdateClose').click()
      });
    }
  }
}
