import { Injectable } from '@angular/core';

import {LocalStorageService} from "ngx-webstorage";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class TokenService {

    private apiToken;
    private apiTokenObserver: BehaviorSubject<string>;

    constructor (
        private localStorage: LocalStorageService
    ) {
        this.apiTokenObserver = <BehaviorSubject<string>>new BehaviorSubject(null);
    }

    getApiTokenObservable(): Observable<string> {
        return this.apiTokenObserver.asObservable();
    }

    getApiToken(): string {
        if (this.apiToken) {
            return this.apiToken;
        } else {
            this.apiToken = this.localStorage.retrieve('apiToken');
            if (!this.apiToken) {
                return null;
            }
            this.apiTokenObserver.next(this.apiToken);
            return this.apiToken;
        }
    }

    setApiToken(token: string) {
        this.apiToken = token;
        this.apiTokenObserver.next(token);
        this.localStorage.store('apiToken', token);
    }

}
