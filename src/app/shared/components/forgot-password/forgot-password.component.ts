import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly _Router = inject(Router);

  step:number = 1;
  
  verifyEmail:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
  })

  verifyCode:FormGroup = new FormGroup({
    resetCode:new FormControl(null,[Validators.required,Validators.pattern(/^\w{5,}$/)]),
  })

  resetPassword:FormGroup = new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{7,}$/)]),
  })

  verificationEmail():void{
    let emailValue = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue);
    this.authService.setVerificationEmail(this.verifyEmail.value).subscribe({
      next:(res)=>{
        if(res.statusMsg === "success"){
          this.step = 2;
        }
      }
    })
  }

  verificationCode():void{
    this.authService.setVerificationCode(this.verifyCode.value).subscribe({
      next:(res)=>{
        if(res.status === "Success"){
          this.step = 3;
        }
      }
    })
  }

  resetPasswordSubmit():void{
    this.authService.resetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        localStorage.setItem('userToken',res.token);
        this._Router.navigate(['/login']);
      }
    })
  }

}
