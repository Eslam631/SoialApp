import { Component, computed, inject, Signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent  {
   _AuthService=inject(AuthService)
   image:Signal<string>=computed(()=>this._AuthService.userPhoto())





  private readonly _Router=inject(Router)
logOut():void{
  localStorage.removeItem('token')
  this._Router.navigate(['/login'])
}

}
