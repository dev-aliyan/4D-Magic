import { Router } from '@angular/router';
import { EventService } from './../../../../core/services/event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../core/models/event.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  searchTerm: string = '';

  constructor(private eventsService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.events = this.eventsService.getAll();
    this.filteredEvents = [...this.events]; 
  }

  filterEvents() {
    if (!this.searchTerm) {
      this.filteredEvents = [...this.events];
    } else {
      this.filteredEvents = this.events.filter(e =>
        e.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        e.location.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  viewDetails(id: number) {
    this.router.navigate(['/events', id]);
  }
}