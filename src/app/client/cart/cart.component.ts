import { Component, OnInit } from '@angular/core';
import {
  faBars,
  faHeart,
  faPhone,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { CartService } from 'src/app/_services/cart.service';
import { ProductService } from 'src/app/_services/product.service';
import { PromotionService } from 'src/app/_services/promotion.service';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  username: string;
  items: any;
  promotionCode: any;
  price = {
    total: 0,
    totalPrice: 0,
  };
  listProduct: any[];
  heart = faHeart;
  bag = faShoppingBag;
  phone = faPhone;
  bars = faBars;
  showDepartment = false;
  selectedProducts: any;
  promotionForm: any;
  showDiscount = false;
  promotion:any;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private storageService: StorageService,
    private messageService: MessageService,
    private promotionService: PromotionService
  ) {}

  ngOnInit(): void {
    this.username = this.storageService.loadUsername();
    // this.promotionForm = this.storageService.loadPromotion();
    this.showPromotionEnabled();
    this.getItems();
    // this.getProducts();
  }

  showPromotionEnabled(){
    this.promotionService.getListPromotionEnabled().subscribe({
      next: (res) => {
        this.promotion = res;
        // console.log(this.promotion);
      },
      error: (err) => {
        this.showError('lỗi mã giảm giá');
      },
    });
  }

  showDepartmentClick() {
    this.showDepartment = !this.showDepartment;
  }

  // getProducts() {
  //   this.productService.getListProduct().subscribe({
  //     next: (res) => {
  //       this.listProduct = res;
  //       console.log(this.listProduct);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  getTotalPrice(items: any[]) {
    this.price.totalPrice = 0;
    this.price.total = 0;
    items.forEach((res) => {
      this.price.totalPrice += res.total;
      this.price.total = this.price.totalPrice;
    });
  }

  getTotalPriceAndPromo(items: any[], promotionPercent: number) {
    this.price.totalPrice = 0;
    this.price.total = 0;
    items.forEach((res) => {
      this.price.totalPrice += res.total;
    });
    this.price.total = (this.price.totalPrice * (100 - promotionPercent)) / 100;
    return { totalPrice: this.price.totalPrice, total: this.price.total };
  }

  getItems() {
    if (this.username != null) {
      this.cartService.getItems(this.username).subscribe({
        next: (res) => {
          this.items = res;
          // console.log(this.items);
          this.getTotalPrice(this.items);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  removeFromCart(item: any) {
    this.cartService.deleteProduct(item.id, this.username).subscribe({
      next: (res) => {
        this.getItems();
        this.showWarn('Xóa thành công');
      },
      error: (err) => {
        this.showError(err.message);
      },
    });
  }

  updateQuantity(item: any, event: any) {
    let quantity: number = event.target.value;
    if (quantity >= 0) {
      for (let i = 0; i < this.listProduct.length; i++) {
        if (this.listProduct[i].productname === item.name) {
          console.log('cập nhật');
          if (quantity <= this.listProduct[i].quantity) {
            this.cartService.updateProduct(item.id, quantity).subscribe({
              next: (res) => {
                this.getItems();
                this.showSuccess('Cập nhật thành công');
              },
              error: (err) => {
                console.log(err);
              },
            });
          } else {
            this.showError(
              'Lỗi số lượng! Giá trị bạn nhập lớn hơn giá trị có trong kho hàng'
            );
          }
        }
      }
    } else {
      this.showError('Lỗi số lượng! Yêu cầu bạn không nhập giá trị âm.');
    }
  }

  plusQuantity(item: any) {
    let quantity = Number(item.quantity) + 1;
    for (let i = 0; i < this.listProduct.length; i++) {
      if (this.listProduct[i].productname === item.name) {
        console.log('cập nhật');
        if (quantity <= this.listProduct[i].quantity) {
          this.cartService.updateProduct(item.id, quantity).subscribe({
            next: (res) => {
              this.getItems();
              this.showSuccess('Cập nhật thành công');
            },
            error: (err) => {
              console.log(err);
            },
          });
        } else {
          this.showError(
            'Lỗi số lượng! Giá trị bạn nhập lớn hơn giá trị có trong kho hàng'
          );
        }
      }
    }
  }

  subtractQuantity(item: any) {
    if (item.quantity > 1) {
      let quantity = Number(item.quantity);
      this.cartService.updateProduct(item.id, (quantity -= 1)).subscribe({
        next: (res) => {
          this.getItems();
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.showError('Lỗi số lượng! Không nhận giá trị bé hơn hoặc bằng 0.');
    }
  }

  checkCode(promotionCode: any) {
    this.promotionService.getPromotionByCode(promotionCode).subscribe({
      next: (res) => {
        this.promotionForm = res;
        if (this.promotionForm == null) {
          this.showDiscount = false;
          this.showError('Mã của bạn chưa đúng hoặc mã đã hết lượt');
        } else {
          this.showDiscount = true;
          this.showSuccess('Thêm mã thành công');
          // this.storageService.changePromotion(this.promotionForm);
          this.storageService.promotion.code = this.promotionForm.code;
          this.storageService.promotion.percent = this.promotionForm.percent;
          this.addPromotion(this.promotionForm.percent);
          console.log(this.storageService.promotion.percent);
          console.log(this.storageService.promotion.code);          
        }
      },
      error: (err) => {
        this.showError('Mã của bạn chưa đúng');
        console.log(err);
      },
    });
  }

  addPromotion(percent: number) {
    this.cartService.getItems(this.username).subscribe({
      next: (res) => {
        this.items = res;
        this.getTotalPriceAndPromo(this.items, percent);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
