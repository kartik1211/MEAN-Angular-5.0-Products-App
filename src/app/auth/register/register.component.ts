import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform:any={};
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
  }
register(){
  this.http.post('http://localhost:3000/userRegister',this.registerform).subscribe((data)=>{
      console.log(data);
    });
    this.router.navigate(['/login']);
  }

  BackToLogin(){
    this.router.navigate(['/login']);
    
  }
}
