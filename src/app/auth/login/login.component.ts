import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform:any={};
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }

  register(){
    this.router.navigate(['/register']);
  }

  login(){
   this.authService.loginUser(this.loginform);
  }
}
