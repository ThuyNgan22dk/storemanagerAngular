import { HttpHeaders,HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const USER_API = "http://192.168.0.6:8080/api/user/";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  ngOnInit(): void {}

  getUser(username: string):Observable<any>{
    return this.http.get(USER_API + username, httpOptions)
  }

  getListUser():Observable<any>{
    return this.http.get(USER_API, httpOptions);
  }

  enableUser(id: number):Observable<any>{
    return this.http.put(USER_API + 'enable/'+ id,httpOptions);
  }

  updateProfile(username: string,firstname: string,lastname:string,email:string,country:string,address: string,phone: string):Observable<any>{
    return this.http.put(USER_API +'update',{username,firstname,lastname,email,country,address,phone},httpOptions);
  }

  updateUser(id:number,username: string,firstname: string,lastname:string,email:string,country:string,address: string,phone: string):Observable<any>{
    return this.http.put(USER_API +'update/' + id,{username,firstname,lastname,email,country,address,phone},httpOptions);
  }

  changePassword(username: string, oldPassword: string,newPassword: string):Observable<any>{
    return this.http.put(USER_API + 'changePassword/' + username,{oldPassword,newPassword},httpOptions);
  }

  resetPassword(username: string): Observable<any>{
    return this.http.put(USER_API + 'resetPassword/' + username,httpOptions);
  }

  deleteUser(id:number){
    return this.http.delete(USER_API + 'delete/'+ id,httpOptions);
  }
}
