import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../environment/environmnent';

@Injectable({
  providedIn: 'root'
})
export class PostesService {

private readonly _HttpClient=inject(HttpClient)

createPostes(data:object):Observable<any>{
  return this._HttpClient.post(`https://linked-posts.routemisr.com/posts`,data
)
}

getAllPostes(page:number):Observable<any>{
  return this._HttpClient.get(`${enviroment.posteUrl}posts?page=${page}`)
}

getMyPostes():Observable<any>{
  return this._HttpClient.get(`${enviroment.posteUrl}users/664bcf3e33da217c4af21f00/posts?`)
}

getSinglePoste(postId:string|null):Observable<any>{
  return this._HttpClient.get(`${enviroment.posteUrl}posts/${postId}`)
}

updatePoste(data:object ,postId:string):Observable<any>{

  return this._HttpClient.put(`${enviroment.posteUrl}posts/${postId}`,
    data
  )

}
deletePoste(postId:string):Observable<any>{
  return this._HttpClient.delete(`${enviroment.posteUrl}posts/${postId}`)
}





}
