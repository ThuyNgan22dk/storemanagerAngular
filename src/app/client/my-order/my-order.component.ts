import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/_services/order.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  listOrder:any;
  listProductOrder: any;
  username: any;
  orderId: any;
  user: any;
  constructor(private orderService: OrderService,private userService: UserService,private storageService: StorageService){}

  ngOnInit(): void {
    this.username = this.storageService.getUser().username;
    this.getListOrder();
    this.getUser();
  }

  getSeverity (order: any) {
    switch (order.stating) {
      case 'Đơn đã đặt':
        return 'info';
      case 'Đang chuẩn bị':
        return 'warning';
      case 'Đang giao hàng':
        return 'warning';
      case 'Giao hàng thành công':
        return 'success';
      default:// đặt hàng không thành công
        return 'danger';
    }
  }

  getUser(){
    this.userService.getUser(this.username).subscribe({
      next: res=>{
        this.user = res;
      },error : err =>{
        console.log(err);
      }
    })
  }

  getListOrder(){
    this.orderService.getListOrderByUser(this.username).subscribe({
      next: res=>{
        this.listOrder = res;
        // console.log(this.listOrder);
      },error: err =>{
        console.log(err);
      }
    })
  }

  getListProductOrder(id: any){
    this.orderId = id;
    this.orderService.getListOrderDetail(this.orderId).subscribe({
      next: res =>{
        this.listProductOrder = res;
        // console.log(this.listProductOrder);
      },error: err=>{
        console.log(err);
      }
    })
  }

}
