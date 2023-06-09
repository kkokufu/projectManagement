"use strict";
class ProjectInput {
    constructor() {
        this.templeteElement = document.getElementById("project-input");
        this.mainElement = document.getElementById("app");
        const inputElement = document.importNode(this.templeteElement.content, true);
        this.element = inputElement.firstElementChild;
        this.attach();
    }
    attach() {
        this.mainElement.insertAdjacentElement('afterbegin', this.element);
    }
}
const input = new ProjectInput();
//# sourceMappingURL=app.js.map