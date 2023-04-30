import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import {Login, Register} from '../../_models/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [MessageService]
})
export class AuthComponent {
  isSuccessful = false;
  isSignUpFailed = false;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  errorMessage = '';
  loginForm: Login = {username: '' , password: ''};
  registerForm: Register = {username: '', email: '', password: '', confirmPassword: ''};
  form: FormGroup;

  error_messages = {
    'username': [
      { type: 'required', message: 'First Name is required.' },
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email length.' },
      { type: 'maxlength', message: 'Email length.' },
      { type: 'required', message: 'please enter a valid email address.' }
    ],
    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
    'confirmPassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
  }

  constructor(private authService:AuthService,
              private storageService: StorageService,
              private messageService:MessageService,
              public formBuilder: FormBuilder,
              private router:Router
              ) {
                this.form = this.formBuilder.group({
                  username: new FormControl('', Validators.compose([
                    Validators.required
                  ])),
                  email: new FormControl('', Validators.compose([
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(30)
                  ])),
                  password: new FormControl('', Validators.compose([
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(30)
                  ])),
                  confirmPassword: new FormControl('', Validators.compose([
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(30)
                  ])),
                }, {
                  validators: this.password.bind(this)
                });
              }

  ngOnInit(): void {
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmPassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }

  login():void{
    const {username,password} = this.loginForm;
    console.log(this.loginForm);
    this.authService.login(username,password).subscribe({
      next: res =>{
        this.storageService.saveUser(res);
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.roles = this.storageService.getUser().roles;
        this.showSuccess("Đăng nhập thành công!!");
        this.router.navigate(['/admin']);
      },error: err =>{
        console.log(err);
        this.isLoggedIn = false;
        this.isLoginFailed = true;
      }
    })
  }

  register():void{
    const {username,email,password,confirmPassword} = this.registerForm;

    console.log(this.registerForm);
    this.authService.register(username,email,password,confirmPassword).subscribe({
      next: res =>{
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showSuccess("Đăng ký thành công")
        this.loginForm.username = username;
        this.loginForm.password = password;
        this.login();
      },error: err =>{
        this.showError(err.message);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    })
  }

  loginFormChange(){
    document.getElementById('container')?.classList.remove("right-panel-active");
  }
  registerFormChange(){
    document.getElementById('container')?.classList.add("right-panel-active");
  }

  showSuccess(text: string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: text});
  }
  showError(text: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: text});
  }

  showWarn(text: string) {
    this.messageService.add({severity:'warn', summary: 'Warn', detail: text});
  }

}
