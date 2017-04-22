import {Component} from '@angular/core';

import { OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Project} from "../models/project";
import {ProjectService} from "../services/project.service";
import {LabelService} from "../services/label.service";

@Component({
    templateUrl: './../templates/project-setup.html'
})
export class ProjectSetupComponent implements OnInit {

    missingLabels: string[];
    project: Project;

    constructor (
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private labelService: LabelService,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.route.params.subscribe((params: Params) => {
            this.projectService.setCurrentProjectById(+params['id']).then((project: Project) => {

                this.project = project;

                this.labelService.ensureSystemLabels(project, false).subscribe((missingLabels: string[]) => {

                    this.missingLabels = missingLabels;

                });

            });
        });

    }

    setup() {
        this.labelService.ensureSystemLabels(this.project, true).subscribe((missingLabels: string[]) => {
            this.router.navigate([ this.project.id, 'backlog' ]);
        });
    }

}
