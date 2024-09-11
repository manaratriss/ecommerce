import { Injectable, signal, WritableSignal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Environment } from "../../environments/enviroment";

@Injectable({
  providedIn: "root"
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  cartItemsCounter: WritableSignal<number> = signal(0);
  header: any = {
    token: localStorage.getItem("userToken")
  };
  addProductCart(id: string): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseURL}/api/v1/cart`,
      {
        productId: id
      }
    );
  }
  getProductCart(): Observable<any> {
    return this._HttpClient.get(`${Environment.baseURL}/api/v1/cart`, {
      headers: this.header
    });
  }
  updateProductQuantity(id: string, newCount: number): Observable<any> {
    return this._HttpClient.put(
      `${Environment.baseURL}/api/v1/cart/${id}`,
      {
        count: newCount
      },
      {
        headers: this.header
      }
    );
  }
  removeSpecificCart(pId: string): Observable<any> {
    return this._HttpClient.delete(
      `${Environment.baseURL}/api/v1/cart/${pId}`,
      {
        headers: this.header
      }
    );
  }
  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${Environment.baseURL}/api/v1/cart`, {
      headers: this.header
    });
  }
}
