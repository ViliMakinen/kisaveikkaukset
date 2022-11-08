import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {
  transform(value: number, offset: number = 0): number[] {
    return [...Array(value)].map((_, index) => index + offset);
  }
}
