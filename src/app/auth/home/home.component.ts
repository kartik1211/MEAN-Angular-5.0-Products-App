import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name:string;

  constructor(private authService:AuthService,private cookieService:CookieService) { }

  ngOnInit() {
  this.name=this.cookieService.get('UsernameCookie');  
  }
}