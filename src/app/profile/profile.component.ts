import {Component, OnInit} from '@angular/core';
import {UserService} from "../core/services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
    constructor(private userService:UserService) {

    }

    ngOnInit() {

      this.initData();
    }

    initData(){
      console.log("CALLING GET PROFILE");
        // this.userService.profile().subscribe((response)=>{
        //     console.log("Profile Retrieved");
        //     console.log(response);
        // })
    }


}
