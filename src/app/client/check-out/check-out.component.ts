import { Component, OnInit } from '@angular/core';
import { faBars, faHeart, faPhone, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { Order } from 'src/app/_models/order';
import { OrderDetail } from 'src/app/_models/order-detail';

import { CartService } from 'src/app/_services/cart.service';
import { OrderService } from 'src/app/_services/order.service';
import { StorageService } from 'src/app/_services/storage.service';

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
  listOrderDetail: any[] =[];
  username !: string;

  orderForm :any ={
    firstname: null,
    lastname : null,
    country : null,
    addrest : null,
    town : null,
    state : null,
    postCode: null,
    email: null,
    phone: null,
    note: null
  }

  constructor(public cartService: CartService,private orderService:OrderService,private storageService: StorageService){

  }
  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    this.cartService.getItems();
    console.log(this.username);
  }

  showDepartmentClick(){
    this.showDepartment = !this.showDepartment;
  }

  placeOrder(){
    this.cartService.items.forEach(res =>{
      let orderDetail : OrderDetail = new OrderDetail;
      orderDetail.name = res.name;
      orderDetail.price = res.price;
      orderDetail.quantity = res.quantity;
      orderDetail.subTotal = res.subTotal;
      this.listOrderDetail.push(orderDetail);
    })

    const {firstname,lastname,country,address,town,state,postCcode,phone,email,note} = this.orderForm;
    // this.orderService.placeOrder(firstname,lastname,country,address,town,state,postCcode,phone,email,note,this.listOrderDetail,this.username).subscribe({
    //   next: res =>{
    //     this.cartService.clearCart();
    //   },error: err=>{
    //     console.log(err);
    //   }
    // })

  }


}