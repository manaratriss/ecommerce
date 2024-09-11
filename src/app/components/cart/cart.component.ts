import { Component, inject } from "@angular/core";
import { CartService } from "../../core/services/cart/cart.service";

import { Cart } from "../../core/interface/cart";
import { CurrencyPipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { RouterLink } from "@angular/router";
import { Subscription } from "rxjs";


@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss"
})
export class CartComponent {
  private readonly _CartService = inject(CartService);
  private readonly _ToastService = inject(ToastrService);
  cartDetails: Cart = {} as Cart;
  productCartSubscription!:Subscription
  removeCartSubscription!:Subscription
  updateCartSubscription!:Subscription
   clearCartSubscription!:Subscription
  ngOnInit(): void {
    // get product in cart
  this.productCartSubscription =  this._CartService.getProductCart().subscribe({
      next: res => {
        this.cartDetails = res;
      }
    });
  }
  // remove product from cart
  removeProductCart(pId: string): void {
    this.removeCartSubscription = this._CartService.removeSpecificCart(pId).subscribe({
      next: res => {
        // console.log(res);
        this.cartDetails = res;
        /* update cart items Counter  */
        this._CartService.cartItemsCounter.set(res.numOfCartItems);
        // alter message display user success removed  to cart
        this._ToastService.error("Cart removed successfully");
      }
    });
  }
  // update product quantity in cart
  updateCount(id: string, count: number): void {
    if (count > 0) {
      this.updateCartSubscription = this._CartService.updateProductQuantity(id, count).subscribe({
        next: res => {
          // console.log(res);
          this.cartDetails = res;
          // alter message display user success add toc cart
          this._ToastService.success("product quantity updated successfully");
        },
      });
    }
  }
  // remove all products from cart
  clearItems() {
   this.clearCartSubscription =  this._CartService.clearCart().subscribe({
      next: res => {
        // console.log(res);
        // this.cartDetails = res.data;
        if (res.message == "success") {
          this.cartDetails = {} as Cart;
          /* update cart items Counter  */
          this._CartService.cartItemsCounter.set(0);
          // alter message display user success removed all to cart
          this._ToastService.success("Cart cleared successfully");
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.productCartSubscription?.unsubscribe()
    this.removeCartSubscription?.unsubscribe()
    this.updateCartSubscription?.unsubscribe()
    this.clearCartSubscription?.unsubscribe()
  }
}
