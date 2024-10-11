import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Idetalies } from '../../core/interfaces/idetalies';
import { PostesService } from '../../core/services/postes.service';
import { CommentsComponent } from '../../shared/ui/comments/comments.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalies',
  standalone: true,
  imports: [CommentsComponent,DatePipe],
  templateUrl: './detalies.component.html',
  styleUrl: './detalies.component.scss'
})
export class DetaliesComponent implements OnInit {
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _PostesService=inject(PostesService)

  detaliesPost:Idetalies|null=null




  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next: (p) => {
         let id=(p.get('id'))
         this._PostesService.getSinglePoste(id).subscribe({
          next: (res) => {
            console.log(res.post)
            this.detaliesPost=res.post

          },
          error: (err) => {}
         })


        },
        error: (error) => {

        }


      })
  }

}
