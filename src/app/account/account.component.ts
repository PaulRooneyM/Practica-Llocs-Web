import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { SignupComponent } from "../signup/signup.component";
import { LogoutComponent } from "../logout/logout.component";
import { CurrentuserComponent } from "../currentuser/currentuser.component";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [LoginComponent, SignupComponent, LogoutComponent, CurrentuserComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

}
