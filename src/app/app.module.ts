import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DndModule } from 'ng2-dnd';
import { SweetAlert2Module } from '@toverux/ngsweetalert2';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Modules
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './components/app.component';
import { WelcomeComponent } from './components/welcome.component';
import { BacklogComponent } from './components/backlog.component';
import { NavigationComponent } from './components/navigation.component';
import { IssueComponent } from './components/issue.component';
import { MilestoneComponent } from './components/milestone.component';
import { ReportsComponent } from "./components/reports.component";
import { SetupComponent } from "./components/setup.component";

// Services
import { ApiService } from './services/api.service';
import { ProjectService } from './services/project.service';
import { IssueService } from './services/issue.service';
import { MilestoneService } from './services/milestone.service';
import { LabelService } from './services/label.service';
import {Ng2Webstorage} from "ngx-webstorage";
import {ProjectSetupComponent} from "./components/project-setup.component";
import {TokenService} from "./services/token.service";

// Init
@NgModule({
  imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      HttpModule,
      JsonpModule,
      ReactiveFormsModule,
      DndModule.forRoot(),
      SweetAlert2Module.forRoot({}),
      BsDropdownModule.forRoot(),
      Ng2Webstorage
  ],
  declarations: [
      AppComponent,
      WelcomeComponent,
      NavigationComponent,
      BacklogComponent,
      IssueComponent,
      MilestoneComponent,
      ReportsComponent,
      SetupComponent,
      ProjectSetupComponent
  ],
  providers: [
      ApiService,
      ProjectService,
      IssueService,
      MilestoneService,
      LabelService,
      TokenService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
