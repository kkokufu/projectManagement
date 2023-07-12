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
class ProjectInput {
    constructor() {
        this.templeteElement = document.getElementById("project-input");
        this.mainElement = document.getElementById("app");
        const inputElement = document.importNode(this.templeteElement.content, true);
        this.element = inputElement.firstElementChild;
        this.attach();
        this.title = document.getElementById("title");
        this.description = document.getElementById("description");
        this.manday = document.getElementById("manday");
        this.submitHandler();
    }
    attach() {
        this.mainElement.insertAdjacentElement('afterbegin', this.element);
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
class ProjectList {
    constructor(status) {
        this.status = status;
        this.templeteElement = document.getElementById("project-list");
        this.mainElement = document.getElementById("app");
        const sectionElement = document.importNode(this.templeteElement.content, true);
        this.element = sectionElement.firstElementChild;
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
        this.attach();
        this.renderContents(status);
    }
    attach() {
        this.mainElement.insertAdjacentElement('beforeend', this.element);
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
        document.getElementById(`${this.status}-project`).innerHTML = "";
        const projects = this.assignedProjects;
        for (const project of projects) {
            const listItem = document.createElement('li');
            listItem.textContent = project.title;
            document.getElementById(`${this.status}-project`).appendChild(listItem);
        }
    }
}
const input = new ProjectInput();
const activeList = new ProjectList('active');
const finisshedList = new ProjectList('finished');
//# sourceMappingURL=app.js.map