const myLibrary = [];
const bookTable = document.getElementById('book-table');
const newBookButton = document.getElementById('new-book');
const saveButton = document.getElementById('save-button');
const newBookDialog = document.getElementById('newBookDialog');
const closeButton = document.getElementById('cancel');
const titleField = document.getElementById('title');
const authorField = document.getElementById('author');
const pagesField = document.getElementById('pages');
const readField = document.getElementById('read');

newBookButton.addEventListener("click", () => {
    newBookDialog.showModal();
});

saveButton.addEventListener("click", () => {
    if(validateForm()){
    addBookToLibrary(titleField.value,authorField.value,pagesField.value,readField.checked);
    addBookToTable(myLibrary[myLibrary.length-1])
    newBookDialog.close();
    clearAddForm();
    }else{
        alert('Incomplete book information');
    }
});

closeButton.addEventListener("click", () => {
    newBookDialog.close();
    clearAddForm();
});

class Book {
    constructor(title, author, pages, read, id){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }
    statement(){
        return this.title + ' by ' + this.author + '. ' + this.pages + ' pages, have ' + (this.read ? 'already' : 'not') + ' read. My ID is '+this.id ;
    }
    editBookAuthor(author){
        this.author = author;
    }
}

function addBookToLibrary(title, author, pages, read) {
    return (myLibrary.push(new Book(title, author, pages, read, myLibrary.length))-1);
}

function displayBooks() {
    for(book in myLibrary){
        addBookToTable(myLibrary[book]);
    }
}

function addBookToTable(book) {
    const newRow = bookTable.insertRow();
    addRemoveButtonToTable(newRow, book.id);
    addCellToTable(newRow, book.title);
    addCellToTable(newRow, book.author);
    addCellToTable(newRow, book.pages);
    addReadToTable(newRow, book.read);
    addReadButtonToTable(newRow, book.id);
}

function addCellToTable(row, data) {
    row.insertCell().appendChild(document.createTextNode(data));
}

function addReadToTable(row, read) {
    read ? row.insertCell().appendChild(document.createTextNode('Yes')) : row.insertCell().appendChild(document.createTextNode('No'));
}

function addRemoveButtonToTable(row, id){
    row.innerHTML = `<td><button class="remove" onClick="removeBook(this,${id})">X</button></td>`;
}

function addReadButtonToTable(row, id){
    row.innerHTML += `<td><button class="read" onClick="readBook(this,${id})">Read</button></td>`;
}

function clearAddForm() {
    titleField.value = '';
    authorField.value = '';
    pagesField.value = '';
    readField.checked = false;
}

function validateForm(){
    return (titleField.value && authorField.value && pagesField.value > 0)
}

function removeBook(cell,id) {
    myLibrary.splice(myLibrary.findIndex((book) => book.id==id),1);
    cell.parentNode.parentNode.parentNode.removeChild(cell.parentNode.parentNode);
}

function readBook(cell, id) {
    let book = myLibrary[myLibrary.findIndex((book) => book.id == id)];
    book.read = !book.read;
    cell.parentNode.previousSibling.innerHTML = book.read ? "Yes" : "No";
}


//Default Library
addBookToLibrary('The Hobbit','J.R.R. Tolkien',869,true);
addBookToLibrary('The Oath','Frank Peretti',954,true);
addBookToLibrary('Harry Potter and the Order of the Phoenix','JK Rowling',324,false);
addBookToLibrary('A Dance of Dragons','George R.R. Martin',463,false);
displayBooks();