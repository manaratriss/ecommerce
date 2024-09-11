import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../environments/enviroment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);
  userData:any
  setRegisterForm(data: any): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseURL}/api/v1/auth/signup`,
      data
    );
  }
  setLogInForm(data: any): Observable<any> {
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/auth/signin`, data);
  }
  userInformation():void{
    if (localStorage.getItem("userToken") !== null) {
      // let to:any = localStorage.getItem("userToken");
      this.userData = jwtDecode(localStorage.getItem("userToken")!);
      console.log(this.userData);
    }
  }
  logOut():void{
    localStorage.removeItem("userToken");
    this.userData = null;
    this._Router.navigate(["/login"]);
  }

  // forget Password
  setEmailVerify(email:any):Observable <any> {
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/auth/forgotPasswords`,email);
  }
  setCodeVerify(code:any):Observable <any> {
    return this._HttpClient.post(`${Environment.baseURL}/api/v1/auth/verifyResetCode`, code);
  }
  setResetPassword(data:object):Observable <any> {
    return this._HttpClient.put(`${Environment.baseURL}/api/v1/auth/resetPassword`, data);
  }

}
