import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  form = this.fb.group({
    email: ['eve.holt@reqres.in', Validators.required],
    password: ['cityslicka', Validators.required]
  });
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.auth.login(this.form.value.email!, this.form.value.password!)
        .subscribe({
          next: () => this.router.navigate(['/dashboard']),
          error: err => {
            this.error = 'Invalid credentials';
            this.loading = false;
          }
        });
    }
  }
}
