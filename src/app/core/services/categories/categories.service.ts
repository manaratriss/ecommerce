import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../environments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  private readonly _HttpClient = inject(HttpClient);

  getAllCategories():Observable<any> {
    return this._HttpClient.get(`${Environment.baseURL}/api/v1/categories`);
  }
  getSpecificCategories(id:string| null):Observable <any> {
    return this._HttpClient.get(`${Environment.baseURL}/api/v1/categories/${id}`);
  }
}
