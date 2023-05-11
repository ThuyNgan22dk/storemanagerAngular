import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHeart, faRetweet, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { MessageService, SelectItem } from 'primeng/api';
import { CartService } from 'src/app/_services/cart.service';
import { StorageService } from "src/app/_services/storage.service";
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';
import { WishlistService } from 'src/app/_services/wishlist.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers: [MessageService]

})
export class ShopComponent implements OnInit {
  username: string;
  keywords: string;
  layout: string = 'grid';

  heart = faHeart;
  bag = faShoppingBag;
  retweet = faRetweet;

  id: number = 0;
  listProduct : any;
  listCategory : any;
  listProductNewest : any[] = [];
  items: any[] = [];
  showSearch: boolean = false;

  rangeValues = [0,100];

  constructor(
    private categoryService:CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public cartService:CartService,
    public storageService:StorageService,
    public messageService: MessageService,
    public wishlistService:WishlistService){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit(): void {
    // this.storageService.currentUser.subscribe(username => this.username = username);
    this.username = this.storageService.loadUsername();
    // console.log(this.username);
    this.showSearch = false;
    this.getListCategoryEnabled();
    this.getNewestProduct();
    console.log(this.route.snapshot.params);
    if(this.route.snapshot.params['id'] != undefined){
      this.id = this.route.snapshot.params['id'];
      this.getListProductByCategory();
    } else{
      // console.log(this.route.snapshot.params);
      this.keywords = this.route.snapshot.params['keyword'];
      this.showSearch = true;
    }

  }

  getSeverity (product) {
      switch (product.inventoryStatus) {
          case 'INSTOCK':
              return 'success';

          case 'LOWSTOCK':
              return 'warning';

          case 'OUTOFSTOCK':
              return 'danger';

          default:
              return null;
      }
  };

  getListProductByCategory(){
    this.showSearch = false;
    if(this.id == 0){
      this.productService.getListProduct().subscribe({
        next: res =>{
          this.listProduct = res;
        },error: err =>{
          console.log(err);
        }
      })
    } else{
      this.productService.getListProductByCategory(this.id).subscribe({
        next: res =>{
          this.listProduct = res;
        },error: err =>{
          console.log(err);
        }
      })
    }
  }

  getListProductByCategoryId(id: number){
    this.showSearch = false;
    if(id == 0){
      this.productService.getListProduct().subscribe({
        next: res =>{
          this.listProduct = res;
        },error: err =>{
          console.log(err);
        }
      })
    } else{
      this.productService.getListProductByCategory(id).subscribe({
        next: res =>{
          this.listProduct = res;
        },error: err =>{
          console.log(err);
        }
      })
    }
  }

  getListCategoryEnabled(){
    this.categoryService.getListCategoryEnabled().subscribe({
      next: res =>{
        this.listCategory = res;
      },error: err=>{
        console.log(err);
      }
    })
  }

  getNewestProduct(){
    this.productService.getListProductNewest(4).subscribe({
      next:res =>{
        this.listProductNewest = res;
      },error: err =>{
        console.log(err);
      }
    })
  }

  getListProductByPriceRange(){
    this.showSearch = false;
    this.productService.getListByPriceRange(this.id,this.rangeValues[0],this.rangeValues[1]).subscribe({
      next: res =>{
        this.listProduct = res;
        console.log(this.listProduct);
      },error: err =>{
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

  addToWishList(item: any){
    if(!this.wishlistService.productInWishList(item)){
      this.wishlistService.addToWishList(item);
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
