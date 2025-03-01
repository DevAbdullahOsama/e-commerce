import { Iproduct } from './../../shared/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  productDetails:Iproduct | null = null;

  ngOnInit():void{
    this.getProductDetails();
  }

  getProductDetails():void{
    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        let productId = p.get('id');
        this._ProductsService.getSpecificProduct(productId).subscribe({
          next:(res)=>{
            this.productDetails = res.data;
          }
        });
      }
    })
  }

  imgsOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      autoplay: true,
      autoplayHoverPause: true,
      autoplayTimeout: 3000,
      dots: false,
      navSpeed: 700,
      navText: ['<i class="fa-solid fa-arrow-left text-gray-900 px-4"></i>', '<i class="fa-solid fa-arrow-right text-gray-900 px-4"></i>'],
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

}