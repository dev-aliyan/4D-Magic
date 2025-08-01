export class Task {
    title: string;
    description: string;
    completed: boolean;

    constructor(title: string, description: string, completed: boolean) {
        this.title = title;
        this.description = description;
        this.completed = completed;
    }
}

