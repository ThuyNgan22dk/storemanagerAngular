import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import { Login, Register } from '../../_models/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [MessageService],
})
export class AuthComponent {
  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';
  loginForm: Login = { username: '', password: '' };
  registerForm: Register = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  form: FormGroup;

  error_messages = {
    username: [
      { type: 'required', message: 'Tên người dùng là bắt buộc.' },
      { type: 'minlength', message: 'Tên người dùng không đủ dài.' },
      { type: 'maxlength', message: 'Tên người dùng quá dài.' },
    ],
    email: [
      { type: 'required', message: 'Email là bắt buộc.' },
      { type: 'minlength', message: 'Email không đủ dài.' },
      { type: 'maxlength', message: 'Email không đủ dài.' },
    ],
    password: [
      { type: 'required', message: 'Mật khẩu là bắt buộc.' },
      { type: 'minlength', message: 'Mật khẩu không đủ dài.' },
      { type: 'maxlength', message: 'Mật khẩu quá dài.' },
    ],
    confirmPassword: [
      { type: 'required', message: 'Xác nhận mật khẩu là bắt buộc.' },
      { type: 'minlength', message: 'Xác nhận mật khẩu không đủ dài.' },
      { type: 'maxlength', message: 'Xác nhận mật khẩu quá dài.' },
    ],
  };

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private messageService: MessageService,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group(
      {
        username: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
          ])
        ),
        email: new FormControl('', Validators.compose([Validators.required])),
        password: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ])
        ),
        confirmPassword: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ])
        ),
      },
      {
        validators: this.password.bind(this),
      }
    );
  }

  ngOnInit(): void {}

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    // return password === confirmPassword ? {errors : 'Mời bạn đăng ký tài khoản!'} :  {errors: 'Mật khẩu xác thực chưa đúng!'};
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  login(): void {
    const { username, password } = this.loginForm;
    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.storageService.saveUser(res);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.roles = this.storageService.getUser().roles;
        this.showSuccess('Đăng nhập thành công!');
        if (this.roles[0] == 'ROLE_USER') {
          console.log('user');
          this.router.navigate(['']);
          this.storageService.changeUsername(username);
        } else {
          console.log('administrator');
          this.router.navigate(['/admin']);
        }
      },
      error: (err) => {
        console.log(err);
        this.showError('Đăng nhập thất bại!');
        this.isLoggedIn = false;
        this.isLoginFailed = true;
      },
    });
  }

  register(): void {
    const { username, email, password, confirmPassword } = this.registerForm;
    this.password(this.form);
    this.authService
      .register(username, email, password, confirmPassword)
      .subscribe({
        next: (res) => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.showSuccess('Đăng ký thành công!');
          this.loginForm.username = username;
          this.loginForm.password = password;
          this.login();
        },
        error: (err) => {
          // this.showError(err.message);
          this.showError('Đăng ký thất bại, mời kiểm tra thông tin!');
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        },
      });
  }

  loginFormChange() {
    document
      .getElementById('container')
      ?.classList.remove('right-panel-active');
  }

  registerFormChange() {
    document.getElementById('container')?.classList.add('right-panel-active');
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
