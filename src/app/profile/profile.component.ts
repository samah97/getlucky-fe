import { Component, OnInit } from '@angular/core';
import { UserService } from "../core/services/user.service";
import { User } from "../core/interfaces/user";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CustomValidators } from '../core/common/validators/custom-validators';
import {MessageService} from "primeng/api";
import {AppDialogService} from "../core/shared/dialog/app-dialog.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../core/services/authentication/token-storage.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  private user: User;
  errorMsg: string = "";
  profileForm: FormGroup = new FormGroup({});
  changePasswordErrorMsg: string = "";
  changePasswordForm: FormGroup = new FormGroup({});

  constructor(private readonly userService: UserService,
              private toastMessageService:MessageService,
              private dialogService:AppDialogService,
              private router:Router,
              private tokenStorageService:TokenStorageService
              ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initData();
  }

  initForm() {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', { validators: [Validators.required, CustomValidators.nameValidator()] }),
      lastName: new FormControl('', { validators: [Validators.required, CustomValidators.nameValidator()] }),
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
    if (this.profileForm.valid) {
      const formData = this.profileForm.value;
      const user: User = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        ...(formData.phoneNumber !== '' && { phoneNumber: formData.phoneNumber })
      }
      this.userService.updateProfile(user).subscribe({
        next: value => {
            this.toastMessageService.add({
                severity:'success',
                detail:'Profile Saved'
            })
        },
        error: err => {
          this.errorMsg = err;
        }
      });
    }
  }

    clickDeleteAccount() {

        this.userService.removeProfile().subscribe({
            next:()=>{
                this.tokenStorageService.signOut().then(()=>{
                    console.log("SIGNED OUT")
                    this.toastMessageService.add({
                        key:'global-toast',
                        detail:'Your Account has been deleted',
                        severity:'success'
                    })
                    this.router.navigate(["/"]);
                });
            }
        });
    }

}
