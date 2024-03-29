import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/_models/category';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [MessageService],
})
export class CategoryComponent implements OnInit {
  listCategory: any;

  displayForm: boolean = false;

  deleteForm: boolean = false;

  onUpdate: boolean = false;

  categoryForm: Category = {
    id: 0,
    name: 'string',
  };

  constructor(
    private messageService: MessageService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getListCategory();
  }

  getListCategory() {
    this.categoryService.getListCategory().subscribe({
      next: (res) => {
        this.listCategory = res;
        // console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showForm() {
    this.onUpdate = false;
    this.categoryForm = {
      id: 0,
      name: 'string',
    };
    this.displayForm = true;
  }

  onUpdateForm(id: number, name: string) {
    this.onUpdate = true;
    this.displayForm = true;
    this.categoryForm.id = id;
    this.categoryForm.name = name;
  }

  onDelete(id: number, name: string) {
    this.deleteForm = true;
    this.categoryForm.id = id;
    this.categoryForm.name = name;
  }

  createCategory() {
    const { name } = this.categoryForm;
    this.categoryService.createCategory(name).subscribe({
      next: (res) => {
        this.getListCategory();
        this.showSuccess('Tạo danh mục thành công!');
        this.displayForm = false;
      },
      error: (err) => {
        // this.showError(err.message);
        this.showError("Mời bạn nhập đầy đủ thông tin");
      },
    });
  }

  updateCategory() {
    const { id, name } = this.categoryForm;
    this.categoryService.updateCategory(id, name).subscribe({
      next: (res) => {
        this.getListCategory();
        this.showSuccess('Cập nhật danh mục thành công!');
        this.displayForm = false;
      },
      error: (err) => {
        // this.showError(err.message);
        this.showError("Thông tin chưa đúng, mời nhập lại!");
      },
    });
  }

  enableCategory(id: number) {
    this.categoryService.enableCategory(id).subscribe({
      next: (res) => {
        this.getListCategory();
        this.showSuccess('Cập nhật thành công!');
      },
      error: (err) => {
        this.showError('Cập nhật không thành công!');
      },
    });
  }

  deleteCategory() {
    const { id } = this.categoryForm;
    this.categoryService.deleteCategory(id).subscribe({
      next: (res) => {
        this.getListCategory();
        this.showWarn('Xóa danh mục thành công!');
        this.deleteForm = false;
      },
      error: (err) => {
        this.showError('Thất bại');
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
