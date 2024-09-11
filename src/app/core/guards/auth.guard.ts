import { isPlatformBrowser } from "@angular/common";
import { inject, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { url } from "node:inspector";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
         const _Router = inject(Router);
         const _PLATFORM_ID = inject(PLATFORM_ID);

         if (isPlatformBrowser(_PLATFORM_ID)) {
           if (localStorage.getItem("userToken") != null) {
             return true;
           } else {
            localStorage.setItem("navigateTo",state.url)
             _Router.navigate(["/login"]);
             return false;
           }
         } else {
           return false;
         }
       };
