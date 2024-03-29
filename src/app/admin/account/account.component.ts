import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [MessageService],
})
export class AccountComponent implements OnInit {
  listUser: any;
  displayForm: boolean = false;
  deleteForm: boolean = false;
  onUpdate: boolean = false;
  userForm: User = {
    id: 0,
    username: 'string',
    address: 'string',
    email: 'string',
    firstname: 'string',
    lastname: 'string',
    country: 'string',
    phone: 'string',
    enabled: false,
  };

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getListUser();
  }

  getListUser() {
    this.userService.getListUser().subscribe({
      next: (res) => {
        this.listUser = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showForm() {
    this.onUpdate = false;
    this.userForm = {
      id: 0,
      username: 'string',
      address: 'string',
      email: 'string',
      firstname: 'string',
      lastname: 'string',
      country: 'string',
      phone: 'string',
      enabled: false,
    };
    this.displayForm = true;
  }

  onUpdateForm(data: any) {
    this.onUpdate = true;
    this.displayForm = true;
    this.userForm.id = data.id;
    this.userForm.username = data.username;
    this.userForm.address = data.address;
    this.userForm.email = data.email;
    this.userForm.firstname = data.firstname;
    this.userForm.lastname = data.lastname;
    this.userForm.country = data.country;
    this.userForm.phone = data.phone;
    this.userForm.enabled = data.enabled;
  }

  onDelete(username: string) {
    this.deleteForm = true;
    this.userForm.username = username;
  }

  updateUser() {
    const {
      id,
      username,
      firstname,
      lastname,
      email,
      country,
      address,
      phone,
    } = this.userForm;
    this.userService
      .updateUser(
        id,
        username,
        firstname,
        lastname,
        email,
        country,
        address,
        phone
      )
      .subscribe({
        next: (res) => {
          this.getListUser();
          this.showSuccess('Cập nhật thành công!');
          this.displayForm = false;
        },
        error: (err) => {
          this.showError("Lỗi! Mời kiểm tra lại");
        },
      });
  }

  enableUser(id: number) {
    this.userService.enableUser(id).subscribe({
      next: (res) => {
        this.getListUser();
        this.showSuccess('Cập nhật thành công!!');
      },
      error: (err) => {
        this.showError("Lỗi! Mời kiểm tra lại");
      },
    });
  }

  deleteUser() {
    const { id } = this.userForm;
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        this.showWarn('Xóa người dùng thành công!!');
        this.deleteForm = false;
        this.getListUser();
      },
      error: (err) => {
        this.showError("Lỗi! Mời kiểm tra lại");
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
