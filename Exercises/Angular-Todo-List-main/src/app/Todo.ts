export class Todo {
    sno : number
    title : string
    description : string
    active : boolean

    constructor (sno : number, title: string, description: string, active: boolean ) {
        this.sno = sno;
        this.title = title
        this.description = description
        this.active = active
    }
}

