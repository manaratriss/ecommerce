import { Component, inject, signal, WritableSignal } from "@angular/core";
import { BrandsService } from "../../core/services/brands/brands.service";
import { Brand } from "../../core/interface/brand";
import { RouterLink } from "@angular/router";
import { Subscription } from "rxjs";



@Component({
  selector: "app-brands",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./brands.component.html",
  styleUrl: "./brands.component.scss"
})
export class BrandsComponent {
  private readonly _BrandsService = inject(BrandsService);
  allBrands: Brand   = {} as Brand;
  brandSubscription!: Subscription
  ngOnInit(): void {
    // get all brand data
  this.brandSubscription =  this._BrandsService.getAllBrands().subscribe({
      next: res => {
        this.allBrands = res;
        // console.log(this.allBrands);
      }
    });
  }
  ngOnDestroy(): void {
    this.brandSubscription?.unsubscribe(); // unsubscribe to prevent memory leak.
  }
}
