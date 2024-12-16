import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { SignupService } from '../services/signup.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm = new FormGroup({
    username: new FormControl('',{validators: [Validators.required, Validators.minLength(3)]}),
    password: new FormControl('',{validators: [Validators.required, Validators.minLength(3)]})
  });


  constructor(private signupService: SignupService) {}

  onSubmit() {
    console.log(this.signupForm.value);

    const { username, password } = this.signupForm.value;

    if (username && password) {
      this.signupService.signup(username, password).subscribe(
        (response) => {
          console.log(response);
          alert(`You signed up!`);
        },
        (error) => {
          console.error('Signup failed:', error);
          if (error.status === 409) {
            alert('Username already exists. Please choose another one.');
          } else {
            alert('An error occurred during signup. Please try again.');
          }
        }
      );
    } else {
      console.error('Username or password is missing');
    }
    window.location.reload();

  }

}
