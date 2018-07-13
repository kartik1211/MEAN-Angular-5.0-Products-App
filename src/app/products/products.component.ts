import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers:[ProductsService]
})
export class ProductsComponent implements OnInit {
 
  filterBy:string;
  constructor(private productService:ProductsService){}
  show:boolean=true;
  toggle():void{
    this.show=!this.show;
  }
  products:any=[];
  pagetitle='Product List';


  ngOnInit() {
  this.productService.getProducts().subscribe((data)=>{
    this.products=data;
  });
  
}

ratingFnParent(data:string){
console.log(data);
}

}
