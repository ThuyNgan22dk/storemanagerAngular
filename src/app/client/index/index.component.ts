import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {faBars, faHeart, faRightFromBracket, faUser, faSearch} from '@fortawesome/free-solid-svg-icons'
import {faShoppingBag} from '@fortawesome/free-solid-svg-icons'
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/_services/auth.service';
import { CartService } from 'src/app/_services/cart.service';
import { CategoryService } from 'src/app/_services/category.service';
import { StorageService } from 'src/app/_services/storage.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [MessageService]

})
export class IndexComponent implements OnInit {

  // listItemInCart: any[] = [];
  totalPrice = 0;
  search = faSearch;
  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  userIcon = faUser;
  logoutIcon = faRightFromBracket;
  bars = faBars;

  showDepartment = false;
  loginSuccess = false;
  items: any[] =[];

  loginForm : any = {
    username : null,
    password : null
  }

  registerForm : any = {
    username: null,
    email: null,
    password: null
  }

  price = {
    total: 0,
    totalPrice: 0
  }

  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';
  authModal : boolean = false;
  listCategoryEnabled : any;
  username: string;

  keyword: any;

  constructor(
    public cartService:CartService,
    private authService: AuthService,
    private storageService: StorageService,
    private messageService:MessageService,
    private categoryService: CategoryService,
    private router: Router){

  }

  ngOnInit(): void {
    this.isLoggedIn = false;
    this.storageService.currentUser.subscribe(username => this.username = username);
    this.username = this.storageService.loadUsername();
    this.getCategoryEnbled();
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.getItems();
  }

  showAuthForm(){
    if(!this.isLoggedIn){
      this.authModal = true;
      this.loginForm = {username: null,password: null};
      this.registerForm = {username: null,email: null, password: null};
    }
  }

  getCategoryEnbled(){
    this.categoryService.getListCategoryEnabled().subscribe({
      next: res =>{
        this.listCategoryEnabled = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

  removeFromCart(item:any){
    // console.log(item.id);
    this.cartService.deleteProduct(item.id, this.username).subscribe({
      next: res =>{
        this.getItems();
        this.showWarn("Xóa thành công");
      },error: err =>{
        this.showError(err.message);
      }
    })
  }

  showAuthFormClick(){
    this.loginSuccess = true;
  }

  logout():void{
    this.authService.logout().subscribe({
      next:res =>{
        this.storageService.clean();
        this.isLoggedIn = false;
        this.authModal = false;
        this.showSuccess("Bạn đã đăng xuất!!");
        this.username = this.storageService.loadUsername();
        // console.log(this.username);
      },error: err=>{
        this.showError(err.message);
      }
    })
    window.location.reload();
  }

  getTotalPrice(items: any[]){
    this.price.totalPrice = 0;
    this.price.total = 0;
    items.forEach(res =>{
      this.price.totalPrice += res.total;
      this.price.total = this.price.totalPrice;
    })
    return this.price;
  }

  getItems(){
    if( this.username != null){
      this.cartService.getItems(this.username).subscribe({
        next: res =>{
          this.items = res;
          this.getTotalPrice(this.items);
        },error: err =>{
          console.log(err);
        }
      })
    }
  }

  showSuccess(text: string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: text});
  }

  showError(text: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: text});
  }

  showWarn(text: string) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
  }
}
