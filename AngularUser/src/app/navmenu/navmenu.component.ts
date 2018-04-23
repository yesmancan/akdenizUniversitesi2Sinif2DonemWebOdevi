import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DatepipeModule } from './../costum/datepipe/datepipe.pipe';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    today = Date.now();
    fixedTimezone = '2015-06-15T09:03:01+0900';

    constructor() { }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
    }
}
