import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactUsService } from '../../services/contact-us.service';
import { CustomValidators } from '../../common/validators/custom-validators';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { MessageService } from 'primeng/api';
import { ErrorResponse } from '../../../models/error-response';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  @Input() showBreadcrumb = true;
  // errorMessage: string = '';
  contactEmail = 'lucky.getluck@gmail.com';
  errors: string[];
  subjectsOptions = [
    { value: 'FEEDBACK', label: 'Feedback' },
    { value: 'COMPLAINT', label: 'Complaint' },
    { value: 'GENERAL_SUPPORT', label: 'General Support' },
    { value: 'GENERAL_INFO', label: 'General Info' }
  ];

  selectedOption = this.subjectsOptions[0];

  contactUsForm = new FormGroup({
    fullName: new FormControl('', {
      validators: [Validators.required, CustomValidators.nameValidator()],
      nonNullable: true
    }),
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    subject: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    message: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(20),
        Validators.max(1000),
        CustomValidators.noWhitespaceValidator()
      ],
      nonNullable: true
    })
  });

  constructor(
    private readonly contactUsService: ContactUsService,
    private readonly recaptchaV3Service: ReCaptchaV3Service,
    private toastMessageService: MessageService
  ) {}

  submitForm() {
    if (this.contactUsForm.valid) {
      this.recaptchaV3Service.execute('CONTACT_US').subscribe((recaptchaToken: string) => {
        const formData = this.contactUsForm.value;
        this.contactUsService
          .submit(formData.fullName!, formData.email!, formData.message!, formData.subject!, recaptchaToken)
          .subscribe({
            next: () => {
              this.toastMessageService.add({
                detail: 'Thank you for contacting us, we will get back to you ASAP',
                severity: 'success'
              });
              this.contactUsForm.reset();
            },
            error: (error: ErrorResponse) => {
              this.errors = [];
              if (error.invalidFields && error.invalidFields.length > 0) {
                error.invalidFields.forEach((invalidField) => {
                  this.errors.push(invalidField.name + ' ' + invalidField.message);
                });
              } else if (error.detail) {
                this.errors.push(error.detail);
              }
            }
          });
      });
    }
  }
}
