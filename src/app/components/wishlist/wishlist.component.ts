import { Component, inject } from "@angular/core";
import { WishlistService } from "../../core/services/Wishlist/wishlist.service";
import { CurrencyPipe } from "@angular/common";
import { AddProductService } from "../../core/services/addProduct/add-product.service";
import { Product } from "../../core/interface/product";
import { Subscription } from "rxjs";

@Component({
  selector: "app-wishlist",
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: "./wishlist.component.html",
  styleUrl: "./wishlist.component.scss"
})
export class WishlistComponent {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _AddProductService = inject(AddProductService);
  productsWishlist: Product[] = [];
  LoggedWishlistSubscription!:Subscription
  removeWishlistSubscription!:Subscription

  ngOnInit(): void {
    this.LoggedWishlistSubscription = this._WishlistService.getLoggedUserWishlist().subscribe({
      next: res => {
        this.productsWishlist = res.data;
        // console.log(this.productsWishlist);
      }
    });
  }
  addProductCart(productId: string): void {
    this._AddProductService.addProductToCart(productId);
  }
  removeProductWishlist(productId: string): void {
    this.removeWishlistSubscription = this._WishlistService.removeProductFromWishlist(productId).subscribe({
      next: res => {
        // console.log(res);
        this._WishlistService.getLoggedUserWishlist().subscribe({
          next: res => {
            this.productsWishlist = res.data;
          }
        });
      }
    });
  }
  ngOnDestroy(): void {
    // unsubscribe to prevent memory leak.
    this.LoggedWishlistSubscription?.unsubscribe();
    this.removeWishlistSubscription?.unsubscribe();
  }
}
