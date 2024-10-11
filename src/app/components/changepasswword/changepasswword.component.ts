import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-changepasswword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './changepasswword.component.html',
  styleUrl: './changepasswword.component.scss'
})
export class ChangepasswwordComponent {
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _AuthService=inject(AuthService)
  msgSuccess:boolean=false
  msgError:string=''


 changePasswordForm:FormGroup=this._FormBuilder.group({

  password:[null,[Validators.required,Validators.pattern( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
  newPassword:[null,[Validators.required,Validators.pattern( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],

  })

  changePaswwordSumbint(form:FormGroup):void{
    this._AuthService.changePassword(form.value).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }



}
