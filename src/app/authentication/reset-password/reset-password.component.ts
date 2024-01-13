import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UUIDValidator } from '../../core/common/util/uuidvalidator';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';

const SUCCESS_MESSAGE = 'Your password has been reset, you can now login!';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {

  id: string;
  token: string;
  resetPasswordForm = new FormGroup({
    newPassword: new FormControl('', { validators: [Validators.required] }),
    confirmNewPassword: new FormControl('', { validators: [Validators.required] }),
  });
  errorMessage: any;

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      // Access the dynamic route parameters
      this.id = params['id'];
      this.token = params['token'];

      if (this.paramsAreInvalid()) {
        this.router.navigate(['/pages/page-not-found']);
      }
    });
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      const formData = this.resetPasswordForm.value;
      if (formData.newPassword) {
        this.authenticationService.resetPassword(formData.newPassword, this.id, this.token).subscribe({
          next: () => {
            this.router.navigate(['/pages/result'], { queryParams: { title: 'Perfect!', message: SUCCESS_MESSAGE }, skipLocationChange: true });
          },
          error: (err) => {
            this.errorMessage = err;
          }
        });
      }
    }
  }

  paramsAreInvalid(): boolean {
    return !this.id
      || !this.token
      || !UUIDValidator.isValid(this.id)
      || !UUIDValidator.isValid(this.token);
  }
}
