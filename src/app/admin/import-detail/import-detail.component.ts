import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ImportDetail } from 'src/app/_models/import-detail';
import { ImportGood } from 'src/app/_models/import-good';
import { CategoryService } from 'src/app/_services/category.service';
import { ImportService } from 'src/app/_services/import.service';
import { ProductService } from 'src/app/_services/product.service';

interface Unit{
  name: string;
}
@Component({
  selector: 'app-import-detail',
  templateUrl: './import-detail.component.html',
  styleUrls: ['./import-detail.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class ImportDetailComponent implements OnInit {
  // @Input() importGood: ImportGood;
  // @Input('id') ig_id: number;
  // @Input('subTotal') total: number;
  // countries: any[];

  items: any[];

  selectedProductname: any;

  filteredProducts: any[];
  listProduct: any[];
  listProductImport: any;
  listCategory: any;

  disabled : boolean = true;

  // selectedFiles ?: FileList;

  onUpdate : boolean =false;
  showForm : boolean = false;
  showImage: boolean = false;
  showDelete: boolean = false;
  importGId: number;


  importDetailForm: ImportDetail ={
    id: 0,
    name : "null",
    price: 0,
    quantity: 0,
    expiry: "2024-04-04",
    subTotal: 0,
    // categoryId: 0,
    importGoodId: 0
  };

  constructor(private messageService: MessageService,
    private importService: ImportService,
    // private categoryService:CategoryService,
    private productService: ProductService,
    private router: Router,
    private route:ActivatedRoute){
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
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.getListCategoryEnabled();
  }

  openNew() {
    this.onUpdate = false;
    this.showForm = true;
    this.importDetailForm ={
      id: 0,
      name : "null",
      price: 0,
      quantity: 0,
      expiry: "2024-04-04",
      subTotal: 0,
      // categoryId: 1,
      importGoodId: this.importGId
    }
  }

  openUpdate(data : any){
      this.onUpdate = true;
      this.showForm =true;
      this.importDetailForm.id = data.id;
      this.importDetailForm.name = data.name;
      this.importDetailForm.price = data.price;
      this.importDetailForm.quantity = data.quantity;
      this.importDetailForm.expiry = data.expiry;
      this.importDetailForm.subTotal = data.subTotal;
      // this.importDetailForm.categoryId = data.category.id;
      this.importDetailForm.importGoodId = this.importGId;
  }

  getListProduct(){
    this.productService.getListProduct().subscribe({
      next: res =>{
        this.listProduct = res;
        // console.log(this.listProduct);
      },error: err=>{
        console.log(err);
      }
    })
  }

  getListProductImport(){
    this.importService.getListImportDetail(this.importGId).subscribe({
      next: res =>{
        this.listProductImport = res;
        // console.log(this.listProductImport);
      },error: err=>{
        console.log(err);
      }
    })
  }

  // getListCategoryEnabled(){
  //   this.categoryService.getListCategoryEnabled().subscribe({
  //     next: res =>{
  //       this.listCategory = res;
  //     },error : err=>{
  //       console.log(err);
  //     }
  //   })
  // }

  createProduct(){
    const {price,quantity,expiry,importGoodId} = this.importDetailForm;
    const name = this.selectedProductname.productname;
    console.log(this.importDetailForm);
    this.importService.createImportDetail(name,price,quantity,expiry,importGoodId).subscribe({
      next: res =>{
        this.getListProductImport();
        this.showForm = false;
        this.showSuccess("Thêm mới thành công");
      },error: err =>{
        this.showError(err.message);
      }
    })
  }

  updateProduct(){
    const {id,name,price,quantity,expiry,importGoodId} = this.importDetailForm;
    console.log(this.importDetailForm);
    this.importService.updateImportDetail(id,name,price,quantity,expiry,importGoodId).subscribe({
      next: res =>{
        this.getListProductImport();
        this.showForm = false;
        this.showSuccess("Cập nhật thành công");
      },error: err =>{
        this.showError(err.message);
      }
    })
  }

  onDelete(id: number,name: string){
    // this.importDetailForm.id = null;
    this.showDelete = true;
    this.importDetailForm.id = id;
    this.importDetailForm.name = name;
  }

  deleteProduct(){
    this.importService.deleteImportDetail(this.importDetailForm.id).subscribe({
      next: res =>{
        this.getListProductImport();
        this.showWarn("Xóa thành công");
        this.showDelete = false;
      },error: err =>{
        this.showError(err.message);
      }
    })
  }

  filterProduct(event) {
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
    this.messageService.add({severity:'success', summary: 'Success', detail: text});
  }
  showError(text: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: text});
  }
  showWarn(text : string) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
  }

}
