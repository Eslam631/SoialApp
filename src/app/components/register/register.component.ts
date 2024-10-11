import { Component, inject, NgModule } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _AuthService=inject(AuthService)
  msgSuccess:boolean=false
  msgError:string=''
  private readonly _Router=inject(Router)

  registerForm:FormGroup=this._FormBuilder.group({
    name:[null,[Validators.required,Validators.minLength(3), Validators.maxLength(20)]],
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword:[null],
    dateOfBirth:[null,[Validators.required]],
    gender:[null,[Validators.required,Validators.pattern(/^(male|female)$/)]]



  },{validators:[this.confirmPassword]})
  registerSubmit(form:FormGroup):void{
    this.msgError=''
    this._AuthService.registerUser(form.value).subscribe({
      next: (res) =>
        {
          this.msgSuccess=true
          setTimeout(()=>{
            this._Router.navigate(['/login'])
          },1000)


        },
      error: (err) =>{
        this.msgError=err.error.error

      }
    })



  }


  confirmPassword(g:AbstractControl){
    if(g.get('password')?.value===g.get('rePassword')?.value){

      return null
    }
    else{
      return {misMatch:true}

    }
  }



}
