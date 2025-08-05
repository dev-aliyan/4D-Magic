import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrl: './profile-picture.component.css'
})
export class ProfilePictureComponent {
  @Input() imageUrl : string = "";
  @Output() imageChange = new EventEmitter<string>();

  onFileChange(event : Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = () => this.imageChange.emit(reader.result as string);
      reader.readAsDataURL(input.files[0])
    }
  }
}
