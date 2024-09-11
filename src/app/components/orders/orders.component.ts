import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-orders",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./orders.component.html",
  styleUrl: "./orders.component.scss"
})
export class OrdersComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrderService = inject(OrdersService);
  private readonly _Router = inject(Router);
  idCart: string | null = "";
  checkOutSubscription!:Subscription;
  ordersForm: FormGroup = this._FormBuilder.group({
    details: ["", [Validators.required]],
    phone: ["", [Validators.required]],
    city: ["", [Validators.required]]
  });
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.idCart = params.get("id");
      // console.log(this.idCart);
    });
  }
  orderSubmit(): void {
    if (this.ordersForm.valid) {
      this._OrderService
        .checkOut(this.idCart, this.ordersForm.value)
        .subscribe({
          next: res => {
            // console.log(res);
            this._Router.navigate(["/home"]);
            window.open(res.session.url, "_self");
          }
        });
    } else {
      this.ordersForm.markAllAsTouched();
    }
  }
  ngOnDestroy(): void {
    this.checkOutSubscription?.unsubscribe();
  }
}
