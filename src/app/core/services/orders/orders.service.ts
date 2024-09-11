import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Environment } from "../../environments/enviroment";

@Injectable({
  providedIn: "root"
})
export class OrdersService {
  constructor(private readonly _HttpClient: HttpClient) {}

  checkOut(cartId: any, shippingDetails: any): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseURL}/api/v1/orders/checkout-session/${cartId}?url=${Environment.localServer}`,
      { shippingAddress: shippingDetails },
    );
  }
  getAllOrders():Observable<any> {
    return this._HttpClient.get(`${Environment.baseURL}/api/v1/orders`);
  }
}
