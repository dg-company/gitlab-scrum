import {Component} from '@angular/core';

import { OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {Router} from "@angular/router";
import {TokenService} from "../services/token.service";

@Component({
    templateUrl: './../templates/setup.html'
})
export class SetupComponent {

    token = new FormControl('', [
        Validators.required
    ]);

    tokenisInvalid = false;

    apiUrl: string;

    constructor (
        private api: ApiService,
        private router: Router,
        private tokenService: TokenService
    ) {
        this.apiUrl = api.apiUrl;
    }

    checkToken() {
        this.tokenisInvalid = false;
        this.api.checkApiToken(this.token.value).subscribe(() => {
            this.tokenService.setApiToken(this.token.value);
            this.router.navigate([ 'welcome' ]);
        },
        () => {
            this.tokenisInvalid = true;
        });
    }

}
