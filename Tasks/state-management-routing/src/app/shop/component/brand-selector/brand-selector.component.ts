import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Brand } from '../../../models/brand';

@Component({
  selector: 'app-brand-selector',
  templateUrl: './brand-selector.component.html',
  styleUrl: './brand-selector.component.css'
})
export class BrandSelectorComponent {
  @Input() brands: Brand[] = [];
  @Input() selectedId = '';
  @Output() brandChange = new EventEmitter<string>();

  // safer event handler: read value as HTMLSelectElement
  onChange(evt: Event) {
    const value = (evt.target as HTMLSelectElement)?.value ?? '';
    this.brandChange.emit(value);
  }
}
