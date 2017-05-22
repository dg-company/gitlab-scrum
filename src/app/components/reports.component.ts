import {Component, ElementRef, ViewChild} from '@angular/core';

import { OnInit } from '@angular/core';
import {Milestone} from "../models/milestone";
import {MilestoneService} from "../services/milestone.service";
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Project} from "../models/project";
import {ProjectService} from "../services/project.service";
import {IssueService} from "../services/issue.service";
import {Issue} from "../models/issue";
import {Chart} from 'chart.js';

@Component({
    templateUrl: './../templates/reports.html'
})
export class ReportsComponent implements OnInit{

    milestones: Milestone[];
    currentMilestone: Milestone;
    project: Project;
    displayReports = false;

    @ViewChild('burndownChart') burndownChartElement: ElementRef;
    burndownChart: Chart;

    workingDays = [1, 2, 3, 4, 5];

    constructor (
        private milestoneService: MilestoneService,
        private route: ActivatedRoute,
        private projectService: ProjectService,
        private issueService: IssueService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.projectService.setCurrentProjectById(+params['id']).then((project: Project) => {
                this.project = project;

                this.loadMilestones();

            });
        });

        // Init. burndown chart
        const ctx = this.burndownChartElement.nativeElement.getContext('2d');
        const self = this;
        this.burndownChart = new Chart(
            ctx,
            {
                "type": 'line',
                "data": {
                    "datasets": []
                },
                "options": {
                    responsive: false,
                    maintainAspectRatio: true,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: 'day'
                            }
                        }]
                    },
                    tooltips: {
                        enabled: true,
                        mode: 'single',
                        callbacks: {
                            label: function(tooltipItems, data) {
                                const info = self.burndownChart.data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index];
                                return info.label;
                            },
                            title: function(tooltipItems, data) {
                                const date = new Date(tooltipItems[0].xLabel);
                                return date.toLocaleDateString() + ', ' + date.toLocaleTimeString();
                            }
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return new Date(value).toLocaleDateString('de-DE', {month:'short', year:'numeric'});
                        },
                    },
                }
            }
        );
    }

    loadMilestones() {
        this.milestoneService.findAllActiveForProject(this.project).subscribe((milestones: Milestone[]) => {
            this.milestones = milestones;
            if (milestones.length > 0) {
                this.currentMilestone = milestones[0];
                this.loadReports();
            }
        });
    }

    loadReports() {

        // Get all closed issues for milestone
        this.issueService.findAllByProjectAndMilestone(this.project, this.currentMilestone).subscribe((issues: Issue[]) => {

            // Calculate total story points
            let storyPoints = 0;
            for (const issue of issues) {
                storyPoints += issue.storyPoints;
            }

            if (this.currentMilestone.startDate && this.currentMilestone.endDate) {

                // Add guideline
                const startDate = new Date(this.currentMilestone.startDate.getTime());
                startDate.setHours(0, 0, 0);

                const endDate = new Date(this.currentMilestone.endDate.getTime());
                endDate.setHours(23, 23, 59);

                const days = Math.ceil((endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24);

                // calculate working days
                let numberOfWorkingDays = 0;
                for (let i = 0; i < days; i++) {
                    const date = new Date(startDate.getTime() + i * (1000 * 60 * 60 * 24));
                    if (this.workingDays.indexOf(date.getDay()) > -1) {
                        numberOfWorkingDays++;
                    }
                }

                const pointsPerDay = storyPoints / numberOfWorkingDays;

                const guideline = {
                    label: "Guideline",
                    pointRadius: 0,
                    lineTension: 0,
                    data: []
                };

                let p = storyPoints;
                for (let i = 0; i < days; i++) {
                    const date = new Date(startDate.getTime() + i * (1000 * 60 * 60 * 24));
                    guideline.data.push({
                        x: date,
                        y: p
                    });
                    if (this.workingDays.indexOf(date.getDay()) > -1) {
                        p = p - pointsPerDay;
                    }
                }
                guideline.data.push({
                    x: endDate,
                    y: 0
                });

                // Add closed issues
                const closedIssues = [];

                const closedIssuesLine = {
                    label: "Remaining Story Points",
                    fill: false,
                    borderColor: '#92C36F',
                    lineTension: 0,
                    data: []
                };

                const closingDatePromises = [];

                for (const issue of issues) {
                    if (issue.state === "closed") {
                        const obs = this.issueService.getClosingDate(issue);
                        obs.subscribe(closingDate => {
                            if (closingDate) {
                                closedIssues.push({
                                    date: closingDate,
                                    issue: issue
                                });

                            }
                        });
                        closingDatePromises.push(obs.toPromise());
                    }
                }

                Promise.all(closingDatePromises).then(() => {

                    setTimeout(() => {
                        // Sort issues by closing date
                        closedIssues.sort((a, b) => {
                            if (a.date > b.date) { return 1; }
                            if (a.date < b.date) { return -1; }
                            return 0;
                        });

                        // Add closed issues to chart
                        p = storyPoints;

                        closedIssuesLine.data.push({
                            x: startDate,
                            y: p
                        });

                        for (let i = 0; i < closedIssues.length; i++) {
                            const closedIssue = closedIssues[i];
                            const title = closedIssue.issue.id + ': ' + closedIssue.issue.title + ' (-' + closedIssue.issue.storyPoints + ')';
                            closedIssuesLine.data.push({
                                x: closedIssue.date,
                                y: p,
                                label: title
                            });
                            p = p - closedIssue.issue.storyPoints;
                            closedIssuesLine.data.push({
                                x: closedIssue.date,
                                y: p,
                                label: title
                            });
                        }

                        this.burndownChart.data.datasets = [guideline, closedIssuesLine];
                        this.displayReports = true;
                        this.burndownChart.update();
                    }, 100);

                });

            } else {
                this.burndownChart.data.datasets = [];
                this.burndownChart.update();
                this.displayReports = false;
            }

        });

    }

}
