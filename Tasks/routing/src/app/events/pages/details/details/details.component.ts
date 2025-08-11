import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../core/models/event.model';
import { EventService } from '../../../../core/services/event.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  event! : Event

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.eventsService.getById(id);

    if (found) {
      this.event = found;
    } else {
      this.router.navigate(['/events']);
    }
  }

  editEvent () {
    this.router.navigate(['admin/events', this.event.id, 'edit'])
  }

  deleteEvent () {
    this.eventsService.deleteEvent(this.event.id);
    this.router.navigate(['/events'])
  }
}
