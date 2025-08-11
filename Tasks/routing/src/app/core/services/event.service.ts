import { Event } from './../models/event.model';
import { Injectable } from '@angular/core';
import eventsData from '../../../assets/events.json';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  private events : Event [] = eventsData

  constructor () {
    const saved = localStorage.getItem('events');
    if (saved) {
      this.events = JSON.parse(saved)
    } else {
      this.events = eventsData
      localStorage.setItem('events', JSON.stringify(this.events))
    }
  }

  private saveToLocalStorage () {
    localStorage.setItem('events', JSON.stringify(this.events))
  }

  getAll() : Event [] {
    return [...this.events]
  }

  getById(id: number): Event | undefined {
    return this.events.find(e => e.id === id);
  }

  createEvent( event : Event): Event {
    event.id = Math.max(...this.events.map(e => e.id),0) +1
    this.events.push(event)
    this.saveToLocalStorage()
    return event
  }

  updateEvent (event : Event): void { 
    const index = this.events.findIndex(e => e.id === event.id)
    if (index !== -1 ) this.events[index] = event
    this.saveToLocalStorage()
  }

  deleteEvent (id: number): void  {
    this.events = this.events.filter( e => e.id !== id)
    this.saveToLocalStorage()
  }

}
