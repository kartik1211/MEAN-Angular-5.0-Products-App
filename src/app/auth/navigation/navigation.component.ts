import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router:Router,private cookieService:CookieService,private http:HttpClient,private authService:AuthService) { }

  toggleLinks: Boolean=false;

  ngOnInit() {
    this.authService.$authObservable.subscribe((data)=>{
    this.toggleLinks=data;
    })
  }

  logout(){
   this.authService.logout();
 
  }
}
