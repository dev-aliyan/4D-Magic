import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  getTodos() {
    return [
      {
        title: 'This is title ',
        description : 'this is description ',
        active : true
      },
      {
        title: 'This is title ',
        description : 'this is description ',
        active : true
      },
      {
        title: 'This is title ',
        description : 'this is description ',
        active : true
      },
    ]
  }
  constructor() { }
}
