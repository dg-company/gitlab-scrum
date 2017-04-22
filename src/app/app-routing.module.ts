import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BacklogComponent } from './components/backlog.component';
import { WelcomeComponent } from './components/welcome.component';
import { ReportsComponent } from "./components/reports.component";
import { SetupComponent } from "./components/setup.component";
import { ProjectSetupComponent } from "./components/project-setup.component";

const routes: Routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: ':id/backlog', component: BacklogComponent },
    { path: ':id/reports', component: ReportsComponent },
    { path: ':id/setup', component: ProjectSetupComponent },
    { path: 'setup', component: SetupComponent },
    { path: '**', component: WelcomeComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
