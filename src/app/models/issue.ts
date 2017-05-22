export class Issue {

    id: number;
    iid: number;
    title: string;
    priority: number;
    storyPoints: number;
    labels: string[];
    projectId: number;
    state: string;

    constructor(data: any) {
        this.id = data.id;
        this.iid = data.iid;
        this.title = data.title;
        this.priority = null;
        this.storyPoints = null;
        this.labels = data.labels;
        this.projectId = data.project_id;
        this.state = data.state;
    }

}
