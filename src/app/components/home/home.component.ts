import { Component, inject, OnInit, input, WritableSignal, signal, OnDestroy } from '@angular/core';
import { PostesService } from '../../core/services/postes.service';
import { Iposte } from '../../core/interfaces/iposte';
import { DatePipe } from '@angular/common';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { CommentsComponent } from "../../shared/ui/comments/comments.component";
import { FormsModule, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, InfiniteScrollModule, CommentsComponent,FormsModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{

  postesList:WritableSignal<Iposte[]>=signal([])
  private currentPage = 1;
  private isLoading:WritableSignal<boolean> =signal(false);
  hasMoreData:WritableSignal<boolean> = signal(true);
saveFile!:File;
getAllPostesSub!:Subscription

  private readonly _PostesService=inject(PostesService);
  private readonly _ToastrService=inject(ToastrService)
  private readonly _AuthService=inject(AuthService)

  content:string=''







  ngOnInit(): void {

 this.getAllPostesSub= this._PostesService.getAllPostes(1).subscribe({
        next: (data) =>{
          this.postesList.set(data.posts.reverse())
        },
        error: (error) => {}
      })

      this._AuthService.informationUser().subscribe({
        next: (data) => {
       

          this._AuthService.userPhoto.set(data.user.photo)
        },
        error: (error) => {console.error(error)}
       })

  }


  loadPostes(page: number): void {
    if (this.isLoading() || !this.hasMoreData()) return; // منع تحميل البيانات إذا كانت التحميلات جارية أو لا يوجد المزيد من البيانات
    this.isLoading.set(true); // تعيين حالة التحميل

    this._PostesService.getAllPostes(page).subscribe({
      next: (data) => {
        if (data.posts.length === 0) {
          this.hasMoreData.set(false)// إذا لم تكن هناك بيانات جديدة، يتم تعطيل التحميل المستقبلي
        } else {
          this.postesList.set( [...this.postesList(), ...data.posts]); // دمج البيانات الجديدة مع القديمة
        }
        this.isLoading.set(false); // إلغاء حالة التحميل بعد انتهاء الطلب
      },
      error: (error) => {

        this.isLoading.set(false); // إلغاء حالة التحميل حتى في حالة حدوث خطأ
      }
    });

  }
  onScroll(): void {
    // التأكد من عدم وجود تحميل جاري بالفعل
    if (this.isLoading() || !this.hasMoreData()) return;

    setTimeout(() => {
      this.currentPage++; // زيادة رقم الصفحة
      this.loadPostes(this.currentPage); // تحميل الصفحة الجديدة
    }, 1000); // تأخير بسيط لإعطاء تأثير التحميل
  }

  changeIamge(e:Event):void{
   const input=e.target as HTMLInputElement
   if(input.files&&input.files.length>0){
   this.saveFile=input.files[0]

  }

  }

createPost():void{
  const formData =new FormData();
  formData.append('body', this.content)
  formData.append('image', this.saveFile)

  this._PostesService.createPostes(formData).subscribe({
    next: (data) => {
      console.log(data)
      if(data.message=="success"){
        this.content=''
        this._ToastrService.success(data.message)

        this.ngOnInit()

      }
    },
    error:(err)=>{

    }
  })
}

ngOnDestroy(): void {
    this.getAllPostesSub.unsubscribe()
}


}
