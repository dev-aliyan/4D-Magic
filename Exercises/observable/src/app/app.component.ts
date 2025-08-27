import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { from, fromEvent, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'observable';

  data: any [] = []

  @ViewChild('createBtn')
  createBtn : ElementRef;
  createBtnObservable

  array: number[] = [1, 2, 3, 4, 5];
  stringArray: string[] = ['Angular', 'React', 'Vue', 'Svelte'];

  // crate observable

  // Observable
  // myObservable = new Observable((observer) => {
  //   // observer.next([1, 2, 3, 4, 5]);
  //   // observer.next(1);
  //   // observer.next(2);
  //   // observer.next(3);
  //   // observer.next(4);
  //   // observer.next(5);

  //   setTimeout(() => {
  //     observer.next(1);
  //   }, 1000);

  //   setTimeout(() => {
  //     observer.next(2);
  //   }, 2000);
    
  //   setTimeout(() => {
  //     observer.next(3);
  //   }, 3000);

  //   // setTimeout(() => {
  //   //   observer.error(new Error('Something went wrong please try again later :)'));
  //   // }, 3500);

  //   setTimeout(() => {
  //     observer.next(4);
  //   }, 4000);

  //   setTimeout(() => {
  //     observer.next(5);
  //   }, 5000);

  //   setTimeout(() => {
  //     observer.complete();
  //   }, 6000);
  // })

  // of operator
  // myObservable = of(this.array, this.stringArray);

  // converting promise to observable
  // promiseData = new Promise((resolve, reject) => {
  //   resolve([10, 20, 30, 40, 50]);
  // });
  
  // myObservable = from(this.promiseData);


  // observer 
  // asyncData() {
    // this.myObservable.subscribe((val: any) => {
    //   this.data.push(val)
    // },
    // (err) => {
    //   alert(err.message)
    // },
    // () => {
    //   alert('Data stream completed')
    // })

    //new way to subscribe
  //   this.myObservable.subscribe({
  //     next : (val) => {
  //       this.data.push(val);
  //     },
  //     error : (err) => {
  //       alert(err.message)
  //     },
  //     complete : () => {
  //       alert('Data stream completed')
  //     }
  //   })

  //   console.log(this.data);
  // }

  buttonClick() {
    let count = 0;
    this.createBtnObservable = fromEvent(this.createBtn.nativeElement, 'click').subscribe((data) => {
      console.log(data);
      this.createItem(++count);
    })
  }

  ngAfterViewInit(): void {
    this.buttonClick();
  }

  createItem(val) {
    let div = document.createElement('div');
    div.innerText = 'New Item Created' + val;
    document.getElementById('container')?.appendChild(div);
  }

}
