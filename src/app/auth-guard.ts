import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "./core/services/authentication/authentication.service";
import { Observable } from "rxjs";
import { nextTick } from "process";

@Injectable({
    providedIn:'root'
})
export class AuthGuard{

    constructor(private authenticationService:AuthenticationService, private router:Router){

    }

    canActivate(): boolean {
        // console.log("CAN ACTIVATE");
        // console.log("logged? ");
        // console.log(this.authenticationService.isLoggedIn());
        // if(this.authenticationService.isLoggedIn()){
        //     return true;
        // }else{
        //     this.router.navigate(['/auth/login']);
        //     return false;
        // }
        return true;
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
    console.log("IN THIS WEIRD FUNCTIONS")
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
