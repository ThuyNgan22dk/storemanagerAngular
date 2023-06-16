import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  userSource = new BehaviorSubject<string>('user');
  currentUser = this.userSource.asObservable();
  username: string;
  promotion ={
    percent: 0,
    code: ''
  };
  // promotionPercent: number = null;
  // promotionCode: string = null;

  constructor() { }

  clean(): void {
    this.username = null;
    localStorage.removeItem('username');
    window.sessionStorage.clear();
    // window.localStorage.clear();
  }

  changeUsername(username: string) {
    this.userSource.next(username);
    this.username = username;
    localStorage.setItem('username', JSON.stringify(this.username));
  }

  loadUsername() {
    this.username = JSON.parse(localStorage.getItem('username'));
    return this.username;
  }

  // changePromotion(promotion: any) {
  //   this.promotion.code = promotion.code;
  //   this.promotion.percent = promotion.percent;
  //   localStorage.setItem('promotion', JSON.stringify(this.promotion));
  //   // localStorage.setItem('percent', JSON.stringify(this.promotion.percent));
  //   // return this.promotion;
  // }

  // loadPromotion() {
  //   this.promotion = JSON.parse(localStorage.getItem('promotion'));
  //   return this.promotion;
  // }

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
