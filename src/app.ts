class ProjectInput {
    templeteElement: HTMLTemplateElement;
    mainElement: HTMLDivElement;
    element: HTMLFormElement;

    constructor() {
        this.templeteElement = document.getElementById("project-input")! as HTMLTemplateElement;
        this.mainElement = document.getElementById("app")! as HTMLDivElement;
        const inputElement = document.importNode(this.templeteElement.content, true)
        this.element = inputElement.firstElementChild! as HTMLFormElement;

        this.attach();
    }

    private attach() {
        this.mainElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const input = new ProjectInput();