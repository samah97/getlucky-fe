import { Component } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf } from "@angular/common";
import { CategoriesService } from '../core/services/categories.service';
import { count } from 'console';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  standalone:true,
  imports:[NgForOf]
})
export class CategoryComponent {
  categories: any[] = [];

  constructor(private categoryService:CategoriesService){
    this.initData();
  }

  initData():void{  
    this.categoryService.all().subscribe((result) => {
      this.categories = result;
    });
  }


}
