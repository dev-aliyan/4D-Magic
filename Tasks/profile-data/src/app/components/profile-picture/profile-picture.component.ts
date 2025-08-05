import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent {
  @Input() imageUrl: string = '';
  @Output() imageChange = new EventEmitter<string>();

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageChange.emit(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
}