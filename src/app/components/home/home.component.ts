import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Product } from '../../core/interface/product';
import { Subscription } from 'rxjs';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Categories } from '../../core/interface/categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { WishlistService } from '../../core/services/Wishlist/wishlist.service';
// import { NgxPaginationModule } from 'ngx-pagination';
import { AddProductService } from '../../core/services/addProduct/add-product.service';
@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink, CarouselModule, CurrencyPipe, TermTextPipe, NgStyle],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss"
})
export class HomeComponent {
  // global variables
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _AddProductService = inject(AddProductService)
  private readonly _WishlistService = inject(WishlistService)
  private readonly _ToastService = inject(ToastrService)

  productList: WritableSignal<Product[]> = signal([]);
  categoriesList: WritableSignal<Categories[]> = signal([]);
  // currentPage: number = 1;
  // itemsPerPage!: number
  getAllProductsSub!: Subscription
  ProductToWishlistSubscription!: Subscription
  CategoriesServiceSubscription!: Subscription
  mainCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }
  categoriesCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: [' ', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  ngOnInit(): void {
    this.CategoriesServiceSubscription = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        // TODO: process the data
        this.categoriesList.set(res.data)
      }
    })
    this.getAllProductsSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        // TODO: process the data
        this.productList.set(res.data);
        // this.itemsPerPage = (res.metadata.limit / 4)
      }
    })
  }

  addProductCart(productId: string): void {
    this._AddProductService.addProductToCart(productId)
  }
  addToWishlist(productId: string) {
    this.ProductToWishlistSubscription = this._WishlistService.addProductToWishlist(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastService.success(res.message)
      }
    })
  }
  toggleliked(product: Product) {
    product.isFavorite = !product.isFavorite
  }
  ngOnDestroy(): void {
    this.getAllProductsSub?.unsubscribe()
    this.CategoriesServiceSubscription?.unsubscribe()
    this.ProductToWishlistSubscription?.unsubscribe()
  }
}
