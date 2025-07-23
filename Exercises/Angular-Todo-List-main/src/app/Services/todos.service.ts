import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  getTodos() {
    return [
      {
        sno : 1,
        title: 'This is title ',
        description : 'this is description ',
        active : true
      },
      {
        sno : 2,
        title: 'This is title ',
        description : 'this is description ',
        active : true
      },
      {
        sno : 3,
        title: 'This is title ',
        description : 'this is description ',
        active : true
      },
    ]
  }
  constructor() { }
}
