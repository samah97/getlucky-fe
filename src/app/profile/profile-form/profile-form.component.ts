import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidators} from "../../core/common/validators/custom-validators";
import {User} from "../../core/interfaces/user";
import {UserService} from "../../core/services/user.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.scss'
})
export class ProfileFormComponent implements OnInit{

    errorMsg: string = "";
    profileForm: FormGroup = new FormGroup({});
    private user: User;
    @Input() profileSavedExtraHandler: () => void;

    constructor(private readonly userService: UserService,
                private toastMessageService:MessageService) {
    }

    ngOnInit(): void {
        this.initForm();
        this.initData();
    }

    initForm() {
        this.profileForm = new FormGroup({
            firstName: new FormControl('', { validators: [Validators.required, CustomValidators.nameValidator()] }),
            lastName: new FormControl('', { validators: [Validators.required, CustomValidators.nameValidator()] }),
            email: new FormControl({value:'',disabled:true}, [Validators.required, Validators.email]),
            phoneNumber: new FormControl(''),
            dateOfBirth: new FormControl('', [Validators.required],),
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
                email: this.user.email,
                dateOfBirth: formData.dateOfBirth,
                ...(formData.phoneNumber !== '' && { phoneNumber: formData.phoneNumber })
            }
            this.userService.updateProfile(user).subscribe({
                next: value => {
                    this.toastMessageService.add({
                        severity:'success',
                        detail:'Profile Saved'
                    })
                    this.profileSavedExtraHandler();
                },
                error: err => {
                    this.errorMsg = err;
                }
            });
        }
    }

    handleEmailChange(){
        this.profileForm.get('email')?.setValue(this.user.email);
    }
}
