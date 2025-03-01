
import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { TermtextPipe } from '../../shared/pipes/termtext.pipe';

@Component({
  selector: 'app-products',
  imports: [TermtextPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  products:Iproduct[] = [];

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData():void{
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.products = res.data;
      }
    })
  }

}
