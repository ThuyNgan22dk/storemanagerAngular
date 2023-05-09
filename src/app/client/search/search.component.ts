import { Component, Input, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { faHeart, faRetweet, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_services/cart.service';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';
import { StorageService } from 'src/app/_services/storage.service';
import { WishlistService } from 'src/app/_services/wishlist.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [MessageService]

})
export class SearchComponent implements OnInit {
  @Input() keywords: any;
  layout: string = 'grid';

  heart = faHeart;
  bag = faShoppingBag;
  retweet = faRetweet;

  username: string;
  keyword: any;
  listProduct: any;
  listProductNewest: any;
  listCategory: any;
  items: any[] = [];
  rangeValues = [0,100];

  constructor(
    private router: Router,
    private categoryService:CategoryService,
    private route:ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    public storageService:StorageService,
    private messageService:MessageService,
    private wishlistService:WishlistService){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    // this.storageService.currentUser.subscribe(username => this.username = username);
    // console.log(this.username);
    this.username = this.storageService.loadUsername();
    console.log(this.route.snapshot.params['keyword']);
    this.keyword = this.route.snapshot.params['keyword'];
    // console.log(this.keyword);
    // this.keyword = this.keywords;
    this.getListProduct();
    this.getListCategoryEnabled();
    this.getNewestProduct();
  }

  getListProductByCategoryId(id: number){
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

  getListProductByPriceRange(){
    this.productService.getListByPriceRange(0,this.rangeValues[0],this.rangeValues[1]).subscribe({
      next: res =>{
        this.listProduct = res;
        // console.log(this.listProduct);
      },error: err =>{
        console.log(err);
      }
    })
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

  getListProduct(){
    // console.log(this.keyword);
    this.productService.searchProduct(this.keyword).subscribe({
      next: res =>{
        this.listProduct = res;
        console.log(this.listProduct);
      },error: err =>{
        console.log(err);
      }
    })
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
