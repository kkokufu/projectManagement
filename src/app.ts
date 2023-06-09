class ProjectInput {
    templeteElement: HTMLTemplateElement;
    mainElement: HTMLDivElement;
    element: HTMLFormElement;
    title: HTMLInputElement;
    description: HTMLTextAreaElement;
    manday: HTMLInputElement;

    constructor() {
        this.templeteElement = document.getElementById("project-input")! as HTMLTemplateElement;
        this.mainElement = document.getElementById("app")! as HTMLDivElement;
        const inputElement = document.importNode(this.templeteElement.content, true)
        this.element = inputElement.firstElementChild! as HTMLFormElement;

        this.title = document.getElementById("title")! as HTMLInputElement;
        this.description = document.getElementById("description")! as HTMLTextAreaElement;
        this.manday = document.getElementById("manday")! as HTMLInputElement;


        this.attach();
        this.submitHandler()
    }

    private attach() {
        this.mainElement.insertAdjacentElement('afterbegin', this.element);
    }

    private getInputInfo(event:Event) {
        event.preventDefault();
        const titleValue = this.title.value;
        const descriptionValue = this.description.value;
        const mandayValue = this.manday.value;
        console.log(titleValue, descriptionValue, mandayValue);
    }

    private submitHandler() {
        this.element.addEventListener("submit", this.getInputInfo);
    }
}

const input = new ProjectInput();