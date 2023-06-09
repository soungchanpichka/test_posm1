import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, CanMatch , RouterStateSnapshot , Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanMatch
{
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router,
        @Inject(DOCUMENT) private document: Document
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------



 


    /**
     * Can match
     *
     * @param route
     * @param segments
     */
    canMatch(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
    {
        return this._check(segments);
        // return this._check('/');
    }



    
    // canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean
    // {
    //     return this._check('/');
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     *
     * @param segments
     * @private
     */
    private _check(segments: UrlSegment[]): Observable<boolean | UrlTree>
    {
        // Check the authentication status
        return this._authService.check().pipe(
            switchMap((authenticated) => {

                // If the user is not authenticated...
                if ( !authenticated )
                {
                    // Redirect to the sign-in page with a redirectUrl param
                    const redirectURL = `/${segments.join('')}`;
                    const urlTree = this._router.parseUrl(`sign-in?redirectURL=${redirectURL}`);

                    return of(urlTree);

                    // if(redirectURL) {
                    //     const returnUrl = 'https://loyalty.cellcard.com.kh/#/sign-in/{token}&returnUrl='+redirectURL;
                    //     this.document.location.href = 'https://www.camgsm.com.kh/home/#/sign-in?redirectURL='+btoa(returnUrl);
                    // } else {
                    //     this.document.location.href = 'https://www.camgsm.com.kh/home/#/sign-in';
                    // }
                }

                // Allow the access
                return of(true);
            })
        );
    }
}
