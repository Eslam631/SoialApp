import { Component, inject, Inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { PostesService } from '../../core/services/postes.service';
import { Iprofile } from '../../core/interfaces/iprofile';
import { Iposte } from '../../core/interfaces/iposte';
import { single, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { CommentsComponent } from '../../shared/ui/comments/comments.component';
import { RouterLink } from '@angular/router';
import { FlowbiteService } from '../../core/services/flowbite.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DatePipe,CommentsComponent,RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})


export class ProfileComponent implements OnInit, OnDestroy{


private readonly _AuthService=inject(AuthService)
private readonly _PostesService=inject(PostesService)
private readonly _ToastrService=inject(ToastrService)
userForm:Iprofile={} as Iprofile

myPostes:WritableSignal<Iposte[]>=signal([])
saveFile!:File;
myPostedSub!:Subscription
informationSub!:Subscription



  ngOnInit(): void {
this.informationSub=   this._AuthService.informationUser().subscribe({
    next: (data) => {
      this._AuthService.userPhoto.set(data.user.photo)
      this.userForm=data.user
    },
    error: (error) => {console.error(error)}
   })

 this.myPostedSub= this._PostesService.getMyPostes().subscribe({
    next: (data) => {
     this.myPostes.set(data.posts)
    },
    error: (err)=>{
      console.log(err)
    }
  })

  }

  deletePost(id:string):void{

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(()=>{
          this._PostesService.deletePoste(id).subscribe({
            next: (data) => {
              this._ToastrService.error(data.message)

              this._PostesService.getMyPostes().subscribe({
                next: (data) => {
                 this.myPostes.set(data.posts)
                },
                error: (err)=>{

                }
              })


            },
            error: (err) => {}
          })
        }

        )
      }

    });









  }

  changeIamge(e:Event):void{
    const input=e.target as HTMLInputElement
    if(input.files&&input.files.length>0){
    this.saveFile=input.files[0]

   }

   }
   updateProfile():void{
    const formData =new FormData();

  formData.append('photo', this.saveFile)
  this._AuthService.updateProfile(formData).subscribe({
    next: (data) => {
      this._ToastrService.success(data.message)

      this.ngOnInit()

    },
    error: (err) => {}
  })
   }

   ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
this.myPostedSub.unsubscribe()
this.informationSub.unsubscribe()
  }

}
