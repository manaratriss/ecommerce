import { Component, inject, NgModule, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../core/interface/product';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
 
import { CurrencyPipe, NgStyle } from '@angular/common';
import { AddProductService } from '../../core/services/addProduct/add-product.service';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule, NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-product",
  standalone: true,
  imports: [RouterLink,FormsModule,NgStyle,CurrencyPipe,TermTextPipe,SearchPipe],
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.scss"
})
export class ProductComponent {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _AddProductService = inject(AddProductService);
  private readonly _ToastService = inject(ToastrService);
  
  searchTerm:WritableSignal<string> = signal("");
  productList: Product[] = [];
  currentPage: number = 1;
  itemsPerPage!: number;
  AllProductsSubscription!:Subscription
  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe({
      next: res => {
        // TODO: process the data
        // console.log(res);
        this.productList = res.data;
        
      }
    });
  }

  addProductCart(productId: string): void {
   this._AddProductService.addProductToCart(productId)
  }
   addToWishlist(productId: string) {
    this._AddProductService.addProductToWishlist(productId)
  }

toggleFavorite(product: Product) {
    product.isFavorite = !product.isFavorite
}
ngOnDestroy(): void {
  this.AllProductsSubscription?.unsubscribe
}
}
