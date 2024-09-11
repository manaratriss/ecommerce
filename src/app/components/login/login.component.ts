import { Component, inject, signal, ViewChildren, WritableSignal } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { NgClass } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss"
})
export class LoginComponent {
  msgError: WritableSignal<string> = signal("");
  isLoading: WritableSignal<boolean> = signal(false);
  private readonly _AuthService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _FormBuilder = inject(FormBuilder);
  setLogInSubscription!:Subscription
  logInForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{8,}$/)]]
  });
  loginSubmit(): void {
    if (this.logInForm.valid) {
      // console.log(this.registerForm);
      this.isLoading.set(true);;
 this.setLogInSubscription =     this._AuthService.setLogInForm(this.logInForm.value).subscribe({
        next: res => {
          // this.router.navigate(["/login"]);
          console.log(res);
          this.isLoading.set(false);
          if (res.message == "success") {
            setTimeout(() => {
              // 1 save Token
              localStorage.setItem("userToken", res.token);
              // 2 decode Token form user
              this._AuthService.userInformation();
              // 3 navigate to home
              if (localStorage.getItem("navigateTo") !== null) {
                this._router.navigate([localStorage.getItem("navigateTo")]);
              } else {
                this._router.navigate(["/home"]);
              }
            }, 1000);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading.set(false);;
          this.msgError.set(err.error.message);
          console.error(this.msgError);
        }
      });
    } else {
      this.logInForm.markAllAsTouched();
    }
  }
  ngOnDestroy(): void {
    this.setLogInSubscription?.unsubscribe()
  }
}
