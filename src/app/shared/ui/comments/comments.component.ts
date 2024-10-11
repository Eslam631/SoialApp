import { Component, Input, OnInit, WritableSignal, inject, input, signal, NgModule } from '@angular/core';
import { CommpentService } from '../../../core/services/commpent.service';
import { Icomment } from '../../../core/interfaces/icomment';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { single, Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Iprofile } from '../../../core/interfaces/iprofile';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [DatePipe,ReactiveFormsModule,],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {






  private readonly _CommpentService=inject(CommpentService)
  @Input({required:true})postID!:string


  commentList:WritableSignal<Icomment[]>=signal([])

  private readonly _AuthService=inject(AuthService)
  private readonly _ToastrService=inject(ToastrService)

  userForm:Iprofile={} as Iprofile





  commentGroup!:FormGroup
  UpdateCommentGroup!:FormGroup
  content:WritableSignal<string>=signal('')

  newCommpent:WritableSignal<string>=signal('')

  dataForm={
  content:this.content()
  }



  ngOnInit(): void {



    this.commentGroup=new FormGroup({
      content:new FormControl(null),
      post:new FormControl(this.postID)
    })
    this.UpdateCommentGroup=new FormGroup({
      content:new FormControl(null),

    });

    this._AuthService.informationUser().subscribe({
      next: (data) => {
        this.userForm=data.user
      },
      error: (error) => {console.error(error) },
    })



    this._CommpentService.getPostComment(this.postID).subscribe({
      next: (res) =>{

        this.commentList.set(res.comments.reverse())


    },
      error: (err) => {console.log(err) }
    })


  }

  sendComment():void{
    this._CommpentService.createCommpent(this.commentGroup.value).subscribe({
      next: (res) =>{
     this.commentList.set(res.comments.reverse())
     this.commentGroup.get('content')?.reset()
      },
      error: (err) => {console.log(err)

      }
    })

  }

  updateComment(id:string):void{



    this._CommpentService.updatePostComment(id,this.UpdateCommentGroup.value).subscribe({
      next: (res) =>{
        this._ToastrService.success(res.message)
    this.UpdateCommentGroup.get('content')?.reset()
    this._CommpentService.getPostComment(this.postID).subscribe({
      next: (res) =>{

        this.commentList.set(res.comments.reverse())


    },
      error: (err) => { }
    })




      },
      error: (err) => { }
    })



  }
deleteCommpent(id:string):void{
  this._CommpentService.deleteCommpent(id).subscribe({
    next: (res) =>{
      this._ToastrService.error(res.message)
    this._CommpentService.getPostComment(this.postID).subscribe({
      next: (res) =>{
        this.commentList.set(res.comments.reverse())


    },
      error: (err) => {console.log(err) }
    })



    },
    error: (err) => {console.log(err) }
  })

}

showContent(content:string):void{
  this.content.set( content)

  this.UpdateCommentGroup.patchValue({
    content:this.content()
  })





}





}
