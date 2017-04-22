webpackJsonp([1,5],{

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_milestone__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_issue_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_project_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__backlog_component__ = __webpack_require__(73);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MilestoneComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MilestoneComponent = (function () {
    function MilestoneComponent(issueService, projectService) {
        this.issueService = issueService;
        this.projectService = projectService;
        this.issues = [];
        this.createModeActive = false;
        this.newIssueName = new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["c" /* FormControl */]('', [
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* Validators */].required
        ]);
    }
    Object.defineProperty(MilestoneComponent.prototype, "milestone", {
        get: function () {
            return this._milestone;
        },
        set: function (milestone) {
            this._milestone = milestone;
            this.load();
        },
        enumerable: true,
        configurable: true
    });
    MilestoneComponent.prototype.load = function () {
        var _this = this;
        this.projectService.currentProject.subscribe(function (project) {
            _this.project = project;
            if (_this.milestone.id === 0) {
                // backlog
                _this.issueService.findAllInBacklogForProject(project).subscribe(function (issues) {
                    _this.issues = issues;
                    _this.sortIssues();
                    _this.calculateStoryPoints();
                });
            }
            else if (!_this.milestone.activeSprint) {
                // milestone
                _this.issueService.findByProjectAndMilestone(project, _this._milestone).subscribe(function (issues) {
                    _this.issues = issues;
                    _this.sortIssues();
                    _this.calculateStoryPoints();
                });
            }
        });
    };
    MilestoneComponent.prototype.sortIssues = function () {
        this.issues.sort(function (a, b) {
            if (a.priority < b.priority) {
                return 1;
            }
            if (a.priority > b.priority) {
                return -1;
            }
            return 0;
        });
    };
    MilestoneComponent.prototype.calculateStoryPoints = function () {
        this.totalStoryPoints = 0;
        for (var _i = 0, _a = this.issues; _i < _a.length; _i++) {
            var issue = _a[_i];
            this.totalStoryPoints += issue.storyPoints;
        }
    };
    MilestoneComponent.prototype.activateCreateMode = function (inputEl) {
        this.createModeActive = true;
        setTimeout(function () {
            inputEl.focus();
        }, 200);
    };
    MilestoneComponent.prototype.deactivateCreateMode = function () {
        this.createModeActive = false;
        this.newIssueName.setValue('');
    };
    MilestoneComponent.prototype.createNewIssue = function () {
        var _this = this;
        this.issueService.create(this.project, this.newIssueName.value, this._milestone).subscribe(function () {
            _this.deactivateCreateMode();
            _this.load();
        });
    };
    MilestoneComponent.prototype.assignIssue = function (event) {
        var _this = this;
        var issue = event.dragData;
        this.issueService.assignMilestone(this.project, issue, this._milestone).subscribe(function () {
            setTimeout(function () {
                _this.backlog.reload();
            }, 100);
        });
    };
    return MilestoneComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__backlog_component__["a" /* BacklogComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__backlog_component__["a" /* BacklogComponent */]) === "function" && _a || Object)
], MilestoneComponent.prototype, "backlog", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])('milestone'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__models_milestone__["a" /* Milestone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_milestone__["a" /* Milestone */]) === "function" && _b || Object),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__models_milestone__["a" /* Milestone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_milestone__["a" /* Milestone */]) === "function" && _c || Object])
], MilestoneComponent.prototype, "milestone", null);
MilestoneComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'milestone',
        template: __webpack_require__(291)
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_issue_service__["a" /* IssueService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_issue_service__["a" /* IssueService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__services_project_service__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_project_service__["a" /* ProjectService */]) === "function" && _e || Object])
], MilestoneComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=milestone.component.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_project_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_label_service__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectSetupComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProjectSetupComponent = (function () {
    function ProjectSetupComponent(projectService, route, labelService, router) {
        this.projectService = projectService;
        this.route = route;
        this.labelService = labelService;
        this.router = router;
    }
    ProjectSetupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.projectService.setCurrentProjectById(+params['id']).then(function (project) {
                _this.project = project;
                _this.labelService.ensureSystemLabels(project, false).subscribe(function (missingLabels) {
                    _this.missingLabels = missingLabels;
                });
            });
        });
    };
    ProjectSetupComponent.prototype.setup = function () {
        var _this = this;
        this.labelService.ensureSystemLabels(this.project, true).subscribe(function (missingLabels) {
            _this.router.navigate([_this.project.id, 'backlog']);
        });
    };
    return ProjectSetupComponent;
}());
ProjectSetupComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        template: __webpack_require__(293)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_project_service__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_project_service__["a" /* ProjectService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_label_service__["a" /* LabelService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_label_service__["a" /* LabelService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _d || Object])
], ProjectSetupComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=project-setup.component.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ReportsComponent = (function () {
    function ReportsComponent() {
    }
    return ReportsComponent;
}());
ReportsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        template: __webpack_require__(294)
    })
], ReportsComponent);

//# sourceMappingURL=reports.component.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_api_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_token_service__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetupComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SetupComponent = (function () {
    function SetupComponent(api, router, tokenService) {
        this.api = api;
        this.router = router;
        this.tokenService = tokenService;
        this.token = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormControl */]('', [
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required
        ]);
        this.tokenisInvalid = false;
        this.apiUrl = api.apiUrl;
    }
    SetupComponent.prototype.checkToken = function () {
        var _this = this;
        this.tokenisInvalid = false;
        this.api.checkApiToken(this.token.value).subscribe(function () {
            _this.tokenService.setApiToken(_this.token.value);
            _this.router.navigate(['welcome']);
        }, function () {
            _this.tokenisInvalid = true;
        });
    };
    return SetupComponent;
}());
SetupComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        template: __webpack_require__(295)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_api_service__["a" /* ApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_token_service__["a" /* TokenService */]) === "function" && _c || Object])
], SetupComponent);

