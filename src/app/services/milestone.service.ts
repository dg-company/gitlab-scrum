import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';

import {Project} from "../models/project";
import {Milestone} from "../models/milestone";

@Injectable()
export class MilestoneService {

    constructor (
        private api: ApiService
    ) { }

    findAllActiveForProject(project: Project): Observable<Milestone[]> {
        return new Observable(observer => {

            this.api.get<Milestone>(Milestone, 'projects/' + project.id + '/milestones?state=active')
                .subscribe((milestones: Milestone[]) => {

                for (const milestone of milestones) {
                    if (milestone.startDate && milestone.startDate < new Date()) {
                        milestone.activeSprint = true;
                        console.log(milestone.startDate, new Date());
                    }
                }

                observer.next(milestones);
                observer.complete();

            });

        });
    }

}
