import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit{
  

  title:string
  message:string
  redirectUrl:string;

  constructor(private activatedRoute:ActivatedRoute, private router:Router){

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params)=>{
      if(!params.hasOwnProperty('message')){
        this.router.navigate(['/']);
      }else{
        this.title = params?.['title'] ?? 'Thank You';
        this.message = params?.['message'];      
      }
    });
  }

}
