import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  items = ['one', 'two', 'three'];

  addItem () {
    this.items = [...this.items, 'new item'];
    console.log('Item added:', this.items);
  }

  
}
