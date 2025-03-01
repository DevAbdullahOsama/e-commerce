import { CartService } from './../../core/services/cart/cart.service';
import { Component, computed, inject, input, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive,TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private readonly _AuthService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly myTranslateService = inject(MyTranslateService);
  isLogin = input<boolean>(true);
  navCartCount:Signal<number> = computed(()=>this.cartService.cartNumber());

  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartService.cartNumber.set(res.numOfCartItems);
      }
    })

  }

  userLogOut(){
    this._AuthService.logOut();
  }

  change(lang:string):void{
    this.myTranslateService.changeLang(lang);
  }

}
