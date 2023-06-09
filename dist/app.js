"use strict";
class ProjectInput {
    constructor() {
        this.templeteElement = document.getElementById("project-input");
        this.mainElement = document.getElementById("app");
        const inputElement = document.importNode(this.templeteElement.content, true);
        this.element = inputElement.firstElementChild;
        this.title = document.getElementById("title");
        this.description = document.getElementById("description");
        this.manday = document.getElementById("manday");
        this.attach();
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
        console.log(titleValue, descriptionValue, mandayValue);
    }
    submitHandler() {
        this.element.addEventListener("submit", this.getInputInfo);
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
}
const input = new ProjectInput();
const activeList = new ProjectList('active');
const finisshedList = new ProjectList('finished');
//# sourceMappingURL=app.js.map