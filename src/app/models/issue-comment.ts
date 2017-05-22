export class IssueComment {

    id: number;
    body: string;
    createdAt: Date;

    constructor(data: any) {
        this.id = data.id;
        this.body = data.body;
        this.createdAt = data.created_at;
    }

}
