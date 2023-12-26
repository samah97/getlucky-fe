import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, startWith, takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  constructor() { }

  getCountdown(endTime: Date): Observable<number> {
    return interval(1000).pipe(
      startWith(0),
      map(() => {
        const now = new Date();
        const diff = endTime.getTime() - now.getTime();
        return Math.max(diff, 0);
      }),
      takeWhile(time => time > 0, true)
    );
  }
}
