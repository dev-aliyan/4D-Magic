import { Component } from '@angular/core';
import { BehaviorSubject, interval, map, switchMap, takeWhile } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  duration = 60;
  timeleft$ = new BehaviorSubject(this.duration);
  isRunning$ = new BehaviorSubject(false);

  constructor() {
    this.isRunning$.pipe(
      switchMap((running) => {
        return running ? interval(1000).pipe(
          map((i) => this.duration - i - 1),
          takeWhile((val) => val >= 0)
        ) : []
      })
    ).subscribe((val) => this.timeleft$.next(val));
  }

  start() {
    this.isRunning$.next(true);
    console.log(this.isRunning$.value)
  }

  pause () {
    this.isRunning$.next(false);
  }

  reset () {
    this.duration = 60;
    this.timeleft$.next(this.duration);
    this.isRunning$.next(false);
  }
}
