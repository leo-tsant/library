const myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.toggleStatus = function () {
    this.status = this.status === "Read" ? "Not Read" : "Read";
};

const tableBody = document.querySelector(".table-body");

function displayBooks() {
    tableBody.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        const row = document.createElement("tr");
        row.setAttribute("data-index", i);

        const deleteButton = document.createElement("td");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="25px">
                                    <path
                                        d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
                                    />
                                </svg>`;

        const statusButton = document.createElement("button");
        statusButton.classList.add("status-button");
        statusButton.classList.add("add-book");
        statusButton.textContent = "Toggle Status";

        statusButton.addEventListener("click", () => {
            myLibrary[i].toggleStatus();
            displayBooks();
        });

        row.innerHTML = `<td>${myLibrary[i].title}</td>
                                                <td>${myLibrary[i].author}</td>
                                                <td>${myLibrary[i].pages}</td>
                                                <td>${myLibrary[i].status + " "}</td>`; // Add a space after the status
        const statusCell = row.querySelector("td:last-child");
        statusCell.appendChild(statusButton); // Append the status button to the status cell
        tableBody.appendChild(row);
        row.appendChild(deleteButton); // Append the delete button to the row
    }
}

function addBookToLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
    displayBooks();
}

const addBookButton = document.querySelector(".add-book");
const popupOverlay = document.querySelector(".overlay");
const closeButton = document.querySelector(".close-button");
const addBookForm = document.getElementById("add-book-form");

addBookButton.addEventListener("click", () => {
    popupOverlay.style.display = "flex";
});

closeButton.addEventListener("click", () => {
    popupOverlay.style.display = "none";
});

addBookForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const status = document.getElementById("status").value;
    addBookToLibrary(title, author, pages, status);
    popupOverlay.style.display = "none";
});

displayBooks();
