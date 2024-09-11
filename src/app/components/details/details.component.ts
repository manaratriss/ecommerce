import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../core/interface/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: "./details.component.html",
  styleUrl: "./details.component.scss"
})
export class DetailsComponent {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  detailsProduct: Product | null = null;
  SpecificProductSubscribable!:Subscription;
  ProductCartSubscribable!:Subscription;

  detailsCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ["Pre", "Next"],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  };
  ngOnInit(): void {
    // get id specified product
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
      this.SpecificProductSubscribable = this._ProductsService.getSpecificProduct(params.get("id")).subscribe({
          next: res => {
            this.detailsProduct = res.data;
            
          }
        });
      }
    });
  }
  addProductToCart(productId: string) {
   this.ProductCartSubscribable =  this._CartService.addProductCart(productId).subscribe({
      next: res => {
        
        this._CartService.cartItemsCounter.set(res.numOfCartItems);
      }
    });
  }
  ngOnDestroy(): void {
    // unsubscribe from observables when component is destroyed  to avoid memory leaks  or performance issues.
    this.SpecificProductSubscribable?.unsubscribe();
    this.ProductCartSubscribable?.unsubscribe();
  }
}
