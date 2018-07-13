import { Injectable } from '@angular/core';
import { HttpInterceptor,HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable()
export class AuthinterceptorService implements HttpInterceptor{
  intercept(req,next){

    var token=this.cookieService.get('isLoggedInCookie');
    var authRequest=req.clone({
      headers: new HttpHeaders().set('authtoken',token)
    });
    return next.handle(authRequest);
  }

  constructor(private cookieService:CookieService) { }

}
