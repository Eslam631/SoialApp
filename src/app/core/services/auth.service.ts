import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environment/environmnent';
import { Iuser } from '../interfaces/iuser';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {










userData:any=null
userPhoto:WritableSignal<string>=signal('')


  private readonly _HttpClient=inject(HttpClient)

  ngOnInit(): void {
    this.informationUser().subscribe({
      next: (data) => {
        console.log(data)
        this.userPhoto.set(data.user.photo)
      },
      error: (error) => {}
    })

  }

  registerUser(form:Iuser):Observable<any>{
    return this._HttpClient.post(`${enviroment.baseUrl}signup`,
      form)

  }
  loginUser(form:Iuser):Observable<any>{
    return this._HttpClient.post(`${enviroment.baseUrl}signin`,form)
  }

  informationUser():Observable<any>{
    return this._HttpClient.get(`${enviroment.baseUrl}profile-data`)
  }

  changePassword(data:object):Observable<any>{
    return this._HttpClient.patch(`${enviroment.baseUrl}change-password`,data)
  }


  saveUserDate():void{
    if(localStorage.getItem('token')!==null){

   this.userData=jwtDecode(localStorage.getItem('token')!)


    }

  }
  updateProfile(data:object):Observable<any>{
    return this._HttpClient.put(`${enviroment.baseUrl}/upload-photo`,data)
  }


}
