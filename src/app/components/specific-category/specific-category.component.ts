import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CategoriesService } from "../../core/services/categories/categories.service";
import { Categories } from "../../core/interface/categories";
import { DatePipe } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
  selector: "app-specific-category",
  standalone: true,
  imports: [DatePipe],
  templateUrl: "./specific-category.component.html",
  styleUrl: "./specific-category.component.scss"
})
export class SpecificCategoryComponent {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CategoriesService = inject(CategoriesService);
  category: Categories = {} as Categories;
  SpecificSubscription!: Subscription;
  ngOnInit(): void {
    // get id SpecificCategory
  this.SpecificSubscription = this._ActivatedRoute.paramMap.subscribe({
      next: prams => {
        this._CategoriesService
          .getSpecificCategories(prams.get("categoryId"))
          .subscribe({
            next: res => {
              // console.log(res);
              this.category = res.data;
              // console.log(this.category);
            }
          });
      }
    });
  }
  ngOnDestroy(): void {
    this.SpecificSubscription?.unsubscribe()
  }
}
