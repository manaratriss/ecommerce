import { Component, computed, inject, signal, Signal } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { CartService } from "../../core/services/cart/cart.service";

@Component({
  selector: "app-navbar-blank",
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./navbar-blank.component.html",
  styleUrl: "./navbar-blank.component.scss"
})
export class NavbarBlankComponent {
  readonly _AuthService = inject(AuthService);
  private readonly _CartService = inject(CartService);
  catIncrement: Signal<number> = computed(() =>
    this._CartService.cartItemsCounter()
  );
  ngOnInit(): void {
    this._CartService.getProductCart().subscribe({
      next: res => {
        // console.log(res);
        /* counter cart service signal */
        this._CartService.cartItemsCounter.set(res.numOfCartItems);
      },
    });
  }
  
}
