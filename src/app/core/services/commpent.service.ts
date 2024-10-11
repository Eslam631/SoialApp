import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environment/environmnent';

@Injectable({
  providedIn: 'root'
})

export class CommpentService {

  private readonly _HttpClient=inject(HttpClient)

  createCommpent(data:object):Observable<any>{
    return this._HttpClient.post(`${enviroment.posteUrl}comments`,
      data
    )
  }

  getPostComment(postId:string):Observable<any>{
    return this._HttpClient.get(`${enviroment.posteUrl}posts/${postId}/comments`)
  }

  updatePostComment(commentId:string ,data:object):Observable<any>{
    return this._HttpClient.put(`${enviroment.posteUrl}comments/${commentId}`,
      data

    )
  }

  deleteCommpent(commentId:string):Observable<any>{
    return this._HttpClient.delete(`${enviroment.posteUrl}comments/${commentId}`)
  }

}
