import { Component, OnInit } from '@angular/core';
import { faBars, faHeart, faPhone, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { Order } from 'src/app/_models/order';
import { OrderDetail } from 'src/app/_models/order-detail';

import { CartService } from 'src/app/_services/cart.service';
import { OrderService } from 'src/app/_services/order.service';
import { PromotionService } from 'src/app/_services/promotion.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
  providers: [MessageService]

})
export class CheckOutComponent implements OnInit {
  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  bars = faBars;
  showDepartment = false;
  order = new Order();
  listOrderDetail: any[] = [];
  username !: string;
  items: any[] = [];
  user: any;
  price = {
    total: 0,
    totalPrice: 0
  }
  showDiscount = false;
  promotionForm: any;
  promotionCode: string = null;

  orderForm: any = {
    firstname: null,
    lastname: null,
    country: null,
    addrest: null,
    town: null,
    state: null,
    postCode: null,
    email: null,
    phone: null,
    note: null
  }

  constructor(public cartService: CartService, private promotionService: PromotionService, private messageService: MessageService, private orderService: OrderService, private storageService: StorageService, private userService: UserService,) {

  }
  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    console.log(this.username);
    if (this.storageService.promotionCode != null) {
      this.checkCode(this.storageService.promotionCode);
      this.promotionCode = this.storageService.promotionCode;
    }
    this.getItems();
    this.getUser();
  }

  getTotalPrice(items: any[]){
    this.price.totalPrice = 0;
    this.price.total = 0;
    items.forEach(res =>{
      this.price.totalPrice += res.total;
      this.price.total = this.price.totalPrice;
    })
  }

  getTotalPriceAndPromo(items: any[], promotionPercent: number) {
    this.price.totalPrice = 0;
    this.price.total = 0;
    items.forEach(res =>{
      this.price.totalPrice += res.total;
      // this.total = this.totalPrice;
    })
    this.price.total = this.price.totalPrice * (100-promotionPercent) / 100;
    // this.total = this.totalPrice;
    return {totalPrice: this.price.totalPrice, total: this.price.total};
  }

  getItems() {
    if( this.username != null){
      this.cartService.getItems(this.username).subscribe({
        next: res =>{
          this.items = res;
          this.getTotalPrice(this.items);
          // console.log(this.items);
        },error: err =>{
          console.log(err);
        }
      })
    }
  }

  checkCode(promotionCode: any) {
    this.showDiscount = true;
    this.promotionService.getPromotionByCode(promotionCode).subscribe({
      next: res => {
        this.promotionForm = res;
        this.showSuccess("Thêm mã thành công");
        this.storageService.promotionCode = promotionCode;
        this.addPromotion(this.promotionForm.percent);
      }, error: err => {
        this.showError("Mã của bạn chưa đúng");
        console.log(err);
      }
    })
  }

  addPromotion(percent: number) {
    this.cartService.getItems(this.username).subscribe({
      next: res => {
        this.items = res;
        this.price = this.getTotalPriceAndPromo(this.items, percent);
        // console.log(this.price.total);
        // console.log(this.price.totalPrice);
      }, error: err => {
        console.log(err);
      }
    })
  }

  getUser() {
    this.userService.getUser(this.username).subscribe({
      next: res => {
        this.user = res;
        this.orderForm.firstname = res.firstname;
        this.orderForm.lastname = res.lastname;
        this.orderForm.email = res.email;
        this.orderForm.country = res.country;
        this.orderForm.state = res.state;
        this.orderForm.address = res.address;
        this.orderForm.phone = res.phone;
      }, error: err => {
        console.log(err);
      }
    })
  }

  showDepartmentClick() {
    this.showDepartment = !this.showDepartment;
  }

  placeOrder() {
    this.items.forEach(res => {
      let orderDetail: OrderDetail = new OrderDetail;
      orderDetail.cartId = res.id;
      if(this.promotionForm != undefined){
        orderDetail.promotionCode = this.promotionForm.code;
      }
      else{
        orderDetail.promotionCode = null;
      }
      this.listOrderDetail.push(orderDetail);
    })
    const { address, note } = this.orderForm;
    this.orderService.placeOrder(this.username, address, this.promotionCode, note, this.listOrderDetail).subscribe({
      next: res => {
        this.getItems();
        this.showSuccess("Đặt hàng thành công");
      }, error: err => {
        this.showError(err.message);
      }
    })
    // window.location.reload();
  }

  showSuccess(text: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: text });
  }

  showError(text: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: text });
  }

  showWarn(text: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: text });
  }
}
