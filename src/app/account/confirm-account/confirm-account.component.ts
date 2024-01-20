import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../core/services/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UUIDValidator} from "../../core/common/util/uuidvalidator";

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrl: './confirm-account.component.scss'
})
export class ConfirmAccountComponent implements OnInit{
    showResult: boolean = false;

    constructor(private accountService:AccountService,private route: ActivatedRoute, private router: Router,) {
    }
    ngOnInit(): void {
        console.log("Confirming Account");
        this.route.params.subscribe((params: any) => {
            // Access the dynamic route parameters
            const id = params['id'];
            const token = params['token'];
            this.validateParams(id,token);
            this.accountService.confirmAccount(id,token).subscribe({
                next:()=>{
                    this.showResult = true;
                },
                error:()=>{
                    this.router.navigate(['/pages/result'], { queryParams: { title: 'ERROR!', message: 'Something Went Wrong!' }, skipLocationChange: true });
                }
            })
        });
    }

    validateParams(id:string, token:string) {
        if(!id
            || !token
            || !UUIDValidator.isValid(id)
            || !UUIDValidator.isValid(token)){

            this.router.navigate(['/pages/page-not-found']);
        }

    }
}
