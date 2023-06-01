import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ImportDetail } from 'src/app/_models/import-detail';
import { ImportGood } from 'src/app/_models/import-good';
import { ImportService } from 'src/app/_services/import.service';

@Component({
  selector: 'app-import-good',
  templateUrl: './import-good.component.html',
  styleUrls: ['./import-good.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class ImportGoodComponent {
  listImports: any;
  listImportDetails: ImportDetail = {
    id: 0,
    name: "string",
    price: 0,
    quantity: 0,
    expiry: "1-1-1111",
    subTotal: 0,
    // categoryId: 0,
    importGoodId: 0,
  };

  onUpdate : boolean = false;
  showForm : boolean = false;
  showFormApp: boolean = false;
  showDelete: boolean = false;

  importForm: ImportGood = {
    id: 0,
    nameShipper: "string",
    phoneShipper: "string",
    note: "string",
    totalPrice: 0,
    importDetails: []
  }

  constructor(private importService: ImportService, private messageService : MessageService,){

  }

  ngOnInit(): void {
    this.getListImport();
  }

  openNew() {
    this.onUpdate = false;
    this.showForm = true;
    this.listImports = [];
    this.importForm = {
      id: 0,
      nameShipper: "string",
      phoneShipper: "string",
      note: "string",
      totalPrice: 0,
      importDetails: []
    };
  }

  getListImport(){
    this.importService.getListImport().subscribe({
      next: res=>{
        this.listImports = res;
        // console.log(this.listImports);
      },error: err =>{
        console.log(err);
      }
    })
  }

  openUpdate(data : any){
      this.onUpdate = true;
      this.showForm =true;
      this.importForm.id = data.id;
      this.importForm.nameShipper = data.nameShipper;
      this.importForm.phoneShipper = data.phoneShipper;
      this.importForm.note = data.note;
      this.importForm.totalPrice = data.totalPrice;
  }

  createImport(){
    const {nameShipper,phoneShipper,note,totalPrice,importDetails} = this.importForm;
    // console.log(this.importForm);
    this.importService.placeImport(nameShipper,phoneShipper,note,totalPrice,importDetails).subscribe({
      next: res =>{
        this.getListImport();
        this.showForm = false;
        this.showSuccess("Thêm mới thành công");
      },error: err =>{
        this.showError(err.message);
      }
    })
  }

  updateImport(){
    const {id,nameShipper,phoneShipper,note,totalPrice,importDetails} = this.importForm;
    // console.log(this.importForm);
    this.importService.updateImport(id,nameShipper,phoneShipper,note,totalPrice,importDetails).subscribe({
      next: res =>{
        this.getListImport();
        this.showForm = false;
        this.showSuccess("Cập nhật thành công");
      },error: err =>{
        this.showError(err.message);
      }
    })

  }

  onDelete(id: number){
    // this.importDetailForm.id = null;
    this.showDelete = true;
    this.importForm.id = id;
  }

  deleteImport(){
    this.importService.deleteImport(this.importForm.id).subscribe({
      next: res =>{
        this.getListImport();
        this.showWarn("Xóa thành công");
        this.showDelete = false;
      },error: err =>{
        this.showError(err.message);
      }
    })
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
