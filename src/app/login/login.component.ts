import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';


interface LoginUser {
  _id: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private loginService = inject(LoginService);

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  userId = signal<string | null>(null);

  onSubmit() {
    const { username, password } = this.loginForm.value;

    if (username && password) {
      this.loginService.getUsers().subscribe(
        (users: LoginUser[]) => {

          const user = users.find(u => u.username === username && u.password === password);

          if (user) {
            console.log('Found user:', user);
            this.userId.set(user._id);
            localStorage.setItem('userId', user._id);

            alert('Login successful');

            window.location.reload();
          } else {
            console.error('Invalid username or password');
            alert('Invalid username or password');
          }
        },
        (error) => {
          console.error('Error fetching users:', error);
          alert('An error occurred. Please try again later.');
        }
      );
    } else {
      alert('Please enter both username and password.');
    }
  }



}
