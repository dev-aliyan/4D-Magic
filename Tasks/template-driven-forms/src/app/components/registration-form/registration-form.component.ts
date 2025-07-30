import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css'
})
export class RegistrationFormComponent {
  fullName : string = '';
  email : string = '';
  password : string = '';
  confirmPassword : string = '';
  age: number | null = null;

  onSubmit (form : NgForm) {
    if (form.valid && this.password === this.confirmPassword && this.age! >= 18) {
      console.log('Form Submitted!', form);
      alert('Registration successful!');
      // Reset the form
      form.reset();
    } else {
      console.error('Form is invalid or passwords do not match or age is less than 18');
    }
  }
  

}
