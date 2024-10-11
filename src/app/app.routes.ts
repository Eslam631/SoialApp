import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { loginGuard } from './core/guards/login.guard';
import { authGuard } from './core/guards/auth.guard';
import { Title } from '@angular/platform-browser';

export const routes: Routes = [
{path:'',component:AuthLayoutComponent,canActivate:[loginGuard],children:[
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'register',loadComponent:()=>import('./components/register/register.component').then((c)=>c.RegisterComponent),title:'register'},
  {path:'login',component:LoginComponent,title:'login'},

]

},
{path:'',component:BlankLayoutComponent,canActivate:[authGuard],children:[
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent,title:'home'},
  {path:'profile',loadComponent:()=>import('./components/profile/profile.component').then((c)=>c.ProfileComponent),title:'profile'},
  {path:'change',loadComponent:()=>import('./components/changepasswword/changepasswword.component').then((c)=>c.ChangepasswwordComponent),title:'change'}
,{path:'detalies/:id',loadComponent:()=>import('./components/detalies/detalies.component').then((c)=>c.DetaliesComponent),title:'detalies'}]},
{path:'**',loadComponent:()=>import('./components/notfoundpage/notfoundpage.component').then((c)=>c.NotfoundpageComponent),
  title:'notfound'

},
];
