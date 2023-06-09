import { Component, OnInit, ViewChild, ViewEncapsulation , AfterViewInit, Inject} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { DOCUMENT } from '@angular/common';
import { values } from 'lodash';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignInComponent implements OnInit, AfterViewInit
{ 
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    isDoneloading: boolean = false;
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        @Inject(DOCUMENT) private document: Document,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        this.signInForm = this._formBuilder.group({
            username     : ['', Validators.required],
            email  : ['', Validators.required],
            // rememberMe: ['']
        });
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.isDoneloading = true;
          }, 500);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    // signIn(): void
    // {
    //     // Return if the form is invalid
    //     if ( this.signInForm.invalid )
    //     {
    //         return;
    //     }

    //     // Disable the form
    //     this.signInForm.disable();

    //     // Hide the alert
    //     this.showAlert = false;

    //     // Sign in
    //     this._authService.signIn(this.signInForm.value)
    //         .subscribe(
    //             () => {

    //                 // Set the redirect url.
    //                 // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
    //                 // to the correct page after a successful sign in. This way, that url can be set via
    //                 // routing file and we don't have to touch here.
    //                 const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

    //                 // Navigate to the redirect url
    //                 this._router.navigateByUrl(redirectURL);

    //             },
    //             (response) => {

    //                 // Re-enable the form
    //                 this.signInForm.enable();

    //                 // Reset the form
    //                 this.signInNgForm.resetForm();

    //                 // Set the alert
    //                 this.alert = {
    //                     type   : 'error',
    //                     message: 'Wrong email or password'
    //                 };

    //                 // Show the alert
    //                 this.showAlert = true;
    //             }
    //         );
    // }


    signIn(): void
    {
        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value)
            .subscribe(
                (res) => {
                    // sign in camgsm old web
                    this._router.navigateByUrl('/example');
                },
                (response) => {


                    // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm({type: this.signInForm.controls['type'].value});

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Wrong username or password'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
            console.log(this.signInForm.value)
    }
}
