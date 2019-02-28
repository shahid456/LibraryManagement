
(function table() {
  debugger
  let bookData = JSON.parse(localStorage.getItem('books'));
  let len = bookData.length;
  let myTable = document.getElementById("tableBooks");
  let tableLength = myTable.childNodes.length - 2;
  if (tableLength != len) {


    let row = "";
    let text = "";
    let tdata = "";
    let button = "";
    for (let k = 0; k < len; k++) {
      row = document.createElement("tr");
      myTable.appendChild(row);

      tdata = document.createElement("TD");
      text = document.createTextNode(bookData[k]['book']);
      tdata.appendChild(text);
      row.appendChild(tdata);

      tdata = document.createElement("TD");
      text = document.createTextNode(bookData[k]["Author"]);
      tdata.appendChild(text);
      row.appendChild(tdata);

      tdata = document.createElement("TD");
      text = document.createTextNode(bookData[k]["Publisher"]);
      tdata.appendChild(text);
      row.appendChild(tdata);

      tdata = document.createElement("TD");
      text = document.createTextNode(bookData[k]["date"]);
      tdata.appendChild(text);
      row.appendChild(tdata);

      tdata = document.createElement("TD");
      button = document.createElement("span");
      button.innerHTML = '<button onclick="deleteBook(\'' + bookData[k]["book"] + '\')">delete</button>';
      tdata.appendChild(button);
      row.appendChild(tdata);

      let button1 = document.createElement("span");
      button1.innerHTML = '<button onclick="updateButton(\'' + bookData[k]["book"] + '\')">update</button>';
      tdata.appendChild(button1);
      row.appendChild(tdata);
    }
  }
})();

function deleteBook(bookId) {
  debugger
  let books = JSON.parse(localStorage.getItem("books"));
  let authors = JSON.parse(localStorage.getItem("Authors"));
  let publishers = JSON.parse(localStorage.getItem("Publishers"));
  let index = -1;
  for (let k = 0; k < books.length; k++) {
    if (books[k]['book'] == bookId) {
      index = k;
      break;
    }
  }
  let author = books[index]['Author'];
  for(let k=0; k<authors.length; k++) {
    if(authors[k].hasOwnProperty(author)) {
      if(authors[k][author]>1) {
        let newAuthor = {};
        newAuthor[author] = authors[k][author]-1;
        authors.splice(k,1,newAuthor);
        break;
      } else{
        authors.splice(k,1);
        break;
      }
    }
  }
  let publisher = books[index]['Publisher'];
  for(let k=0; k<publishers.length; k++) {
    if(publishers[k].hasOwnProperty(publisher)) {
      if(publishers[k][publisher]>1) {
        let newPublisher = {};
        newPublisher[publisher] = publishers[k][publisher]-1;
        publishers.splice(k,1,newPublisher);
        break;
      } else{
        publishers.splice(k,1);
        break;
      }
    }
  }
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  localStorage.setItem("Authors",JSON.stringify(authors));
  localStorage.setItem("Publishers",JSON.stringify(publishers));
  location.reload();
}

function updateButton(book) {
  location.href = 'update/updateBook.html';
}

