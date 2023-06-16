import { Component, OnInit } from '@angular/core';
import {
  faBars,
  faHeart,
  faPhone,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { Order } from 'src/app/_models/order';
import { OrderDetail } from 'src/app/_models/order-detail';

import { CartService } from 'src/app/_services/cart.service';
import { OrderService } from 'src/app/_services/order.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
  providers: [MessageService],
})
export class CheckOutComponent implements OnInit {
  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  bars = faBars;
  showDepartment = false;
  order = new Order();
  listOrderDetail: any[] = [];
  username!: string;
  items: any[] = [];
  user: any;
  price = {
    total: 0,
    totalPrice: 0,
  };
  showDiscount = false;
  promotionForm: any;
  checkouted: boolean = false;
  orderForm: any = {
    firstname: null,
    lastname: null,
    country: null,
    addrest: null,
    email: null,
    phone: null,
    note: null,
  };

  constructor(
    public cartService: CartService,
    private messageService: MessageService,
    private orderService: OrderService,
    private storageService: StorageService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    // console.log(this.username);
    this.getItems();
    // this.promotionForm = this.storageService.loadPromotion();
    console.log(this.promotionForm);
    if (this.storageService.promotion != null) {
      this.showDiscount = true;
      this.promotionForm = this.storageService.promotion;
      this.addPromotion(this.promotionForm.percent);
    }
    this.getUser();
  }

  getTotalPrice(items: any[]) {
    this.price.totalPrice = 0;
    this.price.total = 0;
    items.forEach((res) => {
      this.price.totalPrice += res.total;
      this.price.total = this.price.totalPrice;
    });
  }

  getTotalPriceAndPromo(items: any[], promotionPercent: number) {
    this.price.totalPrice = 0;
    this.price.total = 0;
    items.forEach((res) => {
      this.price.totalPrice += res.total;
    });
    this.price.total = (this.price.totalPrice * (100 - promotionPercent)) / 100;
    console.log({ totalPrice: this.price.totalPrice, total: this.price.total });
    return { totalPrice: this.price.totalPrice, total: this.price.total };
  }

  getItems() {
    if (this.username != null) {
      this.cartService.getItems(this.username).subscribe({
        next: (res) => {
          this.items = res;
          this.getTotalPrice(this.items);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  addPromotion(percent: number) {
    this.cartService.getItems(this.username).subscribe({
      next: (res) => {
        this.items = res;
        this.price = this.getTotalPriceAndPromo(this.items, percent);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUser() {
    this.userService.getUser(this.username).subscribe({
      next: (res) => {
        this.user = res;
        this.orderForm.firstname = res.firstname;
        this.orderForm.lastname = res.lastname;
        this.orderForm.email = res.email;
        this.orderForm.country = res.country;
        this.orderForm.address = res.address;
        this.orderForm.phone = res.phone;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showDepartmentClick() {
    this.showDepartment = !this.showDepartment;
  }

  placeOrder() {
    this.items.forEach((res) => {
      let orderDetail: OrderDetail = new OrderDetail();
      orderDetail.cartId = res.id;
      if (this.promotionForm != undefined) {
        orderDetail.promotionCode = this.promotionForm.code;
      } else {
        orderDetail.promotionCode = null;
      }
      this.listOrderDetail.push(orderDetail);
    });
    const { firstname, lastname, phone, country, address, note } = this.orderForm;
    if(firstname === null || lastname === null || phone === null || country === null || address === null ){
      this.showWarn('Quý khách cần nhập đầy đủ thông tin');
    } else{
      this.orderService
        .placeOrder(
          this.username,
          firstname,
          lastname,
          phone,
          country,
          address,
          this.promotionForm.code,
          note,
          this.listOrderDetail
        )
        .subscribe({
          next: (res) => {
            this.getItems();
            this.showSuccess('Đặt hàng thành công');
            this.checkouted = true;
          },
          error: (err) => {
            this.showError("Đặt hàng thất bại");
          },
        });
        // setTimeout(function(){
        //   window.location.reload();
        // }, 10000);
    }
  }

  showSuccess(text: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: text,
    });
  }
  showError(text: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: text,
    });
  }
  showWarn(text: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: text,
    });
  }
}
