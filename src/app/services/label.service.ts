import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';

import {Project} from "../models/project";
import {Label} from "../models/label";

@Injectable()
export class LabelService {

    public priorityPrefix = '❕';
    public storyPointsPrefix = '⏱';

    public priorities = [
        "Lowest",
        "Low",
        "Medium",
        "High",
        "Highest"
    ];
    public priorityColors = [
        "#55A557",
        "#2A8735",
        "#EA7D24",
        "#EA4444",
        "#CE0000"
    ];

    public storyPoints = [1, 2, 3, 5, 8, 13, 20, 40, 100];

    constructor (
        private api: ApiService
    ) { }

    ensureSystemLabels(project: Project, create: boolean) {
        return new Observable(observer => {

            // find all existing labels
            this.findAll(project).subscribe((labels: Label[]) => {

                const existingLabels = {};
                const missingLabels = [];

                for (const label of labels) {
                    if (label.description) {
                        if (
                            label.description.match('^priority\[[0-9]+\]') ||
                            label.description.match('^storyPoints\[[0-9]+\]')
                        ) {
                            existingLabels[label.description] = true;
                        }
                    }
                }

                // priorities
                for (let i = 0; i < this.priorities.length; i++) {
                    const labelName = 'priority[' + (i + 1) + ']';

                    if (existingLabels[labelName] === undefined) {

                        const name = this.priorityPrefix + ' ' + this.priorities[i];
                        const color = this.priorityColors[i];

                        missingLabels.push({
                            name: name,
                            color: color
                        });

                        if (create) {
                            this.create(project, name, color, labelName, 500 + i).subscribe(() => {});
                        }
                    }

                }

                // story points
                for (const points of this.storyPoints) {
                    const labelName = 'storyPoints[' + points + ']';

                    if (existingLabels[labelName] === undefined) {

                        const name = this.storyPointsPrefix + ' ' + points;
                        const color = '#BCC2C7';

                        missingLabels.push({
                            name: name,
                            color: color
                        });

                        if (create) {
                            this.create(project, name, color, labelName, 400 + points).subscribe(() => {});
                        }
                    }

                }

                if (create) {
                    observer.next([]);
                } else {
                    observer.next(missingLabels);
                }
                observer.complete();

            });

        });
    }

    findAll(project: Project): Observable<Label[]> {
        return this.api.get<Label>(Label, 'projects/' + project.id + '/labels');
    }

    create(project: Project, name: string, color: string, description: string, priority: number): Observable<Label> {
        return this.api.post<Label>(Label, 'projects/' + project.id + '/labels', {
            name: name,
            color: color,
            description: description,
            priority: priority
        });
    }

    parse(labels: string[]): object {
        const labelInfo = {
            priority: null,
            storyPoints: null
        };
        for (const label of labels) {
            if (label.match('^' + this.priorityPrefix)) {
                labelInfo.priority = label.substr(2);
            } else if (label.match('^' + this.storyPointsPrefix)) {
                labelInfo.storyPoints = label.substr(2);
            }
        }
        return labelInfo;
    }

}
