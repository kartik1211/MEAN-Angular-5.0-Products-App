import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private router:Router,private http:HttpClient) { }
public prodCode:any;
public selectedProduct:any;
  ngOnInit() {
  this.activatedRoute.params.subscribe((data)=>{
    this.prodCode=data  
    console.log(data);
  });
  this.http.post('http://localhost:3000/getProductInfo',this.prodCode).subscribe((data:any)=>{

    console.log(data);
    this.selectedProduct=data.user;
  });
  }

  goBack(){
    this.router.navigate(['/products']);
  }

}
