import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Environment } from "../../environments/enviroment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BrandsService {
  constructor(private _HttpClient: HttpClient) {}
  getAllBrands(): Observable<any> {
    return this._HttpClient.get(`${Environment.baseURL}/api/v1/brands`);
  }
  getSpecificBrand(productId: string): Observable<any> {
    return this._HttpClient.get(
      `${Environment.baseURL}/api/v1/brands/${productId}`
    );
  }
}
