import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  userSource = new BehaviorSubject<string>("user");
  currentUser = this.userSource.asObservable();
  username: string;

  constructor() { }

  clean():void{
    window.sessionStorage.clear();
  }

  // saveUsername():void{
  //   localStorage.setItem('username',JSON.stringify(this.currentUser));
  //   console.log(this.currentUser);
  // }

  changeUsername(username:string) {
    this.userSource.next(username);
    this.username = username;
    localStorage.setItem('username',JSON.stringify(this.username));
    // console.log(username);
  }

  loadUsername(){
    this.username = JSON.parse(localStorage.getItem('username') as any);
    // console.log(this.username);
    return this.username;
  }

  saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}
