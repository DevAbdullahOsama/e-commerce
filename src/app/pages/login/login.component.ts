import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly AuthService = inject(AuthService);
  private readonly router = inject(Router);

  isLoading:boolean = false;
  msgError:string = "";
  success:string = "";

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^\w{7,}$/)]),
  });

  submitForm():void{
    if(this.loginForm.valid){
      this.isLoading = true;
      this.AuthService.sendLoginForm(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.isLoading = false;
          if(res.message == "success"){
            setTimeout(() => {
              localStorage.setItem('userToken',res.token);
              this.AuthService.saveUserData();
              this.router.navigate(["/home"]);
            }, 1000);
            this.success = res.message;
          }
        },
        error:(err)=>{
          console.log(err);
          this.isLoading = false;
          this.msgError = err.error.message;
        }
      })
    }
  }
}
