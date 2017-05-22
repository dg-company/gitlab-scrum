import {Component, Input} from '@angular/core';

import { Issue } from '../models/issue';
import {Milestone} from "../models/milestone";
import {IssueService} from "../services/issue.service";
import {ProjectService} from "../services/project.service";
import {FormControl, Validators} from "@angular/forms";
import {Project} from "../models/project";
import {BacklogComponent} from "./backlog.component";

@Component({
    selector: 'milestone',
    templateUrl: './../templates/milestone.html'
})
export class MilestoneComponent {

    issues: Issue[] = [];
    totalStoryPoints: number;

    @Input()
    backlog: BacklogComponent;

    createModeActive = false;
    newIssueName = new FormControl('', [
        Validators.required
    ]);

    private _milestone: Milestone;
    private project: Project;

    constructor (
        private issueService: IssueService,
        private projectService: ProjectService
    ) { }

    @Input('milestone')
    set milestone(milestone: Milestone) {
        this._milestone = milestone;
        this.load();
    }
    get milestone(): Milestone {
        return this._milestone;
    }

    load() {
        this.projectService.currentProject.subscribe(project => {

            this.project = project;

            if (this.milestone.id === 0) {
                // backlog
                this.issueService.findAllInBacklogForProject(project).subscribe((issues: Issue[]) => {
                    this.issues = issues;
                    this.sortIssues();
                    this.calculateStoryPoints();
                });
            } else {
                // milestone
                this.issueService.findByProjectAndMilestone(project, this._milestone).subscribe((issues: Issue[]) => {
                    this.issues = issues;
                    this.sortIssues();
                    this.calculateStoryPoints();
                });
            }

        });
    }

    sortIssues() {
        this.issues.sort((a: Issue, b: Issue) => {
            if (a.priority < b.priority) { return 1; }
            if (a.priority > b.priority) { return -1; }
            return 0;
        });
    }

    calculateStoryPoints() {
        this.totalStoryPoints = 0;
        for (const issue of this.issues) {
            this.totalStoryPoints += issue.storyPoints;
        }
    }

    activateCreateMode(inputEl: any) {
        this.createModeActive = true;
        setTimeout(() => {
            inputEl.focus();
        }, 200);
    }

    deactivateCreateMode() {
        this.createModeActive = false;
        this.newIssueName.setValue('');
    }

    createNewIssue() {
        this.issueService.create(this.project, this.newIssueName.value, this._milestone).subscribe(() => {

            this.deactivateCreateMode();
            this.load();

        });
    }

    assignIssue(event: any) {
        const issue: Issue = event.dragData;
        this.issueService.assignMilestone(this.project, issue, this._milestone).subscribe(() => {
            setTimeout(() => {
                this.backlog.reload();
            }, 100);
        });

    }

}
