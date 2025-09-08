import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Brand } from '../../models/brand';

@Component({
  selector: 'app-brand-selector',
  standalone: false,
  templateUrl: './brand-selector.html',
  styleUrls: ['./brand-selector.css']
})
export class BrandSelector {
  @Input() brands: Brand[] = [];
  @Input() selectedId = '';
  @Output() brandChange = new EventEmitter<string>();

  // safer event handler: read value as HTMLSelectElement
  onChange(evt: Event) {
    const value = (evt.target as HTMLSelectElement)?.value ?? '';
    this.brandChange.emit(value);
  }
}
