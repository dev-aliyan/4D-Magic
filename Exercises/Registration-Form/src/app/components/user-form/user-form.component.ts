import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  registrationForm = new FormGroup({
    fisrtName: new FormControl('',Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  onFormSubmit () {
    if (this.registrationForm.valid) {
      console.log('Form Submitted! with values:', this.registrationForm.value);
    } else {
      console.log('Form is invalid')
    }
  }
}
