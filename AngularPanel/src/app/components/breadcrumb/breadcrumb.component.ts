import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  template: `
            <nav class="breadcrumb">
              <a class="breadcrumb-item" *ngFor="let d of navData;let last = last" [routerLink]="[d.url]" [class.active]="last">{{ d.name }}</a>
            </nav>
  `
})
export class BreadcrumbComponent implements OnInit {
  @Input() navData = [];
  constructor() { }

  ngOnInit() {
  }
}
