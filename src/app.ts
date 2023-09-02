enum ProjectStatus {
    Active,
    Finished,
  }
  
  class Project {
    constructor(
      public title: string,
      public description: string,
      public manday: number,
      public status: ProjectStatus,
    ) {}
  }

type Listener = (items: Project[]) => void;

class ProjectState {
    private projects: Project[] = [];
    private listeners: Listener[] = [];
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
        const newProject = new Project(
            title,
            description,
            manday,
            ProjectStatus.Active,
          );
      this.projects.push(newProject);
      for (const listenerFunction of this.listeners) {
        listenerFunction(this.projects.slice());
      }
    }

    addListener(listenerFunction: Listener) {
        this.listeners.push(listenerFunction);
      }
  }
  
const projectState = ProjectState.getInstance();

interface Project {
    title: string,
    description: string,
    manday: number
}

abstract class component<T extends HTMLElement,U extends HTMLElement>{
    templeteElement: HTMLTemplateElement;
    mainElement: T;
    element: U;

    constructor(templeteId: string, mainId: string, insertPlace: boolean) {
        this.templeteElement = document.getElementById(templeteId)! as HTMLTemplateElement;
        this.mainElement = document.getElementById(mainId)! as T;
        const inputElement = document.importNode(this.templeteElement.content, true)
        this.element = inputElement.firstElementChild! as U;

        this.attach(insertPlace)
    }
    
    private attach(insertSpot:boolean){
        this.mainElement.insertAdjacentElement(insertSpot?'afterbegin':'beforeend', this.element);
    }
}

interface Draggable {
    dragStart(event:DragEvent):void
    dragEnd(event:DragEvent):void
}

class ProjectItem extends component<HTMLUListElement, HTMLLIElement> implements Draggable{
    constructor(id: string, item:Project) {
        super("single-project", id, false)
        this.element.querySelector("h3")!.textContent = item.title;
        this.element.querySelector("p")!.textContent = item.description;

        this.element.addEventListener('dragstart', this.dragStart.bind(this));
        this.element.addEventListener("dragend", this.dragEnd.bind(this));
    }

    dragStart(_:DragEvent) {}
    dragEnd(_:DragEvent) {}

}

class ProjectInput extends component<HTMLDivElement, HTMLFormElement> {
    title: HTMLInputElement;
    description: HTMLTextAreaElement;
    manday: HTMLInputElement;

    constructor() {
        super("project-input", "app", true);    

        this.title = document.getElementById("title")! as HTMLInputElement;
        this.description = document.getElementById("description")! as HTMLTextAreaElement;
        this.manday = document.getElementById("manday")! as HTMLInputElement;

        this.submitHandler()
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

class ProjectList extends component<HTMLDivElement, HTMLElement>{
    assignedProjects : Project[];

    constructor(private status: 'active' | 'finished') {
        super("project-list", "app", false);
        this.assignedProjects = [];

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
                if (this.status === 'active') {
                  return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });

        this.renderContents(status);        
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
        const mainEl = document.getElementById(`${this.status}-project`)!
        mainEl.innerText = "";
        const projects = this.assignedProjects;
        for (const project of projects) {
            new ProjectItem(mainEl.id ,project) 
        }
    }
}

const input = new ProjectInput();
const activeList = new ProjectList('active');
const finisshedList = new ProjectList('finished');