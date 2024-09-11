import { Component, inject } from "@angular/core";
import {
  AbstractControl,
  EmailValidator,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgClass } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss"
})
export class RegisterComponent {
  private readonly _AuthService = inject(AuthService)
  private readonly _router = inject(Router)
  private readonly _FormBuilder = inject(FormBuilder)
  msgError: string = ""
  isLoading: boolean = false
  registerSubscription!: Subscription
  registerForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{8,}$/)]],
    rePassword: [null],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, { validators: this.confirmPassword })
  confirmPassword(confirm: AbstractControl) {
    if (confirm.get("password")?.value === confirm.get("rePassword")?.value) {
      return null;
    } else {
      return { mismatch: true }
    }
  }
  registerSendData(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.registerSubscription = this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.message == "success") {
            setTimeout(() => {
              this._router.navigate(["/login"]);
            }, 1000)
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.msgError = err.error.message
        }
      })
    } else {
      this.registerForm.setErrors({ mismatch: true })
      this.registerForm.markAllAsTouched()
    }
  }
  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe()
  }
}
