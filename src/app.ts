class ProjectState {
    private projects: any[] = [];
    private listeners: any[] = [];
    private static instance: ProjectState;
  
    private constructor() {}
  
    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }
  
    addProject(title: string, description: string, manday: number) {
      const newProject = {
        title: title,
        description: description,
        manday: manday,
      };
      this.projects.push(newProject);
      for (const listenerFunction of this.listeners) {
        listenerFunction(this.projects.slice());
      }
    }

    addListener(listenerFunction: Function) {
        this.listeners.push(listenerFunction);
      }
  }
  
const projectState = ProjectState.getInstance();

interface Project {
    title: string,
    description: string,
    manday: number
}

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

        this.attach();

        this.title = document.getElementById("title")! as HTMLInputElement;
        this.description = document.getElementById("description")! as HTMLTextAreaElement;
        this.manday = document.getElementById("manday")! as HTMLInputElement;

        this.submitHandler()
    }

    private attach() {
        this.mainElement.insertAdjacentElement('afterbegin', this.element);
    }

    private getInputInfo(event:Event) {
        event.preventDefault();
        const titleValue = this.title.value;
        const descriptionValue = this.description.value;
        const mandayValue = Number(this.manday.value);

        projectState.addProject(titleValue, descriptionValue, mandayValue);
        
    }

    private submitHandler() {
        this.element.addEventListener("submit", this.getInputInfo.bind(this));
    }
}

class ProjectList {
    templeteElement: HTMLTemplateElement;
    mainElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects : any[];

    constructor(private status: 'active' | 'finished') {
        this.templeteElement = document.getElementById("project-list")! as HTMLTemplateElement;
        this.mainElement = document.getElementById("app")! as HTMLDivElement;
        const sectionElement = document.importNode(this.templeteElement.content, true);
        this.element = sectionElement.firstElementChild as HTMLElement;
        this.assignedProjects = [];

        projectState.addListener((projects: any[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
          });

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
        const projects = this.assignedProjects;
        for (const project of projects) {
            const listItem = document.createElement('li');
            listItem.textContent = project.title;
            document.getElementById(`${this.status}-project`)!.appendChild(listItem);
        }
    }
}

const input = new ProjectInput();
const activeList = new ProjectList('active');
const finisshedList = new ProjectList('finished');

