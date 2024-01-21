import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactUsService } from '../../services/contact-us.service';
import { CustomValidators } from '../../common/validators/custom-validators';
import { environment } from '../../../../environments/environment';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactUsService} from "../../services/contact-us.service";
import {CustomValidators} from "../../common/validators/custom-validators";
import {environment} from "../../../../environments/environment";
import {ReCaptchaV3Service} from "ng-recaptcha";
import {DialogConfig} from "../../shared/dialog/dialog-config";
import {AppDialogService} from "../../shared/dialog/app-dialog.service";
// import {ReCaptchaV3Service} from "ng-recaptcha";
declare var $: any;
@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
    @Input() showBreadcrumb = true;
    contactEmail = 'lucky.getluck@gmail.com';
    dialogConfig = {
        buttonLabel: 'Perfect',
        displayDialog: false,
        dialogMessage: '',
        buttonClickHandler: this.closeDialog,
        dialogHeader: ''
    } as DialogConfig;

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
        subject: new FormControl('FEEDBACK', { validators: [Validators.required], nonNullable: true }),
        message: new FormControl('', {
            validators: [
                Validators.required,
                Validators.minLength(10),
                Validators.max(5000),
                CustomValidators.noWhitespaceValidator()
            ],
            nonNullable: true
        })
    });


    constructor(private readonly contactUsService:ContactUsService,
                private readonly recaptchaV3Service:ReCaptchaV3Service,
                private dialogService:AppDialogService) {
    }

    closeDialog() {
        this.dialogService.hideDialog();
    }

    submitForm() {
        if (this.contactUsForm.valid) {
            this.recaptchaV3Service.execute('CONTACT_US').subscribe((recaptchaToken: string) => {
                const formData = this.contactUsForm.value;
                this.contactUsService
                    .submit(formData.fullName!, formData.email!, formData.message!, formData.subject!, recaptchaToken)
                    .subscribe({
                        next: () => {
                            this.showDialog('Thank you for contacting us, we will get back to you ASAP');
                            this.contactUsForm.reset();
                        }
                    });
            });
        }
    }
    showDialog(message: string) {
        this.dialogService.showDialog(this.dialogConfig)
    }
}
