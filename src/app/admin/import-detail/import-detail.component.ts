import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ImportDetail } from 'src/app/_models/import-detail';
import { ImportGood } from 'src/app/_models/import-good';
import { CategoryService } from 'src/app/_services/category.service';
import { ImportService } from 'src/app/_services/import.service';
import { ProductService } from 'src/app/_services/product.service';

interface Unit {
  name: string;
}
@Component({
  selector: 'app-import-detail',
  templateUrl: './import-detail.component.html',
  styleUrls: ['./import-detail.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ImportDetailComponent implements OnInit {
  items: any[];
  selectedProduct: any;
  filteredProducts: any[];
  listProduct: any[];
  listProductImport: any;
  listCategory: any;
  disabled: boolean = true;
  name: string;
  onUpdate: boolean = false;
  showForm: boolean = false;
  showImage: boolean = false;
  showDelete: boolean = false;
  importGId: number;

  importDetailForm: ImportDetail = {
    id: 0,
    name: 'null',
    price: 0,
    quantity: 0,
    expiry: '2024-04-04',
    subTotal: 0,
    importGoodId: 0,
  };

  constructor(
    private messageService: MessageService,
    private importService: ImportService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.importGId = this.route.snapshot.params['id'];
    this.getListProductImport();
    this.getListProduct();
    this.items = [];
    for (let i = 0; i < 10000; i++) {
      this.items.push({ value: 'Item ' + i });
    }
  }

  openNew() {
    this.getListProduct();
    this.onUpdate = false;
    this.showForm = true;
    this.importDetailForm = {
      id: 0,
      name: 'null',
      price: 0,
      quantity: 0,
      expiry: '2024-04-04',
      subTotal: 0,
      importGoodId: this.importGId,
    };
  }

  openUpdate(data: any) {
    this.onUpdate = true;
    this.showForm = true;
    this.importDetailForm.id = data.id;
    this.importDetailForm.name = data.name;
    this.importDetailForm.price = data.price;
    this.importDetailForm.quantity = data.quantity;
    this.importDetailForm.expiry = data.expiry;
    this.importDetailForm.subTotal = data.subTotal;
    this.importDetailForm.importGoodId = this.importGId;
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

  getListProductImport() {
    this.importService.getListImportDetail(this.importGId).subscribe({
      next: (res) => {
        this.listProductImport = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  createProduct() {
    const { price, quantity, expiry, importGoodId } = this.importDetailForm;
    if( price != 0 && quantity != 0){
      this.name = this.selectedProduct.productname;
      var update: boolean = false;
      for (let i = 0; i < this.listProductImport.length; i++) {
        if (this.listProductImport[i].name === this.name) {
          var tempQuantity = this.listProductImport[i].quantity + quantity;
          this.importService
            .updateImportDetail(
              this.listProductImport[i].id,
              this.name,
              price,
              tempQuantity,
              expiry,
              importGoodId
            )
            .subscribe({
              next: (res) => {
                this.getListProductImport();
                this.showForm = false;
                this.showSuccess('Cập nhật thành công');
              },
              error: (err) => {
                this.showError('Cập nhật thất bại');
              },
            });
          update = true;
        }
      }
      if (!update) {
        this.importService
          .createImportDetail(this.name, price, quantity, expiry, importGoodId)
          .subscribe({
            next: (res) => {
              this.getListProductImport();
              this.showForm = false;
              this.showSuccess('Thêm mới thành công');
            },
            error: (err) => {
              this.showError('Thêm mới thất bại');
            },
          });
      
    } else{
      this.showError('Bạn cần nhập đủ thông tin');
      }
    }
  }

  updateProduct() {
    const { id, name, price, quantity, expiry, importGoodId } = this.importDetailForm;
    if(id != 0 && name != '' && price != 0 && quantity != 0){
      this.importService
        .updateImportDetail(id, name, price, quantity, expiry, importGoodId)
        .subscribe({
          next: (res) => {
            this.getListProductImport();
            this.showForm = false;
            this.showSuccess('Cập nhật thành công');
          },
          error: (err) => {
            this.showError('Cập nhật thất bại');
          },
        });
    } else{
      this.showError('Thông tin chưa đủ, bạn cần nhập đủ các mục');
    }
  }

  onDelete(id: number, name: string) {
    this.showDelete = true;
    this.importDetailForm.id = id;
    this.importDetailForm.name = name;
  }

  deleteProduct() {
    console.log(this.importDetailForm.id);
    this.importService.deleteImportDetail(this.importDetailForm.id).subscribe({
      next: (res) => {
        this.getListProductImport();
        this.showWarn('Xóa thành công');
        this.showDelete = false;
      },
      error: (err) => {
        this.showError('Thất bại');
      },
    });
  }

  filterProduct(event) {
    // console.log(this.listProduct);
    // this.getListProduct();
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.listProduct.length; i++) {
      let product = this.listProduct[i];
      if (product.productname.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(product);
      }
    }
    this.filteredProducts = filtered;
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
