import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Comment } from 'src/app/_models/comment';
import { CommentService } from 'src/app/_services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers: [MessageService]
})
export class CommentComponent {
  listComment: any;
  listProduct: any;
  listUser: any;

  displayForm: boolean = false;

  deleteForm : boolean = false;

  onUpdate : boolean = false;

  commentForm : Comment = {
    id: 0,
    rate: 0,
    comment : "string",
    enabled: false,
    productId: 0,
    userId: 0
  }

  constructor(private messageService : MessageService,private commentService: CommentService){}

  ngOnInit(): void {
    this.getListComment();
  }


  getListComment(){
    this.commentService.getListComment().subscribe({
      next: res =>{
        this.listComment= res;
        console.log(res);
      },error: err =>{
        console.log(err);
      }
    })
  }

  // showForm(){
  //   this.onUpdate = false;

  //   this.commentForm ={
  //     id : 0,
  //     rate: 0,
  //     comment : "string",
  //     enabled: false,
  //     productId: 0,
  //     userId: 0
  //   }
  //   this.displayForm = true;
  // }


//  onUpdateForm(data: any) {
//       this.onUpdate = true;
//       this.displayForm =true;
//       this.commentForm.id = data.id;
//       this.commentForm.comment = data.comment;
//       this.commentForm.rate = data.rate;
//       this.commentForm.userId = data.user.id;
//       this.commentForm.productId = data.product.id;
//   }

//   onDelete(id:number){
//       this.deleteForm = true;
//       this.commentForm.id = id;
//   }

  // createComment(){
  //   const {name} = this.commentForm;
  //   this.commentService.createComment(name).subscribe({
  //     next: res =>{
  //       this.getListComment();
  //       this.showSuccess("Tạo thành công!");
  //       this.displayForm = false;
  //     },error: err=>{
  //       this.showError(err.message);
  //     }
  //   })
  // }


  // updateComment(){
  //   const {id,rate,comment} = this.commentForm;
  //   this.commentService.updateComment(id,rate,comment).subscribe({
  //     next: res =>{
  //       this.getListComment();
  //       this.showSuccess("Cập nhật thành công!");
  //       this.displayForm = false;
  //     },error: err =>{
  //       this.showError(err.message);
  //     }
  //   })
  // }


  enableComment(id : number){
    this.commentService.enableComment(id).subscribe({
      next: res =>{
        this.getListComment();
        this.showSuccess("Cập nhật thành công!!");
      },error: err=>{
        this.showError(err.message);
      }
    })
  }


  // deleteComment(){
  //   const {id} = this.commentForm;
  //   this.commentService.deleteComment(id).subscribe({
  //     next: res =>{
  //       this.getListComment();
  //       this.showWarn("Xóa thành công!!");
  //       this.deleteForm = false;
  //     },error: err=>{
  //       this.showError(err.message);
  //     }
  //   })
  // }

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
