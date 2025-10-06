import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  selectedDate: Date | null = null;

  bookedDates: Date[] = [];
  reservedDates: Date[] = [];

  ngOnInit(): void {

    this.bookedDates = [
      new Date(2025, 8, 10), // Sep 10, 2025
      new Date(2025, 8, 14)  // Sep 14, 2025
    ];

    this.reservedDates = [
      new Date(2025, 8, 12), // Sep 12, 2025
      new Date(2025, 8, 18)  // Sep 18, 2025
    ];
  }

  private isSameDay(a?: Date | null, b?: Date | null): boolean {
    if (!(a instanceof Date) || !(b instanceof Date)) return false;
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  getDateStatus(date: Date): 'booked' | 'reserved' | 'available' {
    if (this.bookedDates.some(d => this.isSameDay(d, date))) return 'booked';
    if (this.reservedDates.some(d => this.isSameDay(d, date))) return 'reserved';
    return 'available';
  }

  getDayClass(date: Date | null | undefined): string {
    if (!(date instanceof Date)) return ''; 
    const status = this.getDateStatus(date);
    const selected = this.selectedDate && this.isSameDay(this.selectedDate, date);
    let cls = `day-cell ${status}`;
    if (selected) cls += ' selected';
    return cls;
  }


  onSelectDate(date: Date) {
    this.selectedDate = date;
    console.log('Selected date:', date, 'Status:', this.getDateStatus(date));
  }
}
