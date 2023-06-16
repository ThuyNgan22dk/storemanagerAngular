import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  listProductOrder: any;

  disabled: boolean = true;

  onUpdate: boolean = false;
  showForm: boolean = false;
  showImage: boolean = false;
  showDelete: boolean = false;
  orderId: number;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    this.getListProductOrder();
  }

  getListProductOrder() {
    this.orderService.getListOrderDetail(this.orderId).subscribe({
      next: (res) => {
        this.listProductOrder = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onDelete(id: number, name: string) {
    this.showDelete = true;
  }
}
