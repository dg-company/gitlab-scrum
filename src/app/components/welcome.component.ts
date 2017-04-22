import {Component, OnInit} from '@angular/core';
import {Project} from "../models/project";
import {ProjectService} from "../services/project.service";
import {TokenService} from "../services/token.service";

@Component({
    templateUrl: './../templates/welcome.html'
})
export class WelcomeComponent implements OnInit{

    projects: Project[];

    constructor (
        private projectService: ProjectService,
        private tokenService: TokenService
    ) { }

    ngOnInit(): void {
        this.getProjects();
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
