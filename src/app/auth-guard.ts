import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "./core/services/authentication/authentication.service";
import { TokenStorageService } from "./core/services/authentication/token-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {

    constructor(private tokenStorageService: TokenStorageService, private router: Router) {
    }

    canActivate(): boolean {
        console.log(this.tokenStorageService.isLoggedIn());
        if (this.tokenStorageService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }

    // canActivate(next:ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot):boolean{
    //         if(this.authenticationService.isLoggedIn()){
    //             return true;
    //         }else{
    //             this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
    //             return false;
    //         }
    // }
}

export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const authService = inject(AuthenticationService);
    const router = inject(Router);

    return inject(AuthGuard).canActivate();

    // return authService.checkLogin().pipe(
    //   map(() => true),
    //   catchError(() => {
    //     return router.createUrlTree(['route-to-fallback-page']);
    //   })
    // );
};
