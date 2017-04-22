import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { ProjectService } from '../services/project.service';
import { Project } from '../models/project';
import {TokenService} from "../services/token.service";

@Component({
    selector: 'nav',
    templateUrl: './../templates/navigation.html'
})
export class NavigationComponent implements OnInit {

    currentProject: Project;
    projects: Project[];

    constructor (
        private projectService: ProjectService,
        private tokenService: TokenService
    ) { }

    ngOnInit(): void {
        this.getProjects();
        this.projectService.currentProject.subscribe(project => {
            this.currentProject = project;
        });
        this.tokenService.getApiTokenObservable().subscribe(() => {
            this.getProjects();
        });
    }

    getProjects() {
        const self = this;
        this.projectService.findAll().subscribe(
            (projects) => {
                self.projects = projects;
            }
        );
    }

}
