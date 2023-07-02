let myLibrary =  []
const libraryContainer = document.getElementById("main-section")
const addBookButton = document.querySelector(".addBookButton")
const modal = document.querySelector(".modal")
const BookForm = document.getElementById("bookForm")
let index = 0

//Populating the library with books
retriveLibrary()
displayTheBooks()

// Book constructor
function Book(title,author,pages,read){
    this.title = title
    this.author = author
    this.pages = pages
    this.isread = read
}

// function to save the library data in local storage
function save(){
    localStorage.setItem("library",JSON.stringify(myLibrary))
}

// function to retrive the library data
function retriveLibrary(){
    if(! JSON.parse(localStorage.getItem("library"))){
        myLibrary = []
    }
    myLibrary = JSON.parse(localStorage.getItem("library"))
}

// returns the appropriate style for the readstatus button
function returnClass(status){
    if(status === true) return "readBtn"
    else return "notReadBtn"
}

//returns the appropriate textcontent for the readstatus button
function returnStatus(status){
    if(status === true) return "Read"
    else return "Not read"
}

// function to populate the library with books
function displayTheBooks(){
    if(! myLibrary) return
    libraryContainer.textContent = ""
    myLibrary.forEach(book => {
        const card = `<div class="card">
                            <h2>${book.title}</h2>
                            <h3>${book.author}</h3>
                            <h4>Pages: ${book.pages}</h4>
                            <button class="${returnClass(book.isread)} Btn" value="${index}">${returnStatus(book.isread)}</button>
                            <button class="removeBtn" value="${index}">Remove</button>
                        </div>`;
        const div = document.createElement('div')
        div.innerHTML = card
        libraryContainer.appendChild(div)
        index++
    })
    index = 0
    addReadStatusButtonEvents()
    addRemoveButtonEvents()
}

// making the modal to show when addBook button is clicked and to disappear when the user clicks anywhere else in the screen
addBookButton.onclick = () => modal.style.display = "block" 
window.onclick = (e) =>{ 
    if(e.target === modal){
        modal.style.display = "none"
        clearForm()  
    }
}

//collecting book data from the form
BookForm.onsubmit = (e) =>{
    e.preventDefault()
    getDataFromForm()
    save()
    displayTheBooks()
    clearForm()
    modal.style.display = "none"
}
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

// Adding readStatusButton event listners to dynamically added DOM elements(Books)
function addReadStatusButtonEvents(){
    const statusButton = document.querySelectorAll(".Btn")
    statusButton.forEach(button =>{
        button.addEventListener('click', () =>{
            if(myLibrary[button.value].isread === true){
                myLibrary[button.value].isread = false
                save()
                displayTheBooks()
            }else if(myLibrary[button.value].isread === false){
                myLibrary[button.value].isread = true
                save()
                displayTheBooks()
            }
        })
    })
}

// Adding removeButton event listner to the Books
function addRemoveButtonEvents(){
    const removeButton = document.querySelectorAll(".removeBtn")
    removeButton.forEach(button =>[
        button.addEventListener('click', () =>{
            myLibrary.splice(button.value,1)
            save()
            displayTheBooks()
        })
    ])
}