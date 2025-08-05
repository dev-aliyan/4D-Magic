import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService, UserProfile } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm!: FormGroup;
  preview!: UserProfile;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    const user = this.userService.getUser();

    this.userForm = this.fb.group({
      firstName: [user.firstName, [Validators.required, Validators.minLength(3)]],
      lastName: [user.lastName, [Validators.required, Validators.minLength(3)]],
      userName: [user.userName, [Validators.required, Validators.minLength(3)]],
      email: [user.email, [Validators.required, Validators.email]],
      profilePicture: [user.profilePicture]
    });

    this.userForm.valueChanges.subscribe(value => this.preview = value);
    this.preview = user;
  }

  onImageChange(newImage: string) {
    this.userForm.patchValue({ profilePicture: newImage });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.value;
      this.userService.updateUser(updatedUser);
      alert('Profile updated!');
    } else {
      alert('Please fix the errors in the form.');
    }
  }
}
