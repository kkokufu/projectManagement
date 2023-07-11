"use strict";
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
        this.projectObject = [];
        this.submitHandler();
    }
    attach() {
        this.mainElement.insertAdjacentElement('afterbegin', this.element);
    }
    getInputInfo(event) {
        event.preventDefault();
        const titleValue = this.title.value;
        const descriptionValue = this.description.value;
        const mandayValue = this.manday.value;
        const project = { title: titleValue, description: descriptionValue, manday: mandayValue };
        this.projectObject.push(project);
        activeList.renderProjects();
    }
    submitHandler() {
        this.element.addEventListener("submit", this.getInputInfo.bind(this));
    }
}
class ProjectList {
    constructor(status) {
        this.templeteElement = document.getElementById("project-list");
        this.mainElement = document.getElementById("app");
        const sectionElement = document.importNode(this.templeteElement.content, true);
        this.element = sectionElement.firstElementChild;
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
        console.log(input.projectObject);
        let projects = input.projectObject;
        for (const project of projects) {
            const listItem = document.createElement('li');
            listItem.textContent = project.title;
            document.getElementById("active-project").appendChild(listItem);
            console.log(listItem.textContent);
        }
    }
}
const input = new ProjectInput();
const activeList = new ProjectList('active');
const finisshedList = new ProjectList('finished');
//# sourceMappingURL=app.js.map