import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const COMMENT_API = "http://localhost:8080/api/comment/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getListComment():Observable<any>{
    return this.http.get(COMMENT_API,httpOptions);
  }

  getListCommentEnabled(){
    return this.http.get(COMMENT_API + 'enabled',httpOptions);
  }

  // createComment(name: string){
  //   return this.http.post(COMMENT_API + 'create',{name},httpOptions);
  // }

  // updateComment(id: number, rate: number, detail: string){
  //   return  this.http.put(COMMENT_API + 'update/' + id,{rate,detail},httpOptions);
  // }

  enableComment(id: number){
    return this.http.put(COMMENT_API + 'enable/'+ id,httpOptions);
  }

  // deleteComment(id:number){
  //   return this.http.delete(COMMENT_API + 'delete/'+ id,httpOptions);
  // }


}
