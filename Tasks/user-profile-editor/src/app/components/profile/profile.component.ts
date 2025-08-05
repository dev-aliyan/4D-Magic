import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    const user = this.userService.getUser();
    this.userForm = this.fb.group({
      firstName: [user.firstName, [Validators.required, Validators.minLength(3)]],
      lastName: [user.lastName, [Validators.required, Validators.minLength(3)]],
      userName: [user.userName, [Validators.required, Validators.minLength(3)]],
      email: [user.email, [Validators.required, Validators.email]]
    });

    this.userForm.valueChanges.subscribe(val => {
      this.userService.setUser(val);
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      alert('User profile saved!');
    }
  }
}