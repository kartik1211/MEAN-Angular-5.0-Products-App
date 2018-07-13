import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import {  } from 'selenium-webdriver';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  userForm:FormGroup;
  constructor(private _fb:FormBuilder,private http:HttpClient) { }

  ngOnInit() {
   this.userForm= this._fb.group({
    productId:['',[Validators.required,Validators.minLength(3)]],
    productName:['',Validators.required],
    productCode:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]')]],
    releaseDate:['',Validators.required],
    description:['',Validators.required],
    price:['',Validators.required],
    starRating:['',Validators.required],
    imageUrl:['',Validators.required]
    
    });
  }

  createProduct(){
    this.http.post('http://localhost:3000/createProduct',this.userForm.value).subscribe(data=>{
      console.log(data);
    });
  }
}