/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const liList = document.querySelectorAll('.student-item');
const numberOfItemsPerPage = 10;
const page = document.querySelector('.page');



/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
function showPage(list, pageNumber) {
    const ul = document.createElement('ul');
    ul.className = "student-list";
    let li = document.createElement('li');
    let startIndex = pageNumber * numberOfItemsPerPage - numberOfItemsPerPage;
    let endIndex = pageNumber * numberOfItemsPerPage;
    if (endIndex >= liList.length) {
        endIndex = liList.length;
    }
    for (let i = startIndex; i < endIndex; i += 1) {
        li = liList[i];
        ul.appendChild(li);
    }
    const existingUl = document.querySelector('ul.student-list');
    const page = existingUl.parentNode;
    page.insertBefore(ul, existingUl);
    page.removeChild(existingUl);
}



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks() {
    const paginationDiv = document.createElement('div');
    const ul = document.createElement('ul');
    let li = document.createElement('li');
    const a = document.createElement('a');
    a.href = "#";
    li.appendChild(a);
    for (let i = 1; i < (liList.length/10); i += 1) {
        a.textContent = i;
        ul.appendChild(li);
    }
    page.appendChild(ul);
}




// Remember to delete the comments that came with this file, and replace them with your own code comments.