var _a, _b, _c;
//# sourceMappingURL=setup.component.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_project_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_token_service__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WelcomeComponent = (function () {
    function WelcomeComponent(projectService, tokenService) {
        this.projectService = projectService;
        this.tokenService = tokenService;
    }
    WelcomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getProjects();
        this.tokenService.getApiTokenObservable().subscribe(function () {
            _this.getProjects();
        });
    };
    WelcomeComponent.prototype.getProjects = function () {
        var self = this;
        this.projectService.findAll().subscribe(function (projects) {
            self.projects = projects;
        });
    };
    return WelcomeComponent;
}());
WelcomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        template: __webpack_require__(296)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_project_service__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_project_service__["a" /* ProjectService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_token_service__["a" /* TokenService */]) === "function" && _b || Object])
], WelcomeComponent);

var _a, _b;
//# sourceMappingURL=welcome.component.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Issue; });
var Issue = (function () {
    function Issue(data) {
        this.id = data.id;
        this.iid = data.iid;
        this.title = data.title;
        this.priority = null;
        this.storyPoints = null;
        this.labels = data.labels;
        this.projectId = data.project_id;
    }
    return Issue;
}());

//# sourceMappingURL=issue.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_milestone__ = __webpack_require__(74);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MilestoneService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MilestoneService = (function () {
    function MilestoneService(api) {
        this.api = api;
    }
    MilestoneService.prototype.findAllActiveForProject = function (project) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this.api.get(__WEBPACK_IMPORTED_MODULE_5__models_milestone__["a" /* Milestone */], 'projects/' + project.id + '/milestones?state=active')
                .subscribe(function (milestones) {
                for (var _i = 0, milestones_1 = milestones; _i < milestones_1.length; _i++) {
                    var milestone = milestones_1[_i];
                    if (milestone.startDate && milestone.startDate < new Date()) {
                        milestone.activeSprint = true;
                        console.log(milestone.startDate, new Date());
                    }
                }
                observer.next(milestones);
                observer.complete();
            });
        });
    };
    return MilestoneService;
}());
MilestoneService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__api_service__["a" /* ApiService */]) === "function" && _a || Object])
], MilestoneService);

var _a;
//# sourceMappingURL=milestone.service.js.map

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 186;


/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(206);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_backlog_component__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_welcome_component__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_reports_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_setup_component__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_project_setup_component__ = __webpack_require__(111);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: ':id/backlog', component: __WEBPACK_IMPORTED_MODULE_2__components_backlog_component__["a" /* BacklogComponent */] },
    { path: ':id/reports', component: __WEBPACK_IMPORTED_MODULE_4__components_reports_component__["a" /* ReportsComponent */] },
    { path: ':id/setup', component: __WEBPACK_IMPORTED_MODULE_6__components_project_setup_component__["a" /* ProjectSetupComponent */] },
    { path: 'setup', component: __WEBPACK_IMPORTED_MODULE_5__components_setup_component__["a" /* SetupComponent */] },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_3__components_welcome_component__["a" /* WelcomeComponent */] }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_dnd__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__toverux_ngsweetalert2__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_dropdown__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routing_module__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_app_component__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_welcome_component__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_backlog_component__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_navigation_component__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_issue_component__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_milestone_component__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_reports_component__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_setup_component__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_api_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_project_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_issue_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_milestone_service__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_label_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21_ngx_webstorage__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_project_setup_component__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_token_service__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








// Modules

// Components








// Services








