import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'dateTimeFormat' })
export class DateTimepipeModule implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;

    let DTFT: Date = new Date(value);

    return `${DTFT.toDateString()} - ${DTFT.toTimeString().split('GMT')[0]}`;
  }
}
