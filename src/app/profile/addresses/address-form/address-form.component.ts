import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../../core/common/validators/custom-validators";
import {Country} from "../../../core/enums/country";
import {AddressRequest} from "../../../core/interfaces/address-request";
import {Address} from "../../../models/Address";


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
    // countryCodes= Object.keys(Country);
    countryCodes = Object.entries(Country).map(([key, value])=>{
        return {code: key,name:value}
    })
    // @Input() addressFormSubmittedHandler: (request:Address) => void;
    @Output() addressFormSubmitted = new EventEmitter<Address>();


    ngOnInit(): void {
    }


    submitForms() {
        if(this.isChecked){
            Object.keys(this.billingAddressForm.controls).forEach(controlName => {
                this.shippingAddressForm.get(controlName)?.setValue(this.billingAddressForm.get(controlName)?.value);
            });
        }
        this.addressFormSubmitted.emit({
            billingAddress:this.billingAddressForm.value,
            shippingAddress:this.shippingAddressForm.value
        });
    }



    createAddressFormGroup(){
        return new FormGroup({
            line1: new FormControl('', { validators: [Validators.required] }),
            line2: new FormControl('', ),
            postalCode: new FormControl('', { validators: [Validators.required] }),
            city: new FormControl('', { validators: [Validators.required] }),
            country: new FormControl('', { validators: [Validators.required] }),
        })
    }
    checkboxChanged() {
        console.log("Changed ;;; "+this.isChecked);
        this.differentAddresses = !this.isChecked;
    }
}
