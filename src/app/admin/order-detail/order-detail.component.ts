import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetail } from 'src/app/_models/order-detail';
import { OrderService } from 'src/app/_services/order.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  // items: any[];

  // selectedProductname: any;

  // filteredProducts: any[];
  // listProduct: any[];
  listProductOrder: any;
  // listCategory: any;

  disabled : boolean = true;

  // selectedFiles ?: FileList;

  onUpdate : boolean =false;
  showForm : boolean = false;
  showImage: boolean = false;
  showDelete: boolean = false;
  orderId: number;
  // orderDetailForm: any[];

  // orderDetailForm: OrderDetail ={
  //   id: 0,
  //   cartId: number,
  //   promotionCode: string,
  //   order: this.orderId
  // };

  constructor(private orderService: OrderService,
    private productService: ProductService,
    private router: Router,
    private route:ActivatedRoute){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
    this.getListProductOrder();
    // this.getListProduct();
    // this.items = [];
    // for (let i = 0; i < 10000; i++) {
    //     this.items.push({ value: 'Item ' + i });
    // }
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.getListCategoryEnabled();
  }

  // openNew() {
  //   this.onUpdate = false;
  //   this.showForm = true;
  //   this.orderDetailForm = {
  //     id: 0,
  //     cartId: number,
  //     promotionCode: string,
  //     order: this.orderId
  //   }
  // }

  // openUpdate(data : any){
  //     this.onUpdate = true;
  //     this.showForm =true;
      // this.importDetailForm.id = data.id;
      // this.importDetailForm.name = data.name;
      // this.importDetailForm.price = data.price;
      // this.importDetailForm.quantity = data.quantity;
      // this.importDetailForm.expiry = data.expiry;
      // this.importDetailForm.subTotal = data.subTotal;
      // // this.importDetailForm.categoryId = data.category.id;
      // this.importDetailForm.importGoodId = this.importGId;
  // }

  // getListProduct(){
  //   this.productService.getListProduct().subscribe({
  //     next: res =>{
  //       this.listProduct = res;
  //       // console.log(this.listProduct);
  //     },error: err=>{
  //       console.log(err);
  //     }
  //   })
  // }

  getListProductOrder(){
    console.log(this.listProductOrder);
    this.orderService.getListOrderDetail(this.orderId).subscribe({
      next: res =>{
        this.listProductOrder = res;
        console.log(this.listProductOrder);
      },error: err=>{
        console.log(err);
      }
    })
  }

  // getListCategoryEnabled(){
  //   this.categoryService.getListCategoryEnabled().subscribe({
  //     next: res =>{
  //       this.listCategory = res;
  //     },error : err=>{
  //       console.log(err);
  //     }
  //   })
  // }

  // createProduct(){
  //   const {price,quantity,expiry,importGoodId} = this.importDetailForm;
  //   const name = this.selectedProductname.productname;
  //   console.log(this.importDetailForm);
  //   this.importService.createImportDetail(name,price,quantity,expiry,importGoodId).subscribe({
  //     next: res =>{
  //       this.getListProductImport();
  //       this.showForm = false;
  //       this.showSuccess("Thêm mới thành công");
  //     },error: err =>{
  //       this.showError(err.message);
  //     }
  //   })
  // }

  // updateProduct(){
  //   const {id,name,price,quantity,expiry,importGoodId} = this.importDetailForm;
  //   console.log(this.importDetailForm);
  //   this.importService.updateImportDetail(id,name,price,quantity,expiry,importGoodId).subscribe({
  //     next: res =>{
  //       this.getListProductImport();
  //       this.showForm = false;
  //       this.showSuccess("Cập nhật thành công");
  //     },error: err =>{
  //       this.showError(err.message);
  //     }
  //   })
  // }

  onDelete(id: number,name: string){
    // this.importDetailForm.id = null;
    this.showDelete = true;
    // this.importDetailForm.id = id;
    // this.importDetailForm.name = name;
  }

  // deleteProduct(){
  //   this.importService.deleteImportDetail(this.importDetailForm.id).subscribe({
  //     next: res =>{
  //       this.getListProductImport();
  //       this.showWarn("Xóa thành công");
  //       this.showDelete = false;
  //     },error: err =>{
  //       this.showError(err.message);
  //     }
  //   })
  // }
}
