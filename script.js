const bookContainer = document.querySelector(".books-container");
const addBookForm = document.querySelector(".add-book-form");
const modal = document.querySelector(".modal");
const titelInput = document.querySelector("#input-title");
const authorInput = document.querySelector("#input-author");
const yearInput = document.querySelector("#input-year");
const pagesInput = document.querySelector("#input-pages");
const isReadInput = document.querySelector("#input-status");

const thisYear = new Date().getFullYear();
yearInput.setAttribute("max", thisYear);

let myLibrary = [];

class Book {
  constructor(title, author, year, pages, isRead) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.isRead = isRead;
  }
}

function addBookToLibrary(title, author, year, pages, isRead) {
  const book = new Book(title, author, year, pages, isRead);
  myLibrary.push(book);
}

function displayBook() {
  for (let i = 0; i < myLibrary.length; i++) {

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const bookTitle = document.createElement("span");
    bookTitle.classList.add("book-title");
    bookTitle.innerText = myLibrary[i].title;

    const bookAuthor = document.createElement("span");
    bookAuthor.classList.add("book-author");
    bookAuthor.innerText = `By ${myLibrary[i].author}`;

    const bookYear = document.createElement("span");
    bookYear.classList.add("book-year");
    bookYear.innerText = `Year: ${myLibrary[i].year}`;

    const bookPages = document.createElement("span");
    bookPages.classList.add("book-pages");
    bookPages.innerText = `Pages: ${myLibrary[i].pages}`;
    
    const statusDiv = document.createElement("div");
    statusDiv.classList.add("status-container");
    
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("btn-remove");
    removeBtn.setAttribute("data-index", i);
    removeBtn.innerHTML = `<img src="./icons/delete-icon.svg" alt="Remove">`
    removeBtn.addEventListener("click", removeBook);
    
    const bookStatus = document.createElement("span");
    bookStatus.classList.add("book-status");
    bookStatus.innerText = `${myLibrary[i].isRead ? "Read" : "Not Read"}`;

    const statusToggle = document.createElement("span");
    statusToggle.classList.add("status-toggle");

    statusToggle.innerHTML = myLibrary[i].isRead? 
              `<img src="./icons/toggle-status-green.svg" alt="toggle">`
              :`<img src="./icons/toggle-status.svg" alt="toggle">`;

    statusToggle.addEventListener("click", () => {
      myLibrary[i].isRead = !myLibrary[i].isRead;
      if (myLibrary[i].isRead) {
        statusToggle.innerHTML = `<img src="./icons/toggle-status-green.svg" alt="toggle">`;
        bookStatus.innerText = "Read";
        bookStatus.style.color = "#04a96d";
      } else {
        statusToggle.innerHTML = `<img src="./icons/toggle-status.svg" alt="toggle">`;
        bookStatus.innerText = "Not Read";
        bookStatus.style.color = "#cccccc";
      }
    })

    statusDiv.appendChild(bookStatus);
    statusDiv.appendChild(statusToggle);
    
    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookYear);
    bookDiv.appendChild(bookPages);
    bookDiv.appendChild(removeBtn);
    bookDiv.appendChild(statusDiv);

    bookContainer.appendChild(bookDiv);

  }
}

function removeBook(e) {
  myLibrary.splice(e.currentTarget.dataset.index, 1);
  e.currentTarget.parentElement.remove();
}

function displayAddButton() {
  const btnAdd = document.createElement("button");
  btnAdd.classList.add("btn-add");
  btnAdd.innerText = "+"
  btnAdd.addEventListener("click", () => {
    modal.style.display = "flex";
  })
  bookContainer.appendChild(btnAdd);
}

window.addEventListener("click", (e) => {
  if(e.target == modal) {
    modal.style.display = "none";
  }
})

displayBook();
displayAddButton();

function updateLibraryDisplay() {
  bookContainer.innerHTML = ""
  displayBook()
  displayAddButton()
}

function addNewBook(e) {
  e.preventDefault();
  let title = titelInput.value;
  let author = authorInput.value;
  let year = yearInput.value;
  let pages = pagesInput.value;
  let isRead = isReadInput.checked ? true : false;
  addBookToLibrary(title, author, year, pages, isRead);
  modal.style.display = "none";
  addBookForm.reset();
  updateLibraryDisplay();
}

function formValidation() {
  titelInput.addEventListener("input", () => {
    if (titelInput.validity.valueMissing) {
      titelInput.setCustomValidity("Title can't be empty");
      titelInput.reportValidity();
    } else {
      titelInput.setCustomValidity("");
    }
  })

  authorInput.addEventListener("input", () => {
    if (authorInput.validity.valueMissing) {
      authorInput.setCustomValidity("Author can't be empty");
      authorInput.reportValidity();
    } else {
      authorInput.setCustomValidity("");
    }
  })

  yearInput.addEventListener("input", () => {
    if (yearInput.validity.valueMissing) {
      yearInput.setCustomValidity("Year can't be empty");
      yearInput.reportValidity();
    } else {
      yearInput.setCustomValidity("");
    }
  })
  
  pagesInput.addEventListener("input", () => {
    if (pagesInput.validity.valueMissing) {
      pagesInput.setCustomValidity("Pages can't be empty");
      pagesInput.reportValidity();
    } else {
      pagesInput.setCustomValidity("");
    }
  })
}

formValidation();

addBookForm.addEventListener("submit", addNewBook)