// Init
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_7__app_routing_module__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* JsonpModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_4_ng2_dnd__["a" /* DndModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_5__toverux_ngsweetalert2__["a" /* SweetAlert2Module */].forRoot({}),
            __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_dropdown__["a" /* BsDropdownModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_21_ngx_webstorage__["a" /* Ng2Webstorage */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__components_app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_welcome_component__["a" /* WelcomeComponent */],
            __WEBPACK_IMPORTED_MODULE_11__components_navigation_component__["a" /* NavigationComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_backlog_component__["a" /* BacklogComponent */],
            __WEBPACK_IMPORTED_MODULE_12__components_issue_component__["a" /* IssueComponent */],
            __WEBPACK_IMPORTED_MODULE_13__components_milestone_component__["a" /* MilestoneComponent */],
            __WEBPACK_IMPORTED_MODULE_14__components_reports_component__["a" /* ReportsComponent */],
            __WEBPACK_IMPORTED_MODULE_15__components_setup_component__["a" /* SetupComponent */],
            __WEBPACK_IMPORTED_MODULE_22__components_project_setup_component__["a" /* ProjectSetupComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_16__services_api_service__["a" /* ApiService */],
            __WEBPACK_IMPORTED_MODULE_17__services_project_service__["a" /* ProjectService */],
            __WEBPACK_IMPORTED_MODULE_18__services_issue_service__["a" /* IssueService */],
            __WEBPACK_IMPORTED_MODULE_19__services_milestone_service__["a" /* MilestoneService */],
            __WEBPACK_IMPORTED_MODULE_20__services_label_service__["a" /* LabelService */],
            __WEBPACK_IMPORTED_MODULE_23__services_token_service__["a" /* TokenService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_8__components_app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'body',
        template: __webpack_require__(288)
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_issue__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_label_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_issue_service__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__milestone_component__ = __webpack_require__(110);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IssueComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var IssueComponent = (function () {
    function IssueComponent(labelService, issueService) {
        this.labelService = labelService;
        this.issueService = issueService;
        this.storyPoints = [];
        this.storyPoints = labelService.storyPoints;
    }
    IssueComponent.prototype.setPriority = function (priority) {
        var _this = this;
        this.issueService.setPriority(this.issue, priority).subscribe(function () {
            _this.milestone.calculateStoryPoints();
            _this.milestone.sortIssues();
        });
    };
    IssueComponent.prototype.setStoryPoints = function (points) {
        var _this = this;
        return this.issueService.setStoryPoints(this.issue, points).subscribe(function () {
            _this.milestone.calculateStoryPoints();
        });
    };
    return IssueComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_issue__["a" /* Issue */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__models_issue__["a" /* Issue */]) === "function" && _a || Object)
], IssueComponent.prototype, "issue", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Input */])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__milestone_component__["a" /* MilestoneComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__milestone_component__["a" /* MilestoneComponent */]) === "function" && _b || Object)
], IssueComponent.prototype, "milestone", void 0);
IssueComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'issue',
        template: __webpack_require__(290)
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__services_label_service__["a" /* LabelService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_label_service__["a" /* LabelService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_issue_service__["a" /* IssueService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_issue_service__["a" /* IssueService */]) === "function" && _d || Object])
], IssueComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=issue.component.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_project_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_token_service__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavigationComponent = (function () {
    function NavigationComponent(projectService, tokenService) {
        this.projectService = projectService;
        this.tokenService = tokenService;
    }
    NavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getProjects();
        this.projectService.currentProject.subscribe(function (project) {
            _this.currentProject = project;
        });
        this.tokenService.getApiTokenObservable().subscribe(function () {
            _this.getProjects();
        });
    };
    NavigationComponent.prototype.getProjects = function () {
        var self = this;
        this.projectService.findAll().subscribe(function (projects) {
            self.projects = projects;
        });
    };
    return NavigationComponent;
}());
NavigationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'nav',
        template: __webpack_require__(292)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_project_service__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_project_service__["a" /* ProjectService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_token_service__["a" /* TokenService */]) === "function" && _b || Object])
], NavigationComponent);

var _a, _b;
//# sourceMappingURL=navigation.component.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Label; });
var Label = (function () {
    function Label(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
    }
    return Label;
}());

//# sourceMappingURL=label.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Project; });
var Project = (function () {
    function Project(data) {
        this.id = data.id;
        this.name = data.name_with_namespace;
    }
    return Project;
}());

