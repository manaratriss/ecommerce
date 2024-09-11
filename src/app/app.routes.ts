import { Routes } from "@angular/router";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { BlankLayoutComponent } from "./layouts/blank-layout/blank-layout.component";
import { authGuard } from "./core/guards/auth.guard";
import { logedGuard } from "./core/guards/loged.guard";

export const routes: Routes = [
  {
    path: "",
    component: AuthLayoutComponent,
    canActivate: [logedGuard],
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      {
        path: "login",
        loadComponent: () =>
          import("./components/login/login.component").then(
            m => m.LoginComponent
          )
      },
      {
        path: "register",
        loadComponent: () =>
          import("./components/register/register.component").then(
            m => m.RegisterComponent
          )
      },
      {
        path: "forgotPassword",
        loadComponent: () =>
          import("./components/forgot-password/forgot-password.component").then(
            m => m.ForgotPasswordComponent
          )
      }
    ]
  },
  {
    path: "",
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      {
        path: "home",
        loadComponent: () =>
          import("./components/home/home.component").then(m => m.HomeComponent),
        title: "Home"
      },
      {
        path: "product",
        loadComponent: () =>
          import("./components/product/product.component").then(
            m => m.ProductComponent
          ),
        title: "Product"
      },
      {
        path: "cart",
        loadComponent: () =>
          import("./components/cart/cart.component").then(m => m.CartComponent),
        title: "Cart"
      },
      {
        path: "brands",
        loadComponent: () =>
          import("./components/brands/brands.component").then(
            m => m.BrandsComponent
          )
      },
      {
        path: "brandsDetails/:brandId",
        loadComponent: () =>
          import("./components/brand-specific/brand-specific.component").then(
            m => m.BrandSpecificComponent
          ),
        title: "Brand Details"
      },
      {
        path: "categories",
        loadComponent: () =>
          import("./components/categories/categories.component").then(
            m => m.CategoriesComponent
          ),
        title: "Categories"
      },
      {
        path: "specificCategory/:categoryId",
        loadComponent: () =>
          import("./components/specific-category/specific-category.component").then(
            m => m.SpecificCategoryComponent
          ),
        title: "Specific Category"
      },
      {
        path: "wishlist",
        loadComponent: () =>
          import("./components/wishlist/wishlist.component").then(
            m => m.WishlistComponent
          ),
        title: "Wishlist"
      },
      {
        path: "details/:id",
        loadComponent: () =>
          import("./components/details/details.component").then(
            m => m.DetailsComponent
          ),
        title: "Details"
      },
      {
        path: "allorders",
        loadComponent: () =>
          import("./components/all-orders/all-orders.component").then(
            m => m.AllOrdersComponent
          ),
        title: "All Orders"
      },
      {
        path: "orders/:id",
        loadComponent: () =>
          import("./components/orders/orders.component").then(
            m => m.OrdersComponent
          ),
        title: "Orders"
      }
    ]
  },
  {
    path: "**",
    loadComponent: () =>
      import("./components/not-found/not-found.component").then(
        m => m.NotFoundComponent
      )
  }
]; // Uncomment if needed
