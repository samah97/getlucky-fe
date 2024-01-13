import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown',
  standalone: true
})
export class CountdownPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) {
      return '00:00:00';
    }
    const hours = Math.floor(value / 3600000);
    const minutes = Math.floor((value % 3600000) / 60000);
    const seconds = Math.floor((value % 60000) / 1000);
    const res = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return res;
  }
}
