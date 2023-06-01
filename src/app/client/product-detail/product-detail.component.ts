import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBars, faHeart, faPhone, faRetweet, faShoppingBag, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [MessageService]

})
export class ProductDetailComponent implements OnInit {
  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  bars = faBars;
  star = faStar;
  star_half = faStarHalf;
  retweet = faRetweet;

  username: string;
  showDepartment = false;
  layout: string = 'grid';
  responsiveOptions: any[];

  id: number = 0;
  product : any;
  listRelatedProduct: any[] =[];
  items: any[] = [];
  quantity : number = 1;
  addOrChange: boolean;

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              public cartService: CartService,
              public storageService:StorageService,
              private messageService: MessageService
              ){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }
  ngOnInit(): void {
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
    ];
    this.username = this.storageService.loadUsername();
    this.id = this.route.snapshot.params['id'];
    this.getProduct();
  }

  showDepartmentClick(){
    this.showDepartment = !this.showDepartment;
  }

  getProduct(){
    this.productService.getProduct(this.id).subscribe({
      next: res =>{
        this.product = res;
        this.getListRelatedProduct();
      },error: err=>{
        console.log(err);
      }
    })
  }

  getListRelatedProduct(){
    this.productService.getListRelatedProduct(this.product.category.id).subscribe({
      next: res =>{
        this.listRelatedProduct= res;
      },error: err=>{
        console.log(err);
      }
    })
  }

  addToCart(item: any){
    this.addOrChange = true;//true -> add, false -> change
    if (this.quantity < 0) {
      this.showError("Lỗi số lượng! Yêu cầu bạn không nhập giá trị âm.");
    } else if (this.items != null){
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].name === item.productname) {
          this.addOrChange = false;
          var quantity = Number(this.items[i].quantity) + Number(this.quantity);
          if(quantity <= item.quantity) {
            this.cartService.productAvailableOnCart(this.username, item.productname, this.items[i].quantity, this.quantity).subscribe({
              next: res =>{
                console.log(res);
                this.getItems();
                this.showSuccess("Cập nhật thành công");
              },error: err =>{
                this.showError(err.message);
              }
            })
          } else{
            this.showError("Lỗi số lượng! Yêu cầu bạn không nhập giá trị lớn hơn lượng tồn kho.");
          }
        }
      }
      if (this.addOrChange) {
        this.cartService.addToCart(this.username, item.productname, 1).subscribe({
          next: res =>{
            this.getItems();
            this.showSuccess("Thêm mới thành công");
          },error: err =>{
            this.showError(err.message);
          }
        })
      }
      window.location.reload();
    } else{
      this.showWarn("Mời bạn đăng nhập để thêm sản phẩm vào giở hàng");
    }
  }

  getItems(){
    if( this.username != null){
      this.cartService.getItems(this.username).subscribe({
        next: res =>{
          this.items = res;
          // this.cartService.getTotalPrice(this.items);
          // console.log(this.items);
        },error: err =>{
          console.log(err);
        }
      })
    }
  }

  updateQuantity(item: any,event: any){
    this.quantity = ( event.target.value);
    if (this.quantity < 0) {
      this.showError("Lỗi số lượng! Yêu cầu bạn không nhập giá trị âm.");
    }
    else if(this.quantity > item.quantity){
      this.showError("Lỗi số lượng! Yêu cầu bạn không nhập giá trị lớn hơn lượng tồn kho.");
    }
  }

  plusQuantity(item: any){
    if(this.quantity > item.quantity)
      this.showError("Lỗi số lượng! Yêu cầu bạn không nhập giá trị lớn hơn lượng tồn kho.");
    else
      this.quantity += 1;
  }

  subtractQuantity(){
    if(this.quantity > 1){
      this.quantity -= 1;
    } else{
      this.showError("Lỗi số lượng! Yêu cầu bạn không nhập giá trị âm.");
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
