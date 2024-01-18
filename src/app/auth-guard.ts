import { Injectable, inject } from "@angular/core";
import {  CanActivateFn, Router} from "@angular/router";
import { TokenStorageService } from "./core/services/authentication/token-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(private tokenStorageService: TokenStorageService, private router: Router) {
    }

    canActivate(): boolean {
        if (this.tokenStorageService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }


}

export const canActivate: CanActivateFn = () => {
    return inject(AuthGuard).canActivate();
};
