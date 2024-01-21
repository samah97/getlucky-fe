import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../core/common/validators/custom-validators";

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent implements OnInit{
    billingAddressForm: FormGroup = this.createAddressFormGroup();
    // errorMsg: any;
    shippingAddressForm: FormGroup = this.createAddressFormGroup();
    isChecked: boolean =false;
    differentAddresses: boolean = true;
    ngOnInit(): void {
        // this.billingAddressForm = this.createAddressFormGroup();
        // this.shippingAddressForm  = this.createAddressFormGroup();
    }


    submitForms() {
        console.log("Billing Address:");
        console.log(this.billingAddressForm.value);
        console.log("Shipping Address:");
        console.log(this.shippingAddressForm.value);
    }



    createAddressFormGroup(){
        return new FormGroup({
            addressLine1: new FormControl('', { validators: [Validators.required] }),
            addressLine2: new FormControl('', ),
            postalCode: new FormControl('', { validators: [Validators.required] }),
            city: new FormControl('', { validators: [Validators.required] }),
            country: new FormControl('', { validators: [Validators.required] }),
        })
    }
    checkboxChanged() {
        console.log("Changed ;;; "+this.isChecked);
        this.differentAddresses = !this.isChecked;
        // if(this.isChecked){
        //
        // }
    }
}
