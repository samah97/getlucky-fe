import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown'
})
export class CountdownPipe implements PipeTransform {

  transform(value: number): string  {
    if (!value) {
      return '00:00:00';
    }
    let hours = Math.floor(value / 3600000);
    let minutes = Math.floor((value % 3600000) / 60000);
    let seconds = Math.floor((value % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

}
