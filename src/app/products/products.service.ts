import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ProductsService {

  public token;
  constructor(private httpClient:HttpClient,private cookieService:CookieService) { }
getProducts(){

  this.token=this.cookieService.get('isLoggedInCookie');
   return this.httpClient.get('http://localhost:3000/getProducts');
}
}
