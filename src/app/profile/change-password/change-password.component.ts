import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../core/services/user.service";

const MIN_PASSWORD_LENGTH: number = 10;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup<any> = new FormGroup({
    currentPass: new FormControl('', { validators: [Validators.required] }),
    newPass: new FormControl('', { validators: [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)] }),
    confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)])
  });
  errorMsg: any;

  constructor(private readonly userService: UserService) {
  }

  onSubmit() {
    if (this.changePasswordForm.valid && this.passwordsMatch()) {
      const formData = this.changePasswordForm.value;
      this.userService.changePassword(formData).subscribe({
        next: value => {
        },
        error: err => {
          this.errorMsg = err;
        }
      });
    }
  }

  passwordsMatch(): boolean {
    return this.changePasswordForm.value.newPass === this.changePasswordForm.value.confirmNewPassword;
  }
}
