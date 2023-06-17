let myLibrary = []
const libraryContainer = document.getElementById("main-section")
const addBookButton = document.querySelector(".addBookButton")
const modal = document.querySelector(".modal")

addBookButton.onclick = () =>{
    modal.style.display = "block" 
}

window.onclick = (e) =>{
    if(e.target === modal){
        modal.style.display = "none"
    }
}

function Book(title,author,pages,read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

const one = new Book("Harry potter","J K Rowling",100,false)
const two = new Book("Flashpoint","DC",400,true)

function addBookToLibrary(){
    myLibrary.push(one)
    myLibrary.push(two)
}

addBookToLibrary()

function displayBook(){
    myLibrary.forEach(book => {
        const card = `<div class="card">
                            <h2>${book.title}</h2>
                            <h3>${book.author}</h3>
                            <h4>${book.pages}</h4>
                        </div>`;
        const div = document.createElement('div')
        div.innerHTML = card
        libraryContainer.appendChild(div)
    })
}

displayBook()


