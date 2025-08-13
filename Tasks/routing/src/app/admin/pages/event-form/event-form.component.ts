import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../core/services/event.service';
import { futureDateValidator } from '../../../core/validators/future-date-validator';
import { Event } from '../../../core/models/event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html'
})

export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  editMode = false;
  eventId!: number;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.editMode = !!this.eventId;

    const event = this.editMode
      ? this.eventService.getById(this.eventId)
      : { title: '', date: '', location: '', capacity: 1, price: 0 };

    this.eventForm = this.fb.group({
      title: [event?.title, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      date: [event?.date, [Validators.required, futureDateValidator]],
      location: [event?.location, [Validators.required]],
      capacity: [event?.capacity, [Validators.required, Validators.min(1), Validators.max(10000)]],
      price: [event?.price, [Validators.required, Validators.min(0)]]
    });
  }

  saveEvent() {
    if (this.eventForm.invalid) {
      console.log(this.eventForm.value, 'Event FormValues')
    };

    const event: Event = { id: this.eventId, ...this.eventForm.value };

    if (this.editMode) {
      this.eventService.updateEvent(event);
    } else {
      const created = this.eventService.createEvent(event);
      this.eventId = created.id;
    }

    this.router.navigate(['/events', this.eventId]);
  }
}
