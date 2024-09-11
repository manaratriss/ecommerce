import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const _ToastService = inject(ToastrService)
  return next(req).pipe(catchError((error) => {
    _ToastService.error('An error occurred:', error.error.message);
    return throwError(()=>{error}); // Rethrow the error to let the application handle it
  }));
};
