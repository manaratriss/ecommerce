import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  // req.url.includes("cart")
  if (req.url.includes("cart") ||req.url.includes("wishlist") || req.url.includes("orders")) {
    req = req.clone(
      {
        setHeaders:{token:localStorage.getItem("userToken")!}
      }
    )
  }
  return next(req);
};