//# sourceMappingURL=project.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__token_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__(36);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ApiService = (function () {
    function ApiService(http, tokenService, router) {
        this.http = http;
        this.tokenService = tokenService;
        this.router = router;
        this.apiUrl = window.GITLAB_URL;
    }
    ApiService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    ApiService.prototype.createModel = function (type, data) {
        return new type(data);
    };
    ApiService.prototype.getRequestOptions = function () {
        var apiToken = this.tokenService.getApiToken();
        if (!apiToken) {
            this.router.navigate(['setup']);
        }
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]({
            'Content-Type': 'application/json'
        });
        headers.append('PRIVATE-TOKEN', apiToken);
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers });
    };
    ApiService.prototype.checkApiToken = function (token) {
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
            headers: new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Headers */]({
                'Content-Type': 'application/json',
                'PRIVATE-TOKEN': token
            })
        });
        return this.http.get(this.apiUrl + '/api/v4/users', requestOptions);
    };
    ApiService.prototype.get = function (model, path) {
        var _this = this;
        return this.http.get(this.apiUrl + '/api/v4/' + path, this.getRequestOptions())
            .map(function (res) {
            var data = res.json();
            var objects = [];
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var objData = data_1[_i];
                objects.push(_this.createModel(model, objData));
            }
            return objects;
        })
            .catch(this.handleError);
    };
    ApiService.prototype.getOne = function (model, path) {
        var _this = this;
        return this.http.get(this.apiUrl + '/api/v4/' + path, this.getRequestOptions())
            .map(function (res) {
            return _this.createModel(model, res.json());
        })
            .catch(this.handleError);
    };
    ApiService.prototype.post = function (model, path, body) {
        var _this = this;
        return this.http.post(this.apiUrl + '/api/v4/' + path, body, this.getRequestOptions())
            .map(function (res) {
            return _this.createModel(model, res.json());
        })
            .catch(this.handleError);
    };
    ApiService.prototype.put = function (model, path, body) {
        var _this = this;
        return this.http.put(this.apiUrl + '/api/v4/' + path, body, this.getRequestOptions())
            .map(function (res) {
            return _this.createModel(model, res.json());
        })
            .catch(this.handleError);
    };
    return ApiService;
}());
ApiService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__token_service__["a" /* TokenService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__token_service__["a" /* TokenService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* Router */]) === "function" && _c || Object])
], ApiService);

var _a, _b, _c;
//# sourceMappingURL=api.service.js.map

/***/ }),

/***/ 288:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-toggleable-sm fixed-top\"></nav>\n<router-outlet></router-outlet>"

/***/ }),

/***/ 289:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n    <milestone *ngFor=\"let milestone of milestones\" [milestone]=\"milestone\" [backlog]=\"this\"></milestone>\n\n</div>"

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_project__ = __webpack_require__(205);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProjectService = (function () {
    function ProjectService(api) {
        this.api = api;
        this._currentProject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](null);
    }
    Object.defineProperty(ProjectService.prototype, "currentProject", {
        get: function () {
            return this._currentProject.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProjectService.prototype, "currentProjectId", {
        get: function () {
            return this._currentProject.getValue().id;
        },
        enumerable: true,
        configurable: true
    });
    ProjectService.prototype.findAll = function () {
        return this.api.get(__WEBPACK_IMPORTED_MODULE_5__models_project__["a" /* Project */], 'projects');
    };
    ProjectService.prototype.findById = function (id) {
        return this.api.getOne(__WEBPACK_IMPORTED_MODULE_5__models_project__["a" /* Project */], 'projects/' + id);
    };
    ProjectService.prototype.setCurrentProjectById = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.findById(id).subscribe(function (project) {
                _this._currentProject.next(project);
                resolve(project);
            });
        });
    };
    return ProjectService;
}());
ProjectService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__api_service__["a" /* ApiService */]) === "function" && _a || Object])
], ProjectService);

var _a;
//# sourceMappingURL=project.service.js.map

/***/ }),

