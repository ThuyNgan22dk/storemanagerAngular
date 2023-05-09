import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faBars, faHeart, faPhone, faRetweet, faShoppingBag, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
import { StorageService } from 'src/app/_services/storage.service';
import { WishlistService } from 'src/app/_services/wishlist.service';

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

  id: number = 0;
  product : any;
  listRelatedProduct: any[] =[];
  items: any[] = [];
  quantity : number = 1;

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              public cartService: CartService,
              public storageService:StorageService,
              public wishlistService: WishlistService,
              private messageService: MessageService
              ){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }
  ngOnInit(): void {
    // this.storageService.currentUser.subscribe(username => this.username = username);
    this.username = this.storageService.loadUsername();
    // console.log(this.username);
    this.id = this.route.snapshot.params['id'];
    this.getProduct();
  }

  showDepartmentClick(){
    this.showDepartment = !this.showDepartment;
  }


  getProduct(){
    this.productService.getProdct(this.id).subscribe({
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
    // this.cartService.getItems(this.username);
    // this.showSuccess("Add To Cart Successfully!")
    console.log(item.productname);
    this.cartService.addToCart(this.username, item.productname, 1).subscribe({
      next: res =>{
        this.getItems();
        // this.showForm = false;
        this.showSuccess("Thêm mới thành công");
      },error: err =>{
        this.showError(err.message);
      }
    });

  }
  getItems(){
    this.cartService.getItems(this.username).subscribe({
      next: res =>{
        this.items = res;
        console.log(this.items);
      },error: err =>{
        console.log(err);
      }
    })
  }

  addCart(item:any){
    this.cartService.getItems(this.username);
    /* can fix */
    // this.cartService.addToCart(item,this.quantity);
    this.showSuccess("Add To Cart Successfully!");
  }

  addToWishList(item: any){
    if(!this.wishlistService.productInWishList(item)){
      this.wishlistService.addToWishList(item);
      this.showSuccess("Add To Wishlist Successfully!")
    }
  }

  plusQuantity(){
    this.quantity += 1;
  }
  subtractQuantity(){
    if(this.quantity > 1){
      this.quantity -= 1;
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
