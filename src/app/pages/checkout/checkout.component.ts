import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);

  cartId:string = "";

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(param)=>{
        this.cartId = param.get('id')!;
      }
    })
  }

  checkoutForm:FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null,[Validators.required]),
    city: new FormControl(null,[Validators.required]),
  })

  submitForm():void{
    this.orderService.checkoutSession(this.cartId,this.checkoutForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
          open(res.session.url,'_self');
        }
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
