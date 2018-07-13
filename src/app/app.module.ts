import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProductsService } from './products/products.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './auth/home/home.component';
import { NavigationComponent } from './auth/navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthinterceptorService } from './auth/authinterceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
 
    HomeComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'products', loadChildren:"app/products/products/products.module#ProductsModule"},
      {path:'home',component:HomeComponent},
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent},
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'**',redirectTo:'login'},  
    ])
  ],
  providers: [ProductsService,AuthService,CookieService,AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthinterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }


