import {Component, OnInit} from '@angular/core';
import {UserService} from "../core/services/user.service";
import {User} from "../core/interfaces/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  user:User;
  profileForm:FormGroup = new FormGroup({});

  constructor(private readonly userService:UserService, private fb:FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initData();
  }

  initData(){
      this.userService.profile().subscribe((user)=>{
        console.log("Profile Retrieved");
        console.log(user);
        this.user = user;
        console.log(this.user);
        this.profileForm.patchValue({
          firstName: this.user.firstName ?? '',
          lastName: this.user.lastName ?? '',
          email: this.user.email ?? '',
          dateOfBirth:this.user.dateOfBirth ??''
          // phone:this.user.phoneNumber ?? ''
        });
      })
  }

  initForm(){
    this.profileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl(''),
      dateOfBirth: new FormControl(''),
    });
  }


  onSubmit() {
    console.log("FORM SUBMITED");
    console.log(this.profileForm.value);
    const formData = this.profileForm.value;
    const user:User = {
      firstName:formData.firstName,
      lastName:formData.lastName,
      email:formData.email,
      dateOfBirth:formData.dateOfBirth
    }
    this.userService.updateProfile(user).subscribe({
      next: value => {
          console.log("Response Received")
          console.log(value);
      },
      error: err => {
        console.log("ERROR")
        console.log(err);
      }
    });
  }
}
