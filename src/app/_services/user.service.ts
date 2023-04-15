import { HttpHeaders,HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const USER_API = "http://localhost:8080/api/user/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  ngOnInit(): void {

  }

  getUser(username: string):Observable<any>{
    let params = new HttpParams();
    params = params.append('username',username);
    return this.http.get(USER_API + {params: params})
  }

  getListUser():Observable<any>{
    return this.http.get(USER_API, httpOptions);
  }

  enableUser(id: number){
    return this.http.put(USER_API + 'enable/'+ id,httpOptions);
  }

  updateProfile(username: string,firstname: string,lastname:string,email:string,country:string,state:string,address: string,phone: string):Observable<any>{
    return this.http.put(USER_API +'update',{username,firstname,lastname,email,country,state,address,phone},httpOptions);
  }

  updateUser(id:number,username: string,firstname: string,lastname:string,email:string,country:string,state:string,address: string,phone: string):Observable<any>{
    return this.http.put(USER_API +'update/' + id,{username,firstname,lastname,email,country,state,address,phone},httpOptions);
  }

  changePassword(id: number, oldPassword: string,newPassword: string):Observable<any>{
    return this.http.put(USER_API + 'changePassword' + id,{oldPassword,newPassword},httpOptions);
  }

  resetPassword(id: number): Observable<any>{
    return this.http.put(USER_API + 'resetPassword' + id,httpOptions);
  }

  deleteUser(id:number){
    return this.http.delete(USER_API + 'delete/'+ id,httpOptions);
  }
}
