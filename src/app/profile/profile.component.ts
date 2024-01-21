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
export class ProfileComponent {

  constructor(private readonly userService: UserService,
              private toastMessageService:MessageService,
              private router:Router,
              private tokenStorageService:TokenStorageService
              ) {
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
