import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { TermtextPipe } from '../../shared/pipes/termtext.pipe';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [CarouselModule,RouterLink,TitleCasePipe,CurrencyPipe,TermtextPipe,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  products:Iproduct[] = [];
  private readonly CategoriesService = inject(CategoriesService);
  categories:Icategory[] = [];
  word:string = "";
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);


  ngOnInit(): void {
    this.getAllproductsData();
    this.getCategoriesData();
  }

  getAllproductsData(){
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.products = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getCategoriesData(){
    this.CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    rtl: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-right text-gray-900 px-4"></i>', '<i class="fa-solid fa-arrow-left text-gray-900 px-4"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    rtl: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-arrow-right text-gray-900 px-4"></i>', '<i class="fa-solid fa-arrow-left text-gray-900 px-4"></i>'],
    items: 1,
    nav: true
  }
  
  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this.toastrService.success(res.message,'Fresh Cart');
        this.cartService.cartNumber.set(res.numOfCartItems);
      }
    });
  }

}