/***/ 290:
/***/ (function(module, exports) {

module.exports = "<div class=\"issue\" dnd-draggable [dragEnabled]=\"true\" [dragData]=\"issue\">\n\n    {{ issue.title }}\n\n    <div class=\"issue-items\">\n\n        <div class=\"issue-id\">{{ issue.id }}</div>\n        <div class=\"issue-priority\" dropdown container=\"body\">\n\n            <a href dropdownToggle (click)=\"false\">\n                <i *ngIf=\"issue.priority == 1\" style=\"color: #55A557\" class=\"fa fa-arrow-down\"></i>\n                <i *ngIf=\"issue.priority == 2\" style=\"color: #2A8735\" class=\"fa fa-arrow-down\"></i>\n                <i *ngIf=\"issue.priority == 3\" style=\"color: #EA7D24\" class=\"fa fa-arrow-up\"></i>\n                <i *ngIf=\"issue.priority == 4\" style=\"color: #EA4444\" class=\"fa fa-arrow-up\"></i>\n                <i *ngIf=\"issue.priority == 5\" style=\"color: #CE0000\" class=\"fa fa-arrow-up\"></i>\n\n                <span *ngIf=\"!issue.priority\">\n                    <i class=\"fa fa-question\" style=\"color: #ccc\"></i>\n                </span>\n            </a>\n\n            <ul *dropdownMenu class=\"dropdown-menu\">\n\n                <li [ngClass]=\"{ 'active': issue.priority == 5 }\">\n                    <a class=\"dropdown-item\" (click)=\"setPriority(5)\">\n                        <i style=\"color: #CE0000\" class=\"fa fa-arrow-up\"></i>\n                        Highest\n                    </a>\n                </li>\n\n                <li [ngClass]=\"{ 'active': issue.priority == 4 }\">\n                    <a class=\"dropdown-item\" (click)=\"setPriority(4)\">\n                        <i style=\"color: #EA4444\" class=\"fa fa-arrow-up\"></i>\n                        High\n                    </a>\n                </li>\n\n                <li [ngClass]=\"{ 'active': issue.priority == 3 }\">\n                    <a class=\"dropdown-item\" (click)=\"setPriority(3)\">\n                        <i style=\"color: #EA7D24\" class=\"fa fa-arrow-up\"></i>\n                        Medium\n                    </a>\n                </li>\n\n                <li [ngClass]=\"{ 'active': issue.priority == 2 }\">\n                    <a class=\"dropdown-item\" (click)=\"setPriority(2)\">\n                        <i style=\"color: #2A8735\" class=\"fa fa-arrow-down\"></i>\n                        Low\n                    </a>\n                </li>\n\n                <li [ngClass]=\"{ 'active': issue.priority == 1 }\">\n                    <a class=\"dropdown-item\" (click)=\"setPriority(1)\">\n                        <i style=\"color: #55A557\" class=\"fa fa-arrow-down\"></i>\n                        Lowest\n                    </a>\n                </li>\n\n                <li [ngClass]=\"{ 'active': !issue.priority }\">\n                    <a class=\"dropdown-item\" (click)=\"setPriority(0)\">\n                        <i style=\"color: #ccc\" class=\"fa fa-question\"></i>\n                        None\n                    </a>\n                </li>\n\n            </ul>\n\n        </div>\n        <div class=\"issue-storyPoints\" dropdown container=\"body\">\n\n            <a href dropdownToggle (click)=\"false\">\n                <span *ngIf=\"issue.storyPoints\">{{ issue.storyPoints }}</span>\n                <span *ngIf=\"!issue.storyPoints\">-</span>\n            </a>\n\n            <ul *dropdownMenu class=\"dropdown-menu\">\n                <li *ngFor=\"let points of storyPoints\" [ngClass]=\"{ 'active': issue.storyPoints == points }\">\n                    <a class=\"dropdown-item\" (click)=\"setStoryPoints(points)\">\n                        {{points}}\n                    </a>\n                </li>\n                <li [ngClass]=\"{ 'active': !issue.storyPoints }\">\n                    <a class=\"dropdown-item\" (click)=\"setStoryPoints(0)\">\n                        -\n                    </a>\n                </li>\n            </ul>\n\n        </div>\n\n    </div>\n\n</div>"

/***/ }),

/***/ 291:
/***/ (function(module, exports) {

module.exports = "<div class=\"issues-box\">\n\n    <div class=\"issue-box-title\">\n        {{ milestone.title }}\n        <small>\n            {{ issues.length }} issues\n        </small>\n    </div>\n\n    <div class=\"issue-box-description\">\n        <span *ngIf=\"milestone.description\">{{ milestone.description }}</span>\n\n        <span *ngIf=\"milestone.startDate\">\n            [\n            {{ milestone.startDate | date: 'dd.MM.yyyy' }}\n            <span *ngIf=\"milestone.endDate\">\n                - {{ milestone.endDate| date: 'dd.MM.yyyy' }}\n            </span>\n            ]\n        </span>\n\n    </div>\n\n    <div class=\"issues-list-empty\" *ngIf=\"issues.length == 0\" dnd-droppable (onDropSuccess)=\"assignIssue($event)\">\n        <span *ngIf=\"milestone.id\">Plan a sprint by dragging issues here</span>\n        <span *ngIf=\"!milestone.id\">Remove issues from sprints by dragging them here</span>\n    </div>\n\n    <div class=\"issues-list\" *ngIf=\"issues.length > 0\" dnd-droppable (onDropSuccess)=\"assignIssue($event)\">\n\n        <issue *ngFor=\"let issue of issues\" [issue]=\"issue\" [milestone]=\"this\"></issue>\n\n    </div>\n\n    <div class=\"issues-box-createIssue\">\n        <span [hidden]=\"createModeActive\" (click)=\"activateCreateMode(newIssueNameInput)\">+ Create issue</span>\n        <div [hidden]=\"!createModeActive\">\n            <input type=\"text\" class=\"form-control form-control-sm\" placeholder=\"What needs to be done?\" [formControl]=\"newIssueName\" (keyup.enter)=\"createNewIssue()\" (keyup.esc)=\"deactivateCreateMode()\" #newIssueNameInput>\n        </div>\n    </div>\n\n    <div class=\"issues-box-footer\">\n\n        <div>\n            {{ issues.length }} issues\n        </div>\n\n        <div>\n            Estimate <span class=\"issues-box-estimate\">{{ totalStoryPoints }}</span>\n        </div>\n\n    </div>\n\n</div>"

/***/ }),

