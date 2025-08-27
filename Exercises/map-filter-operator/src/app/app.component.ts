import { Component } from '@angular/core';
import { filter, from, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'map-filter-operator';

  data : any[] = [];

  myObservable = from([2,4,6,8,10,12]);
  transformedData = this.myObservable.pipe(map((val) => {
    return val * 5;
  }));

  filteredData = this.transformedData.pipe(filter((val) => {
    return val % 4 === 0;
  }));

  asyncData() {
    this.filteredData.subscribe({
      next : (val: any) => {
        this.data.push(val);
        console.log(this.data);
      }
    });
  }
}
