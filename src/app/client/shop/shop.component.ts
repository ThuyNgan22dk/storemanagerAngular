import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faHeart,
  faRetweet,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_services/cart.service';
import { StorageService } from 'src/app/_services/storage.service';
import { CategoryService } from 'src/app/_services/category.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  providers: [MessageService],
})
export class ShopComponent implements OnInit {
  username: string;
  keywords: string;
  layout: string = 'grid';
  heart = faHeart;
  bag = faShoppingBag;
  retweet = faRetweet;
  id: number = 0;
  listProduct: any;
  listCategory: any;
  listProductNewest: any[] = [];
  items: any[] = [];
  addOrChange: boolean;
  showSearch: boolean = false;
  rangeValues = [0, 100000];
  listSort = [
    { id: 1, name:'Phổ biến'},
    { id: 2, name: 'Giá thấp đến cao' },
    { id: 3, name: 'Giá cao đến thấp' },
  ];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public cartService: CartService,
    public storageService: StorageService,
    public messageService: MessageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.username = this.storageService.loadUsername();
    this.showSearch = false;
    if (this.route.snapshot.params['id'] != undefined) {
      this.id = this.route.snapshot.params['id'];
      // this.getListProductByCategoryId(this.id);
      if(this.username != null){
        this.getListProductSuggest(this.username);
      } else {
        this.getListSuggestNoUser();
      }
    } else {
      this.keywords = this.route.snapshot.params['keyword'];
      this.showSearch = true;
    }
    this.getListCategoryEnabled();
    this.getNewestProduct();
    this.getItems();
  }

  getSeverity(product) {
    switch (product.inventoryStatus) {
      case 'Sẵn có':
        return 'success';
      case 'Còn ít':
        return 'warning';
      case 'Hết hàng':
        return 'danger';
      default:
        return 'info';
    }
  }

  getListProductByCategory() {
    this.showSearch = false;
    if (this.id == 0) {
      this.productService.getListProduct().subscribe({
        next: (res) => {
          this.showWarn('Xin lỗi bạn vì dữ liệu hiển thị hơi lâu!');
          this.listProduct = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.productService.getListProductByCategory(this.id).subscribe({
        next: (res) => {
          this.showWarn('Xin lỗi bạn vì dữ liệu hiển thị hơi lâu!');
          this.listProduct = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  getListProductByCategoryId(id: number) {
    this.showSearch = false;
    if (id == 0) {
      this.productService.getListProduct().subscribe({
        next: (res) => {
          this.showWarn('Xin lỗi bạn vì dữ liệu hiển thị hơi lâu!');
          this.listProduct = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.productService.getListProductByCategory(id).subscribe({
        next: (res) => {
          this.showWarn('Xin lỗi bạn vì dữ liệu hiển thị hơi lâu!');
          this.listProduct = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  getListSortAsc() {
    this.productService.getListProductSortAsc().subscribe({
      next: (res) => {
        this.listProduct = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getListSortDesc() {
    this.productService.getListProductSortDesc().subscribe({
      next: (res) => {
        this.listProduct = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getListSuggestNoUser(){
    this.productService.getListSuggest().subscribe({
      next: (res) => {
        this.listProduct = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addActive(id: number) {
    if (id == 0){
      if(this.username != null){
        this.getListProductSuggest(this.username);
      } else {
        this.getListSuggestNoUser();
      }
    }
    if (id == 1) {
      this.getListProductByCategory();
    }
    if (id == 2) {
      this.getListSortAsc();
    }
    if (id == 3) {
      this.getListSortDesc();
    }
    document.querySelector('.active')?.classList.remove('active');
    document.getElementsByClassName('sort-item')[id].classList.add('active');
  }

  getListProductSuggest(username: string){
    this.productService.getListProductSuggest(username).subscribe({
      next: (res) => {
        this.showWarn('Xin lỗi bạn vì dữ liệu hiển thị hơi lâu!');
        this.listProduct = res;
      },
      error: (err) => {
        console.log(err);
      },
    })
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

  getNewestProduct() {
    this.productService.getListProductNewest(4).subscribe({
      next: (res) => {
        this.listProductNewest = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getListProductByPriceRange() {
    this.showSearch = false;
    this.productService
      .getListByPriceRange(this.id, this.rangeValues[0], this.rangeValues[1])
      .subscribe({
        next: (res) => {
          this.showWarn('Xin lỗi bạn vì dữ liệu hiển thị hơi lâu!');
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
    if (this.username != null) {
      window.location.reload();
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
