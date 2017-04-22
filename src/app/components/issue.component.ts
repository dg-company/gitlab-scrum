import { Component } from '@angular/core';
import { Input } from '@angular/core';

import { Issue } from '../models/issue';
import {LabelService} from "../services/label.service";
import {IssueService} from "../services/issue.service";
import {MilestoneComponent} from "./milestone.component";

@Component({
    selector: 'issue',
    templateUrl: './../templates/issue.html'
})
export class IssueComponent {

    @Input()
    issue: Issue;

    @Input()
    milestone: MilestoneComponent;

    storyPoints = [];

    constructor (
        private labelService: LabelService,
        private issueService: IssueService
    ) {
        this.storyPoints = labelService.storyPoints;
    }

    setPriority(priority: number) {
        this.issueService.setPriority(this.issue, priority).subscribe(() => {
            this.milestone.calculateStoryPoints();
            this.milestone.sortIssues();
        });
    }

    setStoryPoints(points: number) {
        return this.issueService.setStoryPoints(this.issue, points).subscribe(() => {
            this.milestone.calculateStoryPoints();
        });
    }

}
