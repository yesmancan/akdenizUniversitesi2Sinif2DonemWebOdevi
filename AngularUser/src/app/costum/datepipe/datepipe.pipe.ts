import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'dateFormat' })
export class DatepipeModule implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;
    return new Date(value).toDateString();
  }
}
