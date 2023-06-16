import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ImageService } from 'src/app/_services/image.service';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  username: string;
  user: any;
  changePassword: boolean = false;
  resetPassword: boolean = false;
  code: string;
  showOrder: boolean = false;
  showImageUser: boolean = false;
  selectedFiles?: FileList;
  currentFile?: File;
  listImage: any;
  updateForm: any = {
    firstname: null,
    lastname: null,
    email: null,
    country: null,
    address: null,
    phone: null,
  };
  changePasswordForm: any = {
    oldPassword: null,
    newPassword: null,
    confirmPassword: null,
  };

  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.username = this.storageService.loadUsername();
    this.getUser();
    this.getListImage();
    if (this.route.routeConfig.path == 'userDetail') {
      this.showOrder = false;
    } else if (this.route.routeConfig.path == 'myOrder') {
      this.showOrder = true;
    }
  }

  getListImage() {
    this.imageService.getListByUsername(this.username).subscribe({
      next: (res) => {
        this.showImageUser = true;
        this.listImage = res;
      },
      error: (err) => {
        this.showImageUser = false;
        console.log(err);
      },
    });
  }

  setImg(event: any) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.imageService
          .uploadForUser(this.username, this.currentFile)
          .subscribe({
            next: (res) => {
              this.currentFile = undefined;
              this.getListImage();
            },
            error: (err) => {},
          });
      }
      this.currentFile = undefined;
    }
  }

  getUser() {
    this.userService.getUser(this.username).subscribe({
      next: (res) => {
        this.user = res;
        console.log(this.user);
        this.updateForm.firstname = res.firstname;
        this.updateForm.lastname = res.lastname;
        this.updateForm.email = res.email;
        this.updateForm.country = res.country;
        this.updateForm.address = res.address;
        this.updateForm.phone = res.phone;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateProfile() {
    const { firstname, lastname, email, country, address, phone } =
      this.updateForm;
    this.userService
      .updateProfile(
        this.username,
        firstname,
        lastname,
        email,
        country,
        address,
        phone
      )
      .subscribe({
        next: (res) => {
          this.getUser();
          this.showSuccess('Cập nhật thành công');
        },
        error: (err) => {
          this.showError('Cập nhật thất bại');
        },
      });
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  changePasswordFunc() {
    this.changePassword = false;
    const { oldPassword, newPassword, confirmPassword } =
      this.changePasswordForm;
    if (newPassword === confirmPassword) {
      this.userService
        .changePassword(this.username, oldPassword, newPassword)
        .subscribe({
          next: (res) => {
            this.getUser();
            this.showSuccess('Đổi mật khẩu thành công');
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  resetPasswordFunc() {
    this.userService.resetPassword(this.username).subscribe({
      next: (res) => {
        this.code = res;
        console.log('res: ' + res);
        console.log(this.code);
        this.showSuccess('Đổi mật khẩu thành công');
      },
      error: (err) => {
        this.showError('Không thành công');
      },
    });
  }

  showResetPassword() {
    this.resetPassword = true;
    this.resetPasswordFunc();
  }

  showChangePassword() {
    this.changePassword = true;
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
