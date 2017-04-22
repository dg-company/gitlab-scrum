import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {TokenService} from "./token.service";
import {Router} from "@angular/router";

@Injectable()
export class ApiService {

    public apiUrl;

    constructor (
        private http: Http,
        private tokenService: TokenService,
        private router: Router
    ) {
        this.apiUrl = (window as any).GITLAB_URL;
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

    private createModel<T>(type: { new(data: any): T; }, data: any): T {
        return new type(data);
    }

    private getRequestOptions(): RequestOptions {

        const apiToken = this.tokenService.getApiToken();

        if (!apiToken) {
            this.router.navigate([ 'setup' ]);
        }

        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        headers.append('PRIVATE-TOKEN', apiToken);

        return new RequestOptions({ headers: headers });
    }

    checkApiToken(token: string): Observable<Response> {
        const requestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'PRIVATE-TOKEN' : token
            })
        });
        return this.http.get(this.apiUrl + '/api/v4/users', requestOptions);
    }

    get<T>(model: any, path: string): Observable<T[]> {

        return this.http.get(this.apiUrl + '/api/v4/' + path, this.getRequestOptions())
            .map( (res: Response) => {
                const data = res.json();
                const objects = [];

                for (const objData of data) {
                    objects.push(this.createModel(model, objData));
                }

                return objects;
            })
            .catch(this.handleError);
    }

    getOne<T>(model: any, path: string): Observable<T> {

        return this.http.get(this.apiUrl + '/api/v4/' + path, this.getRequestOptions())
            .map( (res: Response) => {
                return this.createModel(model, res.json());
            })
            .catch(this.handleError);
    }

    post<T>(model: any, path: string, body: any): Observable<T> {

        return this.http.post(this.apiUrl + '/api/v4/' + path, body, this.getRequestOptions())
            .map( (res: Response) => {
                return this.createModel(model, res.json());
            })
            .catch(this.handleError);
    }

    put<T>(model: any, path: string, body: any): Observable<T> {

        return this.http.put(this.apiUrl + '/api/v4/' + path, body, this.getRequestOptions())
            .map( (res: Response) => {
                return this.createModel(model, res.json());
            })
            .catch(this.handleError);
    }

}
