import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-brand-specific",
  standalone: true,
  imports: [],
  templateUrl: "./brand-specific.component.html",
  styleUrl: "./brand-specific.component.scss"
})
export class BrandSpecificComponent {
  private readonly _activeRouter = inject(ActivatedRoute);
  private readonly _BrandsService = inject(BrandsService)
  brandId!: any
  detailsBrand!: any
  detailsBrandSubscription!:Subscription
  ngOnInit(): void {
    // get id brand
    this._activeRouter.paramMap.subscribe({
      next: prams => {
        this.brandId = prams.get("brandId");
        // console.log(this.brandId);
        // get specific brand data
    this.detailsBrandSubscription =  this._BrandsService.getSpecificBrand(this.brandId).subscribe({
          next: (res) => {
            // console.log(res);
            this.detailsBrand = res.data
            // console.log(this.detailsBrand);
          }
        })
      }
    });

  }
  ngOnDestroy(): void {
    this.detailsBrandSubscription?.unsubscribe();
  }
}
