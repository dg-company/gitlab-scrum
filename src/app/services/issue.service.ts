import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ApiService } from './api.service';

import { Issue } from '../models/issue';
import {Project} from "../models/project";
import {Milestone} from "../models/milestone";
import {LabelService} from "./label.service";
import {IssueComment} from "../models/issue-comment";

@Injectable()
export class IssueService {

    constructor (
        private api: ApiService,
        private labelService: LabelService
    ) { }

    parseLabels(issues: Issue[]) {
        for (const issue of issues) {

            const labelInfo = this.labelService.parse(issue.labels);

            if (labelInfo['priority']) {
                issue.priority = this.labelService.priorities.indexOf(labelInfo['priority']) + 1;
            }

            if (labelInfo['storyPoints']) {
                issue.storyPoints = +labelInfo['storyPoints'];
            }

        }
    }

    findAllInBacklogForProject(project: Project): Observable<Issue[]> {
        return new Observable(observer => {

            this.api.get<Issue>(Issue, 'projects/' + project.id + '/issues?state=opened&milestone=No%20Milestone').subscribe(issues => {

                this.parseLabels(issues);

                observer.next(issues);
                observer.complete();

            });

        });
    }

    findByProjectAndMilestone(project: Project, milestone: Milestone): Observable<Issue[]> {
        return new Observable(observer => {

            this.api.get<Issue>(Issue, 'projects/' + project.id + '/issues?state=opened&milestone=' + milestone.title).subscribe(issues => {

                this.parseLabels(issues);

                observer.next(issues);
                observer.complete();

            });

        });
    }

    findAllByProjectAndMilestone(project: Project, milestone: Milestone): Observable<Issue[]> {
        return new Observable(observer => {

            this.api.get<Issue>(Issue, 'projects/' + project.id + '/issues?milestone=' + milestone.title).subscribe(issues => {

                this.parseLabels(issues);

                observer.next(issues);
                observer.complete();

            });

        });
    }

    create(project: Project, title: string, milestone: Milestone): Observable<Issue> {

        const data = {
            title: title
        };

        if (milestone && milestone.id) {
            data['milestone_id'] = milestone.id;
        }

        return this.api.post<Issue>(Issue, 'projects/' + project.id + '/issues', data);
    }

    assignMilestone(project: Project, issue: Issue, milestone: Milestone) {

        const data = {};

        if (milestone && milestone.id) {
            data['milestone_id'] = milestone.id;
        } else {
            data['milestone_id'] = "";
        }

        return this.api.put<Issue>(Issue, 'projects/' + project.id + '/issues/' + issue.iid, data);
    }

    setPriority(originalIssue: Issue, priority: number) {
        return new Observable(observer => {

            // get fresh issue data
            this.api.getOne<Issue>(Issue, 'projects/' + originalIssue.projectId + '/issues/' + originalIssue.iid).subscribe(issue => {

                const newLabels = [];

                // remove old priority labels
                for (const index in issue.labels) {
                    if (issue.labels.hasOwnProperty(index)) {
                        const label = issue.labels[index];

                        if (!label.match('^' + this.labelService.priorityPrefix)) {
                            newLabels.push(label);
                        }

                    }
                }

                // add new priority label
                if (priority > 0) {
                    newLabels.push(this.labelService.priorityPrefix + ' ' + this.labelService.priorities[priority - 1]);
                }

                this.api.put<Issue>(Issue, 'projects/' + originalIssue.projectId + '/issues/' + originalIssue.iid, {
                    labels: newLabels.join(",")
                }).subscribe(() => {
                    originalIssue.priority = priority;
                    observer.next();
                    observer.complete();
                });

            });

        });
    }

    setStoryPoints(originalIssue: Issue, points: number) {
        return new Observable(observer => {

            // get fresh issue data
            this.api.getOne<Issue>(Issue, 'projects/' + originalIssue.projectId + '/issues/' + originalIssue.iid).subscribe(issue => {

                const newLabels = [];

                // remove old story points labels
                for (const index in issue.labels) {
                    if (issue.labels.hasOwnProperty(index)) {
                        const label = issue.labels[index];

                        if (!label.match('^' + this.labelService.storyPointsPrefix)) {
                            newLabels.push(label);
                        }

                    }
                }

                // add new story points label
                if (points > 0) {
                    newLabels.push(this.labelService.storyPointsPrefix + ' ' + points);
                }

                this.api.put<Issue>(Issue, 'projects/' + originalIssue.projectId + '/issues/' + originalIssue.iid, {
                    labels: newLabels.join(",")
                }).subscribe(() => {
                    originalIssue.storyPoints = points;
                    observer.next();
                    observer.complete();
                });

            });

        });
    }

    getClosingDate(issue: Issue): Observable<Date> {
        return new Observable(observer => {

            // get issue comments
            this.api.get<IssueComment>(IssueComment, 'projects/' + issue.projectId + '/issues/' + issue.iid + '/notes')
                .subscribe((comments: IssueComment[]) => {

                let closingDate = null;

                for (const comment of comments) {
                    if (comment.body === "closed") {
                        closingDate = comment.createdAt;
                        break;
                    }
                }

                observer.next(closingDate);
                observer.complete();

            });

        });
    }

}
