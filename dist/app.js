"use strict";
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(title, description, manday, status) {
        this.title = title;
        this.description = description;
        this.manday = manday;
        this.status = status;
    }
}
class ProjectState {
    constructor() {
        this.projects = [];
        this.listeners = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, manday) {
        const newProject = new Project(title, description, manday, ProjectStatus.Active);
        this.projects.push(newProject);
        for (const listenerFunction of this.listeners) {
            listenerFunction(this.projects.slice());
        }
    }
    addListener(listenerFunction) {
        this.listeners.push(listenerFunction);
    }
}
const projectState = ProjectState.getInstance();
class component {
    constructor(templeteId, mainId, insertPlace) {
        this.templeteElement = document.getElementById(templeteId);
        this.mainElement = document.getElementById(mainId);
        const inputElement = document.importNode(this.templeteElement.content, true);
        this.element = inputElement.firstElementChild;
        this.attach(insertPlace);
    }
    attach(insertSpot) {
        this.mainElement.insertAdjacentElement(insertSpot ? 'afterbegin' : 'beforeend', this.element);
    }
}
class ProjectItem extends component {
    constructor(id, item) {
        super("single-project", id, false);
        this.element.querySelector("h3").textContent = item.title;
        this.element.querySelector("p").textContent = item.description;
        this.element.addEventListener('dragstart', this.dragStart.bind(this));
        this.element.addEventListener("dragend", this.dragEnd.bind(this));
    }
    dragStart(_) { }
    dragEnd(_) { }
}
class ProjectInput extends component {
    constructor() {
        super("project-input", "app", true);
        this.title = document.getElementById("title");
        this.description = document.getElementById("description");
        this.manday = document.getElementById("manday");
        this.submitHandler();
    }
    getInputInfo(event) {
        event.preventDefault();
        const titleValue = this.title.value;
        const descriptionValue = this.description.value;
        const mandayValue = Number(this.manday.value);
        projectState.addProject(titleValue, descriptionValue, mandayValue);
    }
    submitHandler() {
        this.element.addEventListener("submit", this.getInputInfo.bind(this));
    }
}
class ProjectList extends component {
    constructor(status) {
        super("project-list", "app", false);
        this.status = status;
        this.assignedProjects = [];
        projectState.addListener((projects) => {
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
    renderContents(status) {
        this.element.querySelector("ul").id = `${status}-project`;
        if (status === 'active') {
            this.element.querySelector("h2").innerHTML = "進行中プロジェクト";
        }
        else {
            this.element.querySelector("h2").innerHTML = "完了済プロジェクト";
        }
    }
    renderProjects() {
        const mainEl = document.getElementById(`${this.status}-project`);
        mainEl.innerText = "";
        const projects = this.assignedProjects;
        for (const project of projects) {
            new ProjectItem(mainEl.id, project);
        }
    }
}
const input = new ProjectInput();
const activeList = new ProjectList('active');
const finisshedList = new ProjectList('finished');
//# sourceMappingURL=app.js.map