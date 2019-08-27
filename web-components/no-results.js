class empty extends HTMLElement {
    constructor(userObj, search) {
        super();
    }
    connectedCallback() {
        let html = `<div class="no-results">No User Found</div>`;
        this.innerHTML = html;
    }
}

window.customElements.define('no-results', empty);