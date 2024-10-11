import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RegisterComponent } from "../../components/register/register.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [NavbarComponent, RegisterComponent,RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}
