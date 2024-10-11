import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _AuthService=inject(AuthService)
  msgSuccess:boolean=false
  msgError:string=''
  private readonly _Router=inject(Router)
  private readonly _ToastrService=inject(ToastrService)

  loginForm:FormGroup=this._FormBuilder.group({

    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],

  })


  loginSumbit(form:FormGroup):void{

    this._AuthService.loginUser(form.value).subscribe({
      next: (res) => {
        console.log(res.message)
        if(res.message==='success')
{
  this.msgSuccess=true



        setTimeout(()=>{
          localStorage.setItem('token',res.token)
          this._Router.navigate(['/home'])
        },1000)


}


      },
      error:(err)=> {

          this.msgError=err.error.error



      },

    })

  }
}
