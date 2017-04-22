export class Project {

    id: number;
    name: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name_with_namespace;
    }

}
