import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Promotion } from 'src/app/_models/promotion';
import { PromotionService } from 'src/app/_services/promotion.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css'],
  providers: [MessageService]
})
export class PromotionComponent {
  listPromotion : any;

  displayForm: boolean = false;

  deleteForm : boolean = false;

  onUpdate : boolean = false;

  promotionForm : Promotion = {
    id: 0,
    name : "string",
    detail: "string",
    code: "string",
    quantity: 0,
    percent: 0,
    enabled: false,
  }

  constructor(private messageService : MessageService,private promotionService: PromotionService){}

  ngOnInit(): void {
    this.getListPromotion();
  }


  getListPromotion(){
    this.promotionService.getListPromotion().subscribe({
      next: res =>{
        this.listPromotion = res;
        console.log(res);
      },error: err =>{
        console.log(err);
      }
    })
  }

  showForm(){
    this.onUpdate = false;
    this.promotionForm ={
      id : 0,
      name : "string",
      detail: "string",
      code: "string",
      quantity: 0,
      percent: 0,
      enabled: false,
    }
    this.displayForm = true;
  }


 onUpdateForm(id: number,name : string,detail: string,code: string, quantity: number,percent: number){
      this.onUpdate = true;
      this.displayForm =true;
      this.promotionForm.id = id;
      this.promotionForm.name = name;
      this.promotionForm.detail = detail;
      this.promotionForm.code = code;
      this.promotionForm.quantity = quantity;
      this.promotionForm.percent = percent;
  }

  onDelete(id:number){
    this.deleteForm = true;
    this.promotionForm.id = id;
  }

  createPromotion(){
    const {name,detail,quantity,percent} = this.promotionForm;
    this.promotionService.createPromotion(name,detail,quantity,percent).subscribe({
      next: res =>{
        this.getListPromotion();
        this.showSuccess("Tạo thành công!");
        this.displayForm = false;
      },error: err=>{
        this.showError(err.message);
      }
    })
  }


  updatePromotion(){
    const {id,name,detail,code,quantity,percent} = this.promotionForm;
    this.promotionService.updatePromotion(id,name,detail,code,quantity,percent).subscribe({
      next: res =>{
        this.getListPromotion();
        this.showSuccess("Cập nhật thành công!");
        this.displayForm = false;
      },error: err =>{
        this.showError(err.message);
      }
    })
  }


  enablePromotion(id : number){
    this.promotionService.enablePromotion(id).subscribe({
      next: res =>{
        this.getListPromotion();
        this.showSuccess("Cập nhật thành công!!");
      },error: err=>{
        this.showError(err.message);
      }
    })
  }


  deletePromotion(){
    const {id} = this.promotionForm;
    this.promotionService.deletePromotion(id).subscribe({
      next: res =>{
        this.getListPromotion();
        this.showWarn("Xóa thành công!!");
        this.deleteForm = false;
      },error: err=>{
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
