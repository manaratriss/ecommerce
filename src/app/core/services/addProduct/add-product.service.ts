import { Injectable } from "@angular/core";
import { CartService } from "../cart/cart.service";
import { ToastrService } from "ngx-toastr";
import { WishlistService } from "../Wishlist/wishlist.service";
@Injectable({
  providedIn: "root"
})
export class AddProductService {
  constructor(
    private _CartService: CartService,
    private _ToastService: ToastrService,
    private _WishlistService: WishlistService
  ) {}
  addProductToCart(productId: string): void {
    this._CartService.addProductCart(productId).subscribe({
      next: (res) => {
        // console.log(res);
        /* update cart items Counter  */
        this._CartService.cartItemsCounter.set(res.numOfCartItems);
        // alter message display user success add toc cart
        this._ToastService.success(res.message);
      }
    });
  }
  addProductToWishlist(productId:string) {
    this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        // console.log(res);
        this._ToastService.success(res.message);
      }
    });
  }
}
