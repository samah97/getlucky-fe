import { Component } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import { ProductsComponent } from '../products/products.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone:true,
  imports: [CategoryComponent,ProductsComponent,CommonModule]
})
export class HomeComponent {

  

  constructor(){
  }

}
