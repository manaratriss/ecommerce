import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Categories } from '../../core/interface/categories';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-categories",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./categories.component.html",
  styleUrl: "./categories.component.scss"
})
export class CategoriesComponent {
  private readonly _CategoriesService = inject(CategoriesService);
  categoriesList: Categories[] = [];
  AllCategoriesSubscription!: Subscription;
  ngOnInit(): void {
    this.AllCategoriesSubscription = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        // console.log(res);
        this.categoriesList = res.data;
      }
    });
  }
  ngOnDestroy(): void {
    this.AllCategoriesSubscription?.unsubscribe
  }
}
