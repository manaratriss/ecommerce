import { Component, inject } from '@angular/core';
import { OrdersService } from '../../core/services/orders/orders.service';
import { CurrencyPipe } from '@angular/common';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { Subscription } from 'rxjs';
@Component({
  selector: "app-all-orders",
  standalone: true,
  imports: [CurrencyPipe, TermTextPipe],
  templateUrl: "./all-orders.component.html",
  styleUrl: "./all-orders.component.scss"
})
export class AllOrdersComponent {
  private readonly _OrdersService = inject(OrdersService);
  allOrders: any;
  ordersSubscription!:Subscription
  ngOnInit(): void {
    // get all orders
    this.ordersSubscription = this._OrdersService.getAllOrders().subscribe({
      next: res => {
        this.allOrders = res;
      }
    });
  }
  ngOnDestroy(): void {

    this.ordersSubscription?.unsubscribe();
  }
}
