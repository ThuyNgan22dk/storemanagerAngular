import { Component, OnInit } from '@angular/core';
import {
  faHeart,
  faShoppingBag,
  faInfo,
} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_services/cart.service';
import { CategoryService } from 'src/app/_services/category.service';
import { PhotoService } from 'src/app/_services/photo.service';
import { ProductService } from 'src/app/_services/product.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService, PhotoService],
})
export class HomeComponent implements OnInit {
  images: any[];
  responsiveOptions: any[];
  feature = [
    {
      image: '../../../assets/img/features/f1.png',
      name: 'Free Shipping',
    },
    {
      image: '../../../assets/img/features/f2.png',
      name: 'Online Order',
    },
    {
      image: '../../../assets/img/features/f3.png',
      name: 'Save Money',
    },
    {
      image: '../../../assets/img/features/f4.png',
      name: 'Promotions',
    },
    {
      image: '../../../assets/img/features/f5.png',
      name: 'Happy Sell',
    },
    {
      image: '../../../assets/img/features/f6.png',
      name: 'F24/7 Support',
    },
  ];
  heart = faHeart;
  bag = faShoppingBag;
  retweet = faInfo;
  username: string;
  listProductNewest: any;
  id: number = 0;
  listProduct: any;
  listCategory: any;
  listProductHeart = [];
  items: any[] = [];
  addOrChange: boolean;
  showDepartment = true;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private storageService: StorageService,
    private messageService: MessageService,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 4,
        numScroll: 4,
      },
      {
        breakpoint: '991px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '540px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    this.photoService.getImages().then((images) => {
      this.images = images;
    });
    this.username = this.storageService.loadUsername();
    this.getItems();
    this.getListProductForUser();
    this.getListProductNewest();
    this.getListCategoryEnabled();
  }

  getListCategoryEnabled() {
    this.categoryService.getListCategoryEnabled().subscribe({
      next: (res) => {
        this.listCategory = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getListProductNewest() {
    this.productService.getListProductNewest(8).subscribe({
      next: (res) => {
        this.listProductNewest = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getListProductForUser() {
    this.productService.getListProductForUser().subscribe({
      next: (res) => {
        this.listProduct = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getListProduct() {
    this.productService.getListProduct().subscribe({
      next: (res) => {
        this.listProduct = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(item: any) {
    this.addOrChange = true; //true -> add, false -> change
    if (this.items != null) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].name === item.productname) {
          this.addOrChange = false;
          var quantity = Number(this.items[i].quantity) + 1;
          console.log('cập nhật');
          if (quantity <= item.quantity) {
            this.cartService
              .productAvailableOnCart(
                this.username,
                item.productname,
                this.items[i].quantity,
                1
              )
              .subscribe({
                next: (res) => {
                  this.getItems();
                  this.showSuccess('Cập nhật thành công');
                },
                error: (err) => {
                  this.showError(err.message);
                },
              });
          } else {
            this.showError(
              'Lỗi số lượng! Yêu cầu bạn không nhập giá trị lớn hơn lượng tồn kho.'
            );
          }
        }
      }
      if (this.addOrChange) {
        console.log('thêm mới');
        this.cartService
          .addToCart(this.username, item.productname, 1)
          .subscribe({
            next: (res) => {
              this.getItems();
              this.showSuccess('Thêm mới thành công');
            },
            error: (err) => {
              // this.showError(err.message);
              this.showWarn('Mời bạn đăng nhập để thêm sản phẩm vào giở hàng');
            },
          });
      }
      // window.location.reload();
    } 
    if(this.username != null){
      window.location.reload();
    } else{
      this.showWarn('Mời bạn đăng nhập để thêm sản phẩm vào giở hàng');
    }
  }

  getItems() {
    if (this.username != null) {
      this.cartService.getItems(this.username).subscribe({
        next: (res) => {
          this.items = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  showSuccess(text: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: text,
    });
  }
  showError(text: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: text,
    });
  }
  showWarn(text: string) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warn',
      detail: text,
    });
  }
}
