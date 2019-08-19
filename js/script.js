/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
James Hall
Aug 19, 2019
******************************************/
   
document.addEventListener("DOMContentLoaded", () => {
    appendPageLinks(studentList);
    appendSearchBar();
    showPage(studentList, 1);
})

//define global variables
const studentList = document.querySelectorAll('.student-item');
const numberOfItemsPerPage = 8;
const page = document.querySelector('.page');


//show a certain page based on an argument 'pageNumber'
//also, call appendPageLinks to add pagination
function showPage(list, pageNumber) {
    const ul = document.createElement('ul');
    ul.className = "student-list";
    let li = document.createElement('li');
    let startIndex = pageNumber * numberOfItemsPerPage - numberOfItemsPerPage;
    let endIndex = pageNumber * numberOfItemsPerPage;
    //if there are less than 10 items on the page, set endIndex accordingly
    if (endIndex >= list.length) {
        endIndex = list.length;
    }
    for (let i = startIndex; i < endIndex; i += 1) {
        li = list[i];
        ul.appendChild(li);
    }
    const existingUl = document.querySelector('ul.student-list');
    const page = document.querySelector('.page');
    page.insertBefore(ul, existingUl);
    if (existingUl) { //as long as the list exists, remove it from the page
        page.removeChild(existingUl);
    }

    appendPageLinks(list);
}




//deletes element based on selector, if it exists
function deleteElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const parentNode = element.parentNode;
        parentNode.removeChild(element)
    }
}

//Appends pagination links to DOM and selects first one
function appendPageLinks(list) {
    const numberOfPages = Math.ceil(list.length/numberOfItemsPerPage);
    if (numberOfPages > 1) {
        const paginationDiv = document.createElement('div');
        paginationDiv.className = "pagination";
        const ul = document.createElement('ul');
        for (let i = 1; i <= numberOfPages; i += 1) {
            ul.appendChild(createPageNumberLi(i));
        }
        paginationDiv.appendChild(ul);
        deleteElement('.pagination')
        page.appendChild(paginationDiv);

        enablePageLinks();

    } else { //remove pagination links if numberOfPages <= 1
        deleteElement('.pagination');
    }

    //return pagination link to append to the page
    function createPageNumberLi(number) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = number;
        a.href = "#";
        li.appendChild(a);
        return li;
    }

    //add event listener to pagination links
    function enablePageLinks() {
        const paginationDiv = page.querySelector('.pagination');
        paginationDiv.addEventListener('click', (e) => {
            const pageNumber = e.target.textContent;
            showPage(list, pageNumber);
        });
    }
}

//Append search bar to DOM
function appendSearchBar() {
    //create elements for search bar group
    const searchDiv = document.createElement('div');
    searchDiv.className = 'student-search';
    const searchBar = document.createElement('input');
    searchBar.placeholder = "Search for students...";
    const searchButton = document.createElement('button');
    searchButton.textContent = "Search";

    //append search elements to page
    searchDiv.appendChild(searchBar);
    searchDiv.appendChild(searchButton);
    const pageHeader = document.querySelector('.page-header');
    pageHeader.appendChild(searchDiv);

    //enable real-time search results
    searchDiv.addEventListener('keyup', () => {
        searchInList(studentList, searchBar.value);
    })
}

//searches in list for query and runs showPage with the results
function searchInList(list, query) {
    let searchResults = [];
    for (let i = 0; i < list.length; i += 1) {
        let listItem = list[i];
        let studentName = listItem.querySelector('h3');
        query = query.toLowerCase();
        if (studentName.textContent.includes(query)) {
            studentName.innerHTML = highlightSearchItem(studentName.textContent, query);
            searchResults.push(listItem)
        }
    }
    deleteElement('.no-results');
    if (searchResults.length == 0) { //create a "No Results" message
        const h3 = document.createElement('h3');
        h3.textContent = "No results";
        h3.className = "no-results";
        deleteElement('.pagination');
        deleteElement('ul.student-list');
        page.appendChild(h3);
    } else {
        showPage(searchResults, 1);
    }
}

//returns 'result' with all instances of 'query' surrounded by a span tag
function highlightSearchItem(result, query) {
    const highlighted = `<span class="highlighted">${query}</span>`;
    let regexQuery = new RegExp(query, "g");
    let highlightedResult = result.replace(regexQuery, highlighted);
    return highlightedResult;
}
