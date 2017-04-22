export class Milestone {

    id: number;
    iid: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    activeSprint: boolean;

    constructor(data: any) {
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

}
