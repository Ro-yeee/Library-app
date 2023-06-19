let myLibrary = []
const libraryContainer = document.getElementById("main-section")
const addBookButton = document.querySelector(".addBookButton")
const modal = document.querySelector(".modal")
const BookForm = document.getElementById("bookForm")

function Book(title,author,pages,read){
    this.title = title
    this.author = author
    this.pages = pages
    this.isread = read
}

const one = new Book("Harry potter","J K Rowling",100,false)
const two = new Book("Flashpoint","DC",400,true)

function addBookToLibrary(){
    myLibrary.push(one)
    myLibrary.push(two)
}

addBookToLibrary()

function returnClass(status){
    if(status === true) return "readBtn"
    else return "notReadBtn"
}

function returnStatus(status){
    if(status === true) return "Read"
    else return "Not read"
}

function displayTheBooks(){
    libraryContainer.textContent = ""
    myLibrary.forEach(book => {
        const card = `<div class="card">
                            <h2>${book.title}</h2>
                            <h3>${book.author}</h3>
                            <h4>Pages: ${book.pages}</h4>
                            <button class=${returnClass(book.isread)}>${returnStatus(book.isread)}</button>
                        </div>`;
        const div = document.createElement('div')
        div.innerHTML = card
        libraryContainer.appendChild(div)
    })
}

displayTheBooks()

addBookButton.onclick = () => modal.style.display = "block" 
window.onclick = (e) =>{ if(e.target === modal)   modal.style.display = "none"  }


function getDataFromForm(){
    const title = document.getElementById("title")
    const author = document.getElementById("author")
    const pages = document.getElementById("pages")
    const isread = document.getElementById("isread")
    const obj = new Book(title.value,author.value,pages.value,isread.checked)
    myLibrary.push(obj)
}

function clearForm(){
    title.value = ""
    author.value = ""
    pages.value = ""
    isread.checked = ""
}

BookForm.onsubmit = (e) =>{
    e.preventDefault()
    getDataFromForm()
    displayTheBooks()
    clearForm()
    modal.style.display = "none"
}