/***/ 292:
/***/ (function(module, exports) {

module.exports = "<a class=\"navbar-brand\" href=\"/\" style=\"color: #92C36F\">Scrum</a>\n\n<ul class=\"navbar-nav mr-auto\">\n\n    <li class=\"nav-item dropdown\">\n        <a class=\"nav-link dropdown-toggle\" id=\"dropdown-group\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n            <span *ngIf=\"currentProject\">{{ currentProject.name }}</span>\n            <span *ngIf=\"!currentProject\">Please select a project</span>\n        </a>\n        <div class=\"dropdown-menu\" aria-labelledby=\"dropdown-group\">\n\n            <a *ngFor=\"let project of projects\" class=\"dropdown-item\" routerLink=\"/{{ project.id }}/backlog\">{{ project.name }}</a>\n\n        </div>\n    </li>\n\n</ul>\n\n<ul class=\"navbar-nav float-right\" *ngIf=\"currentProject\">\n\n    <li class=\"nav-item\">\n        <a routerLink=\"/{{ currentProject.id }}/backlog\" [routerLinkActive]=\"['active']\" class=\"nav-link\">Backlog</a>\n    </li>\n\n    <li class=\"nav-item\">\n        <a routerLink=\"/{{ currentProject.id }}/reports\" [routerLinkActive]=\"['active']\" class=\"nav-link\">Reports</a>\n    </li>\n\n</ul>"

/***/ }),

/***/ 293:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n    SETUP\n\n    <br><br>\n    The following labels will be created for this project:<br>\n\n    <span *ngFor=\"let label of missingLabels\" class=\"label-preview\" [style.background-color]=\"label.color\">{{ label.name }}</span>\n\n    <br><br>\n\n    <button class=\"btn btn-primary\" (click)=\"setup()\">Start setup</button>\n\n</div>"

/***/ }),

/***/ 294:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n    TODO\n\n</div>"

/***/ }),

/***/ 295:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n    <img src=\"/assets/token-setup.png\" class=\"token-setup-img\">\n\n    <h1>Grant access to your GitLab Account</h1>\n\n    <ul>\n        <li>\n            Open the <a href=\"{{ apiUrl }}/profile/personal_access_tokens\" target=\"_blank\">Access Tokens</a> page of your GitLab profile\n        </li>\n        <li>\n            Choose a name for the new token\n        </li>\n        <li>\n            Check \"<strong>api</strong> Access your API\"\n        </li>\n        <li>\n            Copy your newly created access token and paste it into the following field:\n        </li>\n    </ul>\n\n    <div class=\"form-group\" [ngClass]=\"{ 'has-danger': tokenisInvalid }\">\n\n        <label class=\"form-control-label\">Access Token</label>\n\n        <input class=\"form-control\" placeholder=\"Paste your GitLab Access Token here\" style=\"width: 40%\" [formControl]=\"token\" (keyup)=\"checkToken()\">\n\n        <div class=\"form-control-feedback\" *ngIf=\"tokenisInvalid\">Sorry, this token is not valid!</div>\n\n    </div>\n\n</div>"

/***/ }),

/***/ 296:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n\n    <h1 style=\"text-align: center\">Please select a project</h1>\n\n    <div class=\"project-list\">\n        <a *ngFor=\"let project of projects\" routerLink=\"/{{ project.id }}/backlog\">{{ project.name }}</a>\n    </div>\n\n</div>"

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_label__ = __webpack_require__(204);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LabelService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LabelService = (function () {
    function LabelService(api) {
        this.api = api;
        this.priorityPrefix = '❕';
        this.storyPointsPrefix = '⏱';
        this.priorities = [
            "Lowest",
            "Low",
            "Medium",
            "High",
            "Highest"
        ];
        this.priorityColors = [
            "#55A557",
            "#2A8735",
            "#EA7D24",
            "#EA4444",
            "#CE0000"
        ];
        this.storyPoints = [1, 2, 3, 5, 8, 13, 20, 40, 100];
    }
    LabelService.prototype.ensureSystemLabels = function (project, create) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            // find all existing labels
            _this.findAll(project).subscribe(function (labels) {
                var existingLabels = {};
                var missingLabels = [];
                for (var _i = 0, labels_1 = labels; _i < labels_1.length; _i++) {
                    var label = labels_1[_i];
                    if (label.description) {
                        if (label.description.match('^priority\[[0-9]+\]') ||
                            label.description.match('^storyPoints\[[0-9]+\]')) {
                            existingLabels[label.description] = true;
                        }
                    }
                }
                // priorities
                for (var i = 0; i < _this.priorities.length; i++) {
                    var labelName = 'priority[' + (i + 1) + ']';
                    if (existingLabels[labelName] === undefined) {
                        var name = _this.priorityPrefix + ' ' + _this.priorities[i];
                        var color = _this.priorityColors[i];
                        missingLabels.push({
                            name: name,
                            color: color
                        });
                        if (create) {
                            _this.create(project, name, color, labelName, 500 + i).subscribe(function () { });
                        }
                    }
                }
                // story points
                for (var _a = 0, _b = _this.storyPoints; _a < _b.length; _a++) {
                    var points = _b[_a];
                    var labelName = 'storyPoints[' + points + ']';
                    if (existingLabels[labelName] === undefined) {
                        var name = _this.storyPointsPrefix + ' ' + points;
                        var color = '#BCC2C7';
                        missingLabels.push({
                            name: name,
                            color: color
                        });
                        if (create) {
                            _this.create(project, name, color, labelName, 400 + points).subscribe(function () { });
                        }
                    }
                }
                if (create) {
                    observer.next([]);
                }
                else {
                    observer.next(missingLabels);
                }
                observer.complete();
            });
        });
    };
    LabelService.prototype.findAll = function (project) {
        return this.api.get(__WEBPACK_IMPORTED_MODULE_5__models_label__["a" /* Label */], 'projects/' + project.id + '/labels');
    };
    LabelService.prototype.create = function (project, name, color, description, priority) {
        return this.api.post(__WEBPACK_IMPORTED_MODULE_5__models_label__["a" /* Label */], 'projects/' + project.id + '/labels', {
            name: name,
            color: color,
            description: description,
            priority: priority
        });
    };
    LabelService.prototype.parse = function (labels) {
        var labelInfo = {
            priority: null,
            storyPoints: null
        };
        for (var _i = 0, labels_2 = labels; _i < labels_2.length; _i++) {
            var label = labels_2[_i];
            if (label.match('^' + this.priorityPrefix)) {
                labelInfo.priority = label.substr(2);
            }
            else if (label.match('^' + this.storyPointsPrefix)) {
                labelInfo.storyPoints = label.substr(2);
            }
        }
        return labelInfo;
    };
    return LabelService;
}());
LabelService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__api_service__["a" /* ApiService */]) === "function" && _a || Object])
], LabelService);

