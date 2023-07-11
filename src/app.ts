interface Project {
    title: string;
    description: string,
    manday: string
}

class ProjectInput {
    templeteElement: HTMLTemplateElement;
    mainElement: HTMLDivElement;
    element: HTMLFormElement;
    title: HTMLInputElement;
    description: HTMLTextAreaElement;
    manday: HTMLInputElement;
    projectObject:Project[];

    constructor() {
        this.templeteElement = document.getElementById("project-input")! as HTMLTemplateElement;
        this.mainElement = document.getElementById("app")! as HTMLDivElement;
        const inputElement = document.importNode(this.templeteElement.content, true)
        this.element = inputElement.firstElementChild! as HTMLFormElement;

        this.attach();

        this.title = document.getElementById("title")! as HTMLInputElement;
        this.description = document.getElementById("description")! as HTMLTextAreaElement;
        this.manday = document.getElementById("manday")! as HTMLInputElement;
        this.projectObject = [];

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

        const project: Project = {title: titleValue, description: descriptionValue, manday: mandayValue};
        this.projectObject.push(project);
        activeList.renderProjects();
        
    }

    private submitHandler() {
        this.element.addEventListener("submit", this.getInputInfo.bind(this));
    }
}

class ProjectList {
    templeteElement: HTMLTemplateElement;
    mainElement: HTMLDivElement;
    element: HTMLElement;

    constructor(status: 'active' | 'finished') {
        this.templeteElement = document.getElementById("project-list")! as HTMLTemplateElement;
        this.mainElement = document.getElementById("app")! as HTMLDivElement;
        const sectionElement = document.importNode(this.templeteElement.content, true);
        this.element = sectionElement.firstElementChild as HTMLElement;

        this.attach();
        this.renderContents(status);        
    }

    private attach() {
        this.mainElement.insertAdjacentElement('beforeend', this.element);
    }
    
    private renderContents(status: 'active' | 'finished') {
        this.element.querySelector("ul")!.id = `${status}-project`;

        if(status === 'active') {
            this.element.querySelector("h2")!.innerHTML = "進行中プロジェクト";
        }else{
            this.element.querySelector("h2")!.innerHTML = "完了済プロジェクト";
        }
    }

    renderProjects() {
        console.log(input.projectObject);
        let projects = input.projectObject;
        for (const project of projects) {
            const listItem = document.createElement('li');
            listItem.textContent = project.title;
            document.getElementById("active-project")!.appendChild(listItem);
            console.log(listItem.textContent);
        }
    }
}

const input = new ProjectInput();
const activeList = new ProjectList('active');
const finisshedList = new ProjectList('finished');

