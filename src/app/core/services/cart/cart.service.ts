import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpclient:HttpClient) { }

  cartNumber:WritableSignal<number> = signal(0);

  addProductToCart(id:string):Observable<any>{
    return this.httpclient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": id
      }
    );
  }

  getLoggedUserCart():Observable<any>{
    return this.httpclient.get(`${environment.baseUrl}/api/v1/cart`)
  }

  removeSpecificCartItem(id:string):Observable<any>{
    return this.httpclient.delete(`${environment.baseUrl}/api/v1/cart/${id}`)
  }

  updateCartQuantity(id:string , newCount:number):Observable<any>{
    return this.httpclient.put(`${environment.baseUrl}/api/v1/cart/${id}`,{
      "count": newCount
    }
  )
  }

  clearCart():Observable<any>{
    return this.httpclient.delete(environment.baseUrl + '/api/v1/cart')
  }

}
