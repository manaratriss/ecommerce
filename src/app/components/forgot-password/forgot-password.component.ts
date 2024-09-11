import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-forgot-password",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./forgot-password.component.html",
  styleUrl: "./forgot-password.component.scss"
})
export class ForgotPasswordComponent {
  step: number = 1;
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  emailSubscription!:Subscription
  codeSubscription!:Subscription
  newPasswordSubscription!:Subscription
  emailForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]]
  });
  codeForm: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]]
  });
  newPasswordForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{8,}$/)]]
  });
  sendEmail(): void {
    if (this.emailForm.valid) {
     this.emailSubscription=  this._AuthService.setEmailVerify(this.emailForm.value).subscribe({
        next: res => {
          console.log(res);
          if (res.statusMsg == "success") {
            this.step = 2;
          }
        }
      });
    }
  }
  sendCode(): void {
    if (this.codeForm.valid) {
      this.codeSubscription = this._AuthService.setCodeVerify(this.codeForm.value).subscribe({
        next: res => {
          console.log(res);
          if (res.status == "Success") {
            this.step = 3;
          }
        }
      });
    }
  }

  sendNewPassword(): void {
    if (this.newPasswordForm.valid) {
     this.newPasswordSubscription =  this._AuthService.setResetPassword(this.newPasswordForm.value).subscribe({
        next: res => {
          localStorage.setItem("userToken", res.token);
          this._AuthService.userInformation();
          this._Router.navigate(["/home"]);
        }
      });
    }
  }
  ngOnDestroy(): void {
      this.emailSubscription?.unsubscribe();
      this.codeSubscription?.unsubscribe();
      this.newPasswordSubscription?.unsubscribe();

  }
}
