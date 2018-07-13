import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../products.component';
import { DetailComponent } from '../detail/detail.component';
import { CreateComponent } from '../create/create.component';
import { ProductsPipe } from '../products.pipe';
import {RouterModule} from '@angular/router';
import { RatingComponent } from '../rating/rating.component';
import { AuthGuard } from '../../auth/auth.guard';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthinterceptorService } from '../../auth/authinterceptor.service';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      {path:'',component:ProductsComponent, canActivate:[AuthGuard],
      children:[
        {path:'create',component:CreateComponent}
      ],
    },
    {path:':pCode',component:DetailComponent}
    ])
  ],
  declarations: [   ProductsComponent,CreateComponent,
    ProductsPipe,DetailComponent,
    RatingComponent]
    ,
    providers:[
      {provide:HTTP_INTERCEPTORS,
      useClass:AuthinterceptorService,
    multi:true}
    ]
})
export class ProductsModule { }
