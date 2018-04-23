import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'async-observable-pipe',
  template: '{{ time | async }}'
})
export class AsyncObservablePipeComponent {
  time = new Observable<string>((observer: Subscriber<string>) => {
    setInterval(() => {
      const date = new Date();
      observer.next(`${date.toDateString()} - ${date.toTimeString().split('GMT')[0]}`);
    }, 1000);
  });
}
