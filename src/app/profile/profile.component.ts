import { Component, OnInit } from '@angular/core';
import { UserService } from "../core/services/user.service";
import { User } from "../core/interfaces/user";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  private user: User;
  errorMsg: string = "";
  profileForm: FormGroup = new FormGroup({});

  constructor(private readonly userService: UserService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initData();
  }

  initForm() {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl(''),
      dateOfBirth: new FormControl('', [Validators.required]),
    });
  }

  initData() {
    this.userService.profile().subscribe((user) => {
      console.info("UserProfile fetched");
      this.user = user;
      this.profileForm.patchValue({
        firstName: this.user.firstName ?? '',
        lastName: this.user.lastName ?? '',
        email: this.user.email ?? '',
        dateOfBirth: this.user.dateOfBirth ?? '',
        phoneNumber: this.user.phoneNumber ?? ''
      });
    });
  }

  onSubmit() {
    const formData = this.profileForm.value;
    const user: User = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      dateOfBirth: formData.dateOfBirth,
      phoneNumber: formData.phoneNumber
    }
    console.info("Submitting UserProfile form...");
    this.userService.updateProfile(user).subscribe({
      next: value => {
        console.info("UserProfile updated");
      },
      error: err => {
        console.warn("UserProfile could not be updated");
        this.errorMsg = err;
      }
    });
  }
}
