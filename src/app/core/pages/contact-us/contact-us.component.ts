import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactUsService} from "../../services/contact-us.service";
import {CustomValidators} from "../../common/validators/custom-validators";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
    @Input() showBreadcrumb = true
    contactEmail = 'lucky.getluck@gmail.com'
    contactNumber = '+31643162287'
    contactUsForm = new FormGroup({
      fullName: new FormControl('',{validators:[Validators.required,CustomValidators.nameValidator()], nonNullable:true}),
      email: new FormControl('',{validators:[Validators.required, Validators.email], nonNullable:true}),
      message: new FormControl('',{
        validators:[Validators.required, Validators.minLength(10),Validators.max(5000),CustomValidators.noWhitespaceValidator()
        ],nonNullable:true})
    });

    constructor(private readonly contactUsService:ContactUsService) {
    }

  submitForm() {
      if(this.contactUsForm.valid){
        const formData = this.contactUsForm.value;
        this.contactUsService.submit(formData.fullName!,formData.email!,formData.message!).subscribe({
          next:()=>{

          }
        })
      }

  }
}
