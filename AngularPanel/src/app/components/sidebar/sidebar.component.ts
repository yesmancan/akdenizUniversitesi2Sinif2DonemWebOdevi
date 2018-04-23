import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <div class="card card-body">
      <h4 class="card-title">{{ header }}</h4>
      <ul class="list-group">
        <li class="list-group-item" [routerLink]="[d.url]" *ngFor="let d of navData;">{{ d.name }}</li>
      </ul>
    </div>
  `,
  styles: [
    `.list-group-item{
    cursor: pointer!important;
  }`
  ],
})
export class SidebarComponent implements OnInit {

  @Input() header = [];
  @Input() navData = [
    { 'url': '/pages/news', 'name': 'Haberler' },
    { 'url': '/pages/news/add', 'name': 'Haber Ekle' },
    { 'url': '/pages/tags', 'name': 'Etiket Ekle \\ Düzenle' },
    { 'url': '/pages/cats', 'name': 'Kategori Ekle \\ Düzenle' },
    { 'url': '/pages/slider', 'name': 'Slider' },
  ];

  constructor() { }

  ngOnInit() { }

}
