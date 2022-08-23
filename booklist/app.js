class Book {
  constructor(title, author, number) {
    this.title = title;
    this.author = author;
    this.number = number;
  }
}

class UI {
  static displayBooks(){
    const StoredBooks = [
      {
        title: "one",
        author: "one",
        number: "one"
      }
    ];

    const books = StoredBooks;

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book){
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.number}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#number").value = "";
  }
}

document.addEventListener("DOMContentLoaded", UI.displayBooks);

document.querySelector("#book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const number = document.querySelector("#number").value;

  const book = new Book(title, author, number);

  UI.addBookToList(book);

  UI.clearFields();
});

document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
});
