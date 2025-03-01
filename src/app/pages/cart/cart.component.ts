import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService);
  cartDetails:Icart = {} as Icart;

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartDetails = res.data;
      }
    })
  }

  removeItem(id:string):void{
    this.cartService.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
        this.cartDetails = res.data;
        this.cartService.cartNumber.set(res.numOfCartItems);
      }
    });
  }

  updateCount(id:string,itemsCount:number):void{
    this.cartService.updateCartQuantity(id,itemsCount).subscribe({
      next:(res)=>{
        this.cartDetails = res.data;
      }
    });
  }

  clearCart(){
    this.cartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.message === 'success'){
          this.cartDetails = {} as Icart
          this.cartService.cartNumber.set(0)
        }
      }
    })
  }

}