var _a;
//# sourceMappingURL=label.service.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_webstorage__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TokenService = (function () {
    function TokenService(localStorage) {
        this.localStorage = localStorage;
        this.apiTokenObserver = new __WEBPACK_IMPORTED_MODULE_2_rxjs__["BehaviorSubject"](null);
    }
    TokenService.prototype.getApiTokenObservable = function () {
        return this.apiTokenObserver.asObservable();
    };
    TokenService.prototype.getApiToken = function () {
        if (this.apiToken) {
            return this.apiToken;
        }
        else {
            this.apiToken = this.localStorage.retrieve('apiToken');
            if (!this.apiToken) {
                return null;
            }
            this.apiTokenObserver.next(this.apiToken);
            return this.apiToken;
        }
    };
    TokenService.prototype.setApiToken = function (token) {
        this.apiToken = token;
        this.apiTokenObserver.next(token);
        this.localStorage.store('apiToken', token);
    };
    return TokenService;
}());
TokenService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_webstorage__["b" /* LocalStorageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_webstorage__["b" /* LocalStorageService */]) === "function" && _a || Object])
], TokenService);

var _a;
//# sourceMappingURL=token.service.js.map

/***/ }),

/***/ 562:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(187);


/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_project_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_milestone__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_milestone_service__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_label_service__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BacklogComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BacklogComponent = (function () {
    function BacklogComponent(projectService, route, milestoneService, labelService, router) {
        this.projectService = projectService;
        this.route = route;
        this.milestoneService = milestoneService;
        this.labelService = labelService;
        this.router = router;
    }
    BacklogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.projectService.setCurrentProjectById(+params['id']).then(function (project) {
                _this.project = project;
                _this.load(project);
                _this.labelService.ensureSystemLabels(project, false).subscribe(function (missingTags) {
                    if (missingTags.length > 0) {
                        _this.router.navigate([project.id, 'setup']);
                    }
                });
            });
        });
    };
    BacklogComponent.prototype.load = function (project) {
        var _this = this;
        this.milestoneService.findAllActiveForProject(project).subscribe(function (milestones) {
            _this.milestones = milestones;
            // Backlog
            _this.milestones.push(new __WEBPACK_IMPORTED_MODULE_3__models_milestone__["a" /* Milestone */]({
                id: 0,
                iid: 0,
                title: "Backlog",
                description: ""
            }));
        });
    };
    BacklogComponent.prototype.reload = function () {
        this.load(this.project);
    };
    return BacklogComponent;
}());
BacklogComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        template: __webpack_require__(289)
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_project_service__["a" /* ProjectService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_project_service__["a" /* ProjectService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_milestone_service__["a" /* MilestoneService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_milestone_service__["a" /* MilestoneService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__services_label_service__["a" /* LabelService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_label_service__["a" /* LabelService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _e || Object])
], BacklogComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=backlog.component.js.map

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Milestone; });
var Milestone = (function () {
    function Milestone(data) {
        this.id = data.id;
        this.iid = data.iid;
        this.title = data.title;
        this.description = data.description;
        if (data.start_date) {
            this.startDate = new Date(data.start_date);
        }
        if (data.due_date) {
            this.endDate = new Date(data.due_date);
        }
        this.activeSprint = false;
    }
    return Milestone;
}());

//# sourceMappingURL=milestone.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_service__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_issue__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__label_service__ = __webpack_require__(37);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IssueService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var IssueService = (function () {
    function IssueService(api, labelService) {
        this.api = api;
        this.labelService = labelService;
    }
    IssueService.prototype.parseLabels = function (issues) {
        for (var _i = 0, issues_1 = issues; _i < issues_1.length; _i++) {
            var issue = issues_1[_i];
            var labelInfo = this.labelService.parse(issue.labels);
            if (labelInfo['priority']) {
                issue.priority = this.labelService.priorities.indexOf(labelInfo['priority']) + 1;
            }
            if (labelInfo['storyPoints']) {
                issue.storyPoints = +labelInfo['storyPoints'];
            }
        }
    };
    IssueService.prototype.findAllInBacklogForProject = function (project) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this.api.get(__WEBPACK_IMPORTED_MODULE_5__models_issue__["a" /* Issue */], 'projects/' + project.id + '/issues?state=opened&milestone=No%20Milestone').subscribe(function (issues) {
                _this.parseLabels(issues);
                observer.next(issues);
                observer.complete();
            });
        });
    };
    IssueService.prototype.findByProjectAndMilestone = function (project, milestone) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            _this.api.get(__WEBPACK_IMPORTED_MODULE_5__models_issue__["a" /* Issue */], 'projects/' + project.id + '/issues?state=opened&milestone=' + milestone.title).subscribe(function (issues) {
                _this.parseLabels(issues);
                observer.next(issues);
                observer.complete();
            });
        });
    };
    IssueService.prototype.create = function (project, title, milestone) {
        var data = {
            title: title
        };
        if (milestone && milestone.id) {
            data['milestone_id'] = milestone.id;
        }
        return this.api.post(__WEBPACK_IMPORTED_MODULE_5__models_issue__["a" /* Issue */], 'projects/' + project.id + '/issues', data);
    };
    IssueService.prototype.assignMilestone = function (project, issue, milestone) {
        var data = {};
        if (milestone && milestone.id) {
            data['milestone_id'] = milestone.id;
        }
        else {
            data['milestone_id'] = "";
        }
        return this.api.put(__WEBPACK_IMPORTED_MODULE_5__models_issue__["a" /* Issue */], 'projects/' + project.id + '/issues/' + issue.iid, data);
    };
    IssueService.prototype.setPriority = function (originalIssue, priority) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            // get fresh issue data
            _this.api.getOne(__WEBPACK_IMPORTED_MODULE_5__models_issue__["a" /* Issue */], 'projects/' + originalIssue.projectId + '/issues/' + originalIssue.iid).subscribe(function (issue) {
                var newLabels = [];
                // remove old priority labels
                for (var index in issue.labels) {
                    if (issue.labels.hasOwnProperty(index)) {
                        var label = issue.labels[index];
                        if (!label.match('^' + _this.labelService.priorityPrefix)) {
                            newLabels.push(label);
                        }
                    }
                }
                // add new priority label
                if (priority > 0) {
                    newLabels.push(_this.labelService.priorityPrefix + ' ' + _this.labelService.priorities[priority - 1]);
                }
                _this.api.put(__WEBPACK_IMPORTED_MODULE_5__models_issue__["a" /* Issue */], 'projects/' + originalIssue.projectId + '/issues/' + originalIssue.iid, {
                    labels: newLabels.join(",")
                }).subscribe(function () {
                    originalIssue.priority = priority;
                    observer.next();
                    observer.complete();
                });
            });
        });
    };
    IssueService.prototype.setStoryPoints = function (originalIssue, points) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"](function (observer) {
            // get fresh issue data
            _this.api.getOne(__WEBPACK_IMPORTED_MODULE_5__models_issue__["a" /* Issue */], 'projects/' + originalIssue.projectId + '/issues/' + originalIssue.iid).subscribe(function (issue) {
                var newLabels = [];
                // remove old story points labels
                for (var index in issue.labels) {
                    if (issue.labels.hasOwnProperty(index)) {
                        var label = issue.labels[index];
                        if (!label.match('^' + _this.labelService.storyPointsPrefix)) {
                            newLabels.push(label);
                        }
                    }
                }
                // add new story points label
                if (points > 0) {
                    newLabels.push(_this.labelService.storyPointsPrefix + ' ' + points);
                }
                _this.api.put(__WEBPACK_IMPORTED_MODULE_5__models_issue__["a" /* Issue */], 'projects/' + originalIssue.projectId + '/issues/' + originalIssue.iid, {
                    labels: newLabels.join(",")
                }).subscribe(function () {
                    originalIssue.storyPoints = points;
                    observer.next();
                    observer.complete();
                });
            });
        });
    };
    return IssueService;
}());
IssueService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__api_service__["a" /* ApiService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__api_service__["a" /* ApiService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__label_service__["a" /* LabelService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__label_service__["a" /* LabelService */]) === "function" && _b || Object])
], IssueService);

var _a, _b;
//# sourceMappingURL=issue.service.js.map

/***/ })

},[562]);
//# sourceMappingURL=main.bundle.js.map