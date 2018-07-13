import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  username:string;
  $authObservable:Subject<any>=new Subject();

  public isjwtToken;
  public userCurrent;
  constructor(private http: HttpClient, private router: Router,private cookieService:CookieService) { }
  loginUser(user_details: any) {
   
       this.http.post('http://localhost:3000/authenticate', user_details).subscribe((data: any) => {
        console.log(data.jwtToken);
                if (!data.success) {
          alert('Please check the EmailID or Password!');
        } else {
          this.userCurrent=data.user.username;
          this.isjwtToken=data.jwtToken;
          this.$authObservable.next(this.isjwtToken);  
          this.cookieService.set('isLoggedInCookie',this.isjwtToken);
          this.cookieService.set('UsernameCookie',this.userCurrent);
          this.router.navigate(['/home']);
          
        }
    })
}

logout(){
  this.username=this.cookieService.get('UsernameCookie');
  console.log(this.username);
 
  this.http.put('http://localhost:3000/logout', {username:this.username}).subscribe((data)=>{
    console.log(data);
  });
  this.cookieService.delete('isLoggedInCookie');
  this.cookieService.delete('UsernameCookie');
  this.router.navigate(['/login']);
  this.$authObservable.next(false);
}



}
