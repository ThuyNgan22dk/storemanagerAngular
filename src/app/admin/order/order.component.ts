import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OrderService } from 'src/app/_services/order.service';
interface state{
  id: number;
  datetime: "";
  state: string;
  checked: boolean;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [MessageService]
})
export class OrderComponent implements OnInit {
  listOrder : any;
  showState : boolean = false;
  checked : boolean = false;
  checkAdd = "Không thành công";
  orderId: number;
  selectedState: any;
  events: any[];
  stateForm: state = {
    id: 0,
    datetime: "",
    state: "",
    checked: false,
    icon: "",
    color: ""
  }
  listStates: state[] = [
    {
      id: 1,
      datetime: "",
      state: "Đơn đã đặt",
      checked: false,
      icon: "pi pi-shopping-cart",
      color: "#9C27B0"
    },
    {
      id: 2,
      datetime: "",
      state: "Đang chuẩn bị",
      checked: false,
      icon: "pi pi-cog",
      color: "#673AB7"
    },
    {
      id: 3,
      datetime: "",
      state: "Đang giao hàng",
      checked: false,
      icon: 'pi pi-shopping-cart',
      color: '#FF9800'
    },
    {
      id: 4,
      datetime: "",
      state: "Giao hàng thành công",
      checked: false,
      icon: 'pi pi-check',
       color: '#607D8B'
    }
  ];

  listStatesForm: any[];

  constructor(private orderService: OrderService, private messageService : MessageService){}

  ngOnInit(): void {
    this.getListOrder();

  }

  update(){
    this.showState = false;
    this.getListOrder();
  }

  getListOrder(){
    this.orderService.getListOrder().subscribe({
      next: res=>{
        this.listOrder = res;
        // console.log(this.listOrder);
      },error: err =>{
        console.log(err);
      }
    })
  }

  comparableState(list: any){
    for(let i=0; i<list.length; i++){
      if(list[i].state === this.listStates[i].state){
        this.listStates[i].datetime = list[i].datetime;
        // console.log( list[i].datetime);
        this.listStates[i].checked = true;
        // this.showSuccess("thực hiện thành công");
      }
    }
  }

  showStates(order: any){
    this.showState = true;
    this.orderId = order.id;
    this.orderService.getListStateByOrderId(this.orderId).subscribe({
      next: res=>{
        this.listStatesForm = res;
        console.log(this.listStatesForm);
        this.comparableState(this.listStatesForm);
      },error: err =>{
        console.log(err);
      }
    })
  }

  setState(numberState: number){
    this.orderService.setOrderState(this.orderId,numberState).subscribe({
      next: res=>{
        this.listStatesForm = res;
        this.comparableState(this.listStatesForm);
      },error: err =>{
        console.log(err);
      }
    })
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

  showSuccess(text: string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: text});
  }

  showError(text: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: text});
  }

  showWarn(text : string) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
  }
}
