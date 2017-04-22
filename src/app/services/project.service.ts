import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';

import { Project } from '../models/project';

@Injectable()
export class ProjectService {

    private _currentProject: BehaviorSubject<Project>;

    constructor (private api: ApiService) {
        this._currentProject = <BehaviorSubject<Project>>new BehaviorSubject(null);
    }

    get currentProject(): Observable<Project> {
        return this._currentProject.asObservable();
    }
    get currentProjectId(): number {
        return this._currentProject.getValue().id;
    }

    findAll(): Observable<Project[]> {
        return this.api.get<Project>(Project, 'projects');
    }

    findById(id: number): Observable<Project> {
        return this.api.getOne<Project>(Project, 'projects/' + id);
    }

    setCurrentProjectById(id: number): Promise<Project> {

        return new Promise((resolve, reject) => {

            this.findById(id).subscribe(project => {
                this._currentProject.next(project);
                resolve(project);
            });

        });

    }

}
