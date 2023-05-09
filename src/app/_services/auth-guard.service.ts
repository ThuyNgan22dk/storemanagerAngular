import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  isLoggedIn: boolean = false;

  constructor(private storageService: StorageService,private router: Router) { }



  canActivate():boolean{
    this.isLoggedIn = this.storageService.isLoggedIn();
    if(this.isLoggedIn == false){
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }
}
