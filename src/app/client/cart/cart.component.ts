import { Component, OnInit } from '@angular/core';
import { faBars, faHeart, faPhone, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_services/cart.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  username: string;
  items : any;

  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  bars = faBars;

  showDepartment = false;
  selectedProducts: any;

  constructor(public cartService: CartService, public storageService: StorageService, public messageService: MessageService){

  }

  ngOnInit(): void {
    // this.storageService.currentUser.subscribe(username => this.username = username);
    this.username = this.storageService.loadUsername();
    console.log(this.username);
    this.getItems();
  }

  showDepartmentClick(){
    this.showDepartment = !this.showDepartment;
  }

  getItems(){
    this.cartService.getItems(this.username).subscribe({
      next: res =>{
        this.items = res;
        this.cartService.getTotalPrice(this.items);
      },error: err =>{
        console.log(err);
      }
    })
  }

  removeFromCart(item:any){
    this.cartService.deleteProduct(item.id).subscribe({
      next: res =>{
        this.getItems();
        this.showWarn("Xóa thành công");
        // this.showDelete = false;
      },error: err =>{
        this.showError(err.message);
      }
    })
  }

  updateQuantity(item: any,event: any){
    let quantity : number = event.target.value;
    // console.log(item);
    this.cartService.updateProduct(item.id,quantity).subscribe({
      next: res =>{
        this.getItems();
        // this.cartService.getTotalPrice(this.items);
      },error: err =>{
        console.log(err);
      }
    })
    // this.getItems();
  }

  plusQuantity(item:any){
    let quantity = Number(item.quantity);
    this.cartService.updateProduct(item.id,quantity+=1).subscribe({
      next: res =>{
        this.getItems();
        // this.cartService.getTotalPrice(this.items);
      },error: err =>{
        console.log(err);
      }
    })
    // this.getItems();
  }

  subtractQuantity(item: any){
    if(item.quantity > 1){
      let quantity = Number(item.quantity);
      this.cartService.updateProduct(item.id,quantity-=1).subscribe({
        next: res =>{
          this.getItems();
        //   this.cartService.getTotalPrice(this.items);
        },error: err =>{
          console.log(err);
        }
      })
      // this.getItems();
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
