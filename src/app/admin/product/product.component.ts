import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from 'src/app/_models/product';
import { CategoryService } from 'src/app/_services/category.service';
import { ImageService } from 'src/app/_services/image.service';
import { ProductService } from 'src/app/_services/product.service';

interface Unit {
  name: string;
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ProductComponent implements OnInit {
  listProduct: any;
  listCategory: any;
  listImage: any;
  disabled: boolean = true;
  selectedFiles?: FileList;
  currentFile?: File;
  listImageChoosen: any = [];
  imageChoosen: any;
  onUpdate: boolean = false;
  showForm: boolean = false;
  showImage: boolean = false;
  showDelete: boolean = false;
  productForm: Product = {
    id: 0,
    productname: 'null',
    description: 'null',
    origin: 'null',
    unit: 'null',
    price: 0,
    rate: 5,
    inventoryStatus: 'INSTOCK',
    quantity: 1,
    categoryId: 1,
    imageIds: [],
    commentIds: [],
  };

  constructor(
    private messageService: MessageService,
    private productService: ProductService,
    private imageService: ImageService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getListProduct();
    this.getListCategoryEnabled();
    this.getListImage();
  }

  openNew() {
    this.onUpdate = false;
    this.showForm = true;
    this.listImageChoosen = [];
    this.productForm = {
      id: 0,
      productname: '',
      description: '',
      origin: 'Việt Nam',
      unit: 'Thùng',
      price: 0,
      rate: 5,
      inventoryStatus: '',
      quantity: 1,
      categoryId: 1,
      imageIds: [],
      commentIds: [],
    };
  }

  getSeverity(product: any) {
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

  openUpdate(data: any) {
    this.listImageChoosen = [];
    this.onUpdate = true;
    this.showForm = true;
    this.productForm.id = data.id;
    this.productForm.productname = data.productname;
    this.productForm.description = data.description;
    this.productForm.origin = data.origin;
    this.productForm.unit = data.unit;
    this.productForm.price = data.price;
    this.productForm.rate = data.rate;
    this.productForm.inventoryStatus = data.inventoryStatus;
    this.productForm.quantity = data.quantity;
    this.productForm.categoryId = data.category.id;
    data.images.forEach((res: any) => {
      this.listImageChoosen.push(res);
    });
  }

  onChooseImage() {
    this.showImage = true;
    this.disabled = true;
    let data = document.querySelectorAll('.list-image img');
    data.forEach((i) => {
      i.classList.remove('choosen');
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

  getListImage() {
    this.imageService.getListByUsername('admin').subscribe({
      next: (res) => {
        this.listImage = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  uploadFile(event: any) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.imageService.upload(this.currentFile).subscribe({
          next: (res) => {
            this.currentFile = undefined;
            this.getListImage();
          },
          error: (err) => { },
        });
      }
      this.currentFile = undefined;
    }
  }

  createProduct() {
    let data = this.listImageChoosen;
    data.forEach((res: any) => {
      this.productForm.imageIds.push(res.id);
    });
    // console.log(this.productForm.imageIds.length);
    const {
      productname,
      description,
      origin,
      unit,
      price,
      categoryId,
      imageIds,
    } = this.productForm;
    if(productname != '' && description != '' && imageIds.length != 0 && categoryId != 1 && unit != null && price != null && origin != null && unit != null){
      this.productService
        .createProduct(
          productname,
          description,
          origin,
          unit,
          price,
          categoryId,
          imageIds
        )
        .subscribe({
          next: (res) => {
            this.getListProduct();
            this.showForm = false;
            this.showSuccess('Thêm mới thành công');
          },
          error: (err) => {
            this.showError('Thêm mới thất bại');
          },
        });
    } else{
      this.showError('Thông tin chưa đầy đủ, bạn cần nhập thêm');
    }
  }

  updateProduct() {
    let data = this.listImageChoosen;
    data.forEach((res: any) => {
      this.productForm.imageIds.push(res.id);
    });
    const {
      id,
      productname,
      description,
      origin,
      unit,
      price,
      categoryId,
      imageIds,
    } = this.productForm;
    if(productname != '' && description != '' && imageIds.length != 0 && categoryId != 1 && unit != null && price != null && origin != null && unit != null){
      this.productService
        .updateProduct(
          id,
          productname,
          description,
          origin,
          unit,
          price,
          categoryId,
          imageIds
        )
        .subscribe({
          next: (res) => {
            this.getListProduct();
            this.showForm = false;
            this.showSuccess('Thêm mới thành công');
          },
          error: (err) => {
            this.showError('Thêm mới thất bại');
          },
        });
    } else{
      this.showError('Thông tin chưa đầy đủ, bạn cần nhập thêm');
    }
  }

  onDelete(id: number, productname: string) {
    this.showDelete = true;
    this.productForm.id = id;
    this.productForm.productname = productname;
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productForm.id).subscribe({
      next: (res) => {
        this.getListProduct();
        this.showWarn('Xóa thành công');
        this.showDelete = false;
      },
      error: (err) => {
        this.showError('Thất bại');
      },
    });
  }

  chooseImage() {
    this.listImageChoosen.push(this.imageChoosen);
    this.showImage = false;
  }

  deleteImage(i: number) {
    this.listImageChoosen.splice(i, 1);
    this.productForm.imageIds.splice(i, 1);
  }

  selectImage(event: any, res: any) {
    let data = document.querySelectorAll('.list-image img');
    data.forEach((i) => {
      i.classList.remove('choosen');
    });
    event.target.classList.toggle('choosen');
    this.imageChoosen = res;
    this.disabled = false;
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
