//Custom-Element to display matched user details
class user extends HTMLElement {

    //accepts matched user object, search query-input and index of user object to set tabindex(for performant keyboard navigation)
    constructor(userObj, search, index) {
        super();
        this.userObj = userObj;
        this.searchStr = search;
        this.tabIndex = index;
        this.debounceTimeout;

        //debounced mousemove event listener for matched user object 
        this.addEventListener('mousemove', event => {
            this.debounceFunction(event);
        });

        //mouseleave event listener for matched user object (navigation through Mouse)
        this.addEventListener('mouseleave', event => {
            this.children[0].classList.remove('hovered');
        });

        //throttled listener for focusin event on matched user object => highlights the navigated user object
        this.addEventListener('focusin', event => {
            window.requestAnimationFrame(() => {
                let nodes = event.target.parentElement.children;
                for (let node of nodes)
                    node.classList.remove('hovered');
                this.children[0].classList.add('hovered');
            });
        });

        //listener for focusout event on matched user object
        this.addEventListener('focusout', event => {
            this.children[0].classList.remove('hovered');
        });

        //listener for arrow keys (Keyboard navigation)
        this.addEventListener('keyup', event => {
            if (event.keyCode === 38) { //handling keyup event on search item
                this.previousElementSibling ? this.previousElementSibling.focus() : this.parentElement.previousElementSibling && this.parentElement.previousElementSibling.children['search-input'].focus();
            } else if (event.keyCode === 40) {  //handling keydown event on search item
                this.nextElementSibling && this.nextElementSibling.focus();
            }
        });

        //additional callbacks can be attached here...like onclick to show user's complete details etc.
    }

    //func to mount custom element and update the content in it.
    connectedCallback() {
        let html = `<div class="user-item" tabindex=-1>`;
        let index = this.userObj.id.toLowerCase().indexOf(this.searchStr);
        if (index > -1) {
            let matched = this.userObj.id.substr(index, this.searchStr.length);
            html += '<div class="id">' + this.userObj.id.replace(matched, '<span class="highlight">' + matched + '</span>') + '</div>';
        } else {
            html += `<div class="id">${this.userObj.id}</div>`;
        }
        index = this.userObj.name.toLowerCase().indexOf(this.searchStr);
        if (index > -1) {
            let matched = this.userObj.name.substr(index, this.searchStr.length);
            html += '<div class="name"><i>' + this.userObj.name.replace(matched, '<span class="highlight">' + matched + '</span>') + '</i></div>';
        } else {
            html += `<div class="name"><i>${this.userObj.name}</i></div>`;
        }
        for (let i = 0; i < this.userObj.items.length; i++) {
            if (this.userObj.items[i].toLowerCase().indexOf(this.searchStr) > -1) {
                html += `<div class="divider"></div>`;
                html += `<ul><li class="item">&quot;${this.userObj.items[i]}&quot; found in items</li></ul>`
                html += `<div class="divider"></div>`;
                break;
            }
        }
        index = this.userObj.address.toLowerCase().indexOf(this.searchStr);
        if (index > -1) {
            let matched = this.userObj.address.substr(index, this.searchStr.length);
            html += '<div class="address">' + this.userObj.address.replace(matched, '<span class="highlight">' + matched + '</span>') + '</div>';
        } else {
            html += `<div class="address">${this.userObj.address}</div>`;
        }
        index = this.userObj.pincode.toLowerCase().indexOf(this.searchStr);
        if (index > -1) {
            let matched = this.userObj.pincode.substr(index, this.searchStr.length);
            html += '<div class="pincode">' + this.userObj.pincode.replace(matched, '<span class="highlight">' + matched + '</span>') + '</div>';
        } else {
            html += `<div class="pincode">${this.userObj.pincode}</div>`;
        }
        html += `</div >`;
        this.innerHTML = html;
        this.setAttribute('tabindex', this.tabIndex + 2);   //for keyboard(Tab key) navigation
    }

    debounceFunction(event) {   //func to deboune mousemove event on matched user object 
        window.clearTimeout(this.debounceTimeout);
        this.debounceTimeout = window.setTimeout(() => {
            this.children[0] && this.children[0].focus();
        }, 200);
    }

    disconnectedCallback() {

    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log('----- ' + this.tabIndex);
    }
}

window.customElements.define('user-details', user);