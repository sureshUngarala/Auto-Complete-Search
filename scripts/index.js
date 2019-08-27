
let searchInputContainer = document.getElementById('searchInputContainer'),
    searchList = document.getElementById('searchListContainer'),
    input = document.getElementById('search-input'),
    close = document.getElementById('close'),
    users = [], prevSearchInput = '';

//focus search input box when clicked on container
searchInputContainer.addEventListener('click', () => {
    input.focus();
});

//listener for close icon
close.addEventListener('click', (event) => {
    input.value = '';
    prevSearchInput = '';
    clearSearchList();
    event.target.style.display = 'none';
    input.classList.add('emptyInput');
    searchInputContainer.classList.add('emptyInput');
});

//listener for search input query change
input.addEventListener('keyup', (event) => {
    let val = event.target.value.toLowerCase();
    if (val !== prevSearchInput) {
        prevSearchInput = val;
        if (val.length) {
            close.style.display = 'block';
            input.classList.remove('emptyInput');
            searchInputContainer.classList.remove('emptyInput');
            if (!searchList.style.display || searchList.style.display === 'none') {
                searchList.style.display = 'block';
            }
            clearSearchList();
            populateSearchResults(val);
        } else {
            close.style.display = 'none';
            input.classList.add('emptyInput');
            searchInputContainer.classList.add('emptyInput');
        }
    }
    if (event.keyCode === 27 || !val.trim()) {
        searchList.style.display = 'none';
        clearSearchList();
    } else if (event.keyCode === 40) { //key down
        searchList.children[0].focus();
    }
});

//func to search matched user data and populate the results
function populateSearchResults(val) {
    let filtered = userData.filter((user) => {
        if (user.id.toLowerCase().indexOf(val) > -1 || user.name.toLowerCase().indexOf(val) > -1 || user.address.toLowerCase().indexOf(val) > -1 || user.pincode.toLowerCase().indexOf(val) > -1) {
            return true;
        } else {
            for (let i = 0; i < user.items.length; i++) {
                if (user.items[i].toLowerCase().indexOf(val) > -1) {
                    return true;
                }
            }
            return false;
        }
    });
    if (filtered.length) {
        let userDetails = customElements.get('user-details');
        for (let i = 0; i < filtered.length; i++) {
            searchList.appendChild(new userDetails(filtered[i], val, i));
        }
    } else {
        let noResultsTemplate = customElements.get('no-results');
        searchList.appendChild(new noResultsTemplate());
    }
}

//func to clear search results before next matched results are populated
function clearSearchList() {
    while (searchList.firstChild) {
        searchList.removeChild(searchList.firstChild);
    }
}