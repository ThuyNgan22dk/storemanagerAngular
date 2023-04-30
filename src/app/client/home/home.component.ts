import { Component, OnInit } from '@angular/core';
import { faHeart, faShoppingBag, faInfo } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/_models/category';
import { CartService } from 'src/app/_services/cart.service';
import { CategoryService } from 'src/app/_services/category.service';
import { PhotoService } from 'src/app/_services/photo.service';
import { ProductService } from 'src/app/_services/product.service';
import { WishlistService } from 'src/app/_services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService, PhotoService]

})
export class HomeComponent implements OnInit {
  ratingValue: number;
  images: any[];

  responsiveOptions: any[];

  feature = [
      {
        image: '../../../assets/img/features/f1.png',
        name: 'Free Shipping'
      },
      {
        image: '../../../assets/img/features/f2.png',
        name: 'Online Order'
      },
      {
        image: '../../../assets/img/features/f3.png',
        name: 'Save Money'
      },
      {
        image: '../../../assets/img/features/f4.png',
        name: 'Promotions'
      },
      {
        image: '../../../assets/img/features/f5.png',
        name: 'Happy Sell'
      },
      {
        image: '../../../assets/img/features/f6.png',
        name: 'F24/7 Support'
      }
  ]

  heart = faHeart;
  bag = faShoppingBag;
  retweet = faInfo;

  listProductNewest : any;
  listProductPrice: any;
  id: number = 0;
  listProduct : any;
  listCategory : any;
  check: boolean = true;
  listProductHeart = [];

  showDepartment = true;

  category_items_response= [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
]

constructor(private productService:ProductService,
            private categoryService:CategoryService,
            private cartService: CartService,
            private wishlistService: WishlistService,
            private messageService: MessageService,
            private photoService: PhotoService){}

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
  this.getListProduct();
  this.photoService.getImages().then((images) => {
    this.images = images;
  });
  this.getListProductNewest();
  this.getListCategoryEnabled();
}

getListProductByCategory(id: number){
  this.productService.getListProductByCategory(id).subscribe({
    next: res =>{
      this.listProduct = res;
    },error: err =>{
      console.log(err);
    }
  })
}

addRedHeart(id: number){
  this.check = true;
  let index = 0;
  //delete heart
  while(this.listProductHeart[index] <= this.listProductHeart.length){
    if (this.listProductHeart[index] == id) {
      this.id = id - 1;
      document.getElementsByClassName('heart')[this.id].classList.remove('active');
      this.listProductHeart.splice(index,1);
      this.check = false;
      break;
    }
    index++;
  }
  //add heart
  if (this.check) {
    this.id = id - 1;
    document.getElementsByClassName('heart')[this.id].classList.add('active');
    this.listProductHeart.push(id);
    this.check = true;
  }
}

addRedHeartNew(id: number) {
  this.check = true;
  let index = 0;
  console.log(this.listProductHeart.length);
  //delete heart
  while(this.listProductHeart[index] <= this.listProductHeart.length){
    console.log(this.listProductHeart);
    if (this.listProductHeart[index] == id) {
      this.id = 7-id;
      document.getElementsByClassName('heart')[this.id].classList.remove('active');
      this.listProductHeart.splice(index,1);
      this.check = false;
      break;
    }
    index++;
  }
  //add heart
  if (this.check) {
    this.id = 7 - id;
    document.getElementsByClassName('heart')[this.id].classList.add('active');
    this.listProductHeart.push(id);
    this.check = true;
  }
  console.log('after: ', this.listProductHeart);
}

addActive(id: number){
  if(id == 0){
    this.getListProduct();
  } else {
    this.getListProductByCategory(id);
  }
  document.querySelector('.active')?.classList.remove('active');
  document.getElementsByClassName('categoryId')[id].classList.add('active');
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

getListProductNewest(){
  this.productService.getListProductNewest(8).subscribe({
    next: res =>{
      this.listProductNewest = res;
    },error: err =>{
      console.log(err);
    }
  })
}

getListProduct() {
  this.productService.getListProduct().subscribe({
    next: res =>{
      this.listProduct = res;
    },error: err =>{
      console.log(err);
    }
  })
}

getListProductByPrice(){
  this.productService.getListProductByPrice().subscribe({
    next:res =>{
      this.listProductPrice =res;
    },error: err=>{
      console.log(err);
    }
  })
}

addToCart(item: any){
  this.cartService.getItems();
  this.showSuccess("Add To Cart Successfully!")
  this.cartService.addToCart(item,1);
}

addToWishList(item: any){
  if(!this.wishlistService.productInWishList(item)){
    this.showSuccess("Add To Wishlist Successfully!")
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
