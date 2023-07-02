let myLibrary =  []
let initialLoad = true
const libraryContainer = document.getElementById("main-section")
const addBookButton = document.querySelector(".addBookButton")
const modal = document.querySelector(".modal")
const BookForm = document.getElementById("bookForm")
let index = 0

//Populating the library with books
retriveLoad()
retriveLibrary()
displayTheBooks()

// function to store initial load value in local storage
function saveLoad(){
    localStorage.setItem("load",JSON.stringify(initialLoad))
}

// function to retrive whether it is initial load or not
function retriveLoad(){
    initialLoad = JSON.parse(localStorage.getItem("load"))
}

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
    if(initialLoad) return
    myLibrary = JSON.parse(localStorage.getItem("library"))
}


// Creating 2 sample books and adding it to library only at the initial load
if(initialLoad){
    const one = new Book("Harry potter","J K Rowling",100,false)
    const two = new Book("Flashpoint","DC",400,true)
    myLibrary.push(one)
    myLibrary.push(two)
    initialLoad = false
    displayTheBooks()
    save()
    saveLoad()
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
    if(initialLoad) return
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