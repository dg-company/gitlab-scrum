import {Component, ViewChild} from '@angular/core';

import { OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import { ProjectService } from '../services/project.service';
import {Project} from "../models/project";
import {Milestone} from "../models/milestone";
import {MilestoneService} from "../services/milestone.service";
import {LabelService} from "../services/label.service";
import {Location} from "@angular/common";

@Component({
    templateUrl: './../templates/backlog.html'
})
export class BacklogComponent implements OnInit {

    milestones: Milestone[];
    project: Project;

    constructor (
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private milestoneService: MilestoneService,
        private labelService: LabelService,
        private router: Router
    ) {

    }

    ngOnInit(): void {

        this.route.params.subscribe((params: Params) => {
            this.projectService.setCurrentProjectById(+params['id']).then((project: Project) => {
                this.project = project;
                this.load(project);

                this.labelService.ensureSystemLabels(project, false).subscribe((missingTags: object[]) => {
                    if (missingTags.length > 0) {
                        this.router.navigate([ project.id, 'setup' ]);
                    }
                });

            });
        });

    }

    load(project: Project): void {

        this.milestoneService.findAllActiveForProject(project).subscribe(milestones => {
            this.milestones = milestones;

            // Backlog
            this.milestones.push(new Milestone({
                id: 0,
                iid: 0,
                title: "Backlog",
                description: ""
            }));

        });

    }

    reload(): void {
        this.load(this.project);
    }

}
