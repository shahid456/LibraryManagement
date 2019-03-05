(function init() {
  const book = window.location.search.split('=')[1];
  let bookData = JSON.parse(localStorage.getItem("books"));
  let index = -1;

  let myForm = document.getElementById("myForm");
  for (let k = 0; k < bookData.length; k++) {
    if (bookData[k]['book'] === book) {
      index = k;
    }
  }
  if (myForm == null && index != -1) {
    let updateForm = document.createElement("form");
    updateForm.id = "myForm";
    document.body.appendChild(updateForm);

    let oldbook = document.createElement("input");
    oldbook.setAttribute("type", "text");
    oldbook.name = "Book_Name";
    oldbook.style.width = "60%";
    oldbook.style.marginBottom = "20px";
    oldbook.disabled = true;
    oldbook.value = book;
    updateForm.appendChild(oldbook);

    let author = document.createElement("input");
    author.setAttribute("type", "text");
    author.name = "Author_Name"
    author.style.width = "60%";
    author.style.marginBottom = "20px"
    author.value = bookData[index]['Author'];
    updateForm.appendChild(author);

    let publisher = document.createElement("input");
    publisher.setAttribute("type", "text");
    publisher.name = "Publisher_Name";
    publisher.style.width = "60%";
    publisher.style.marginBottom = "20px"
    publisher.value = bookData[index]['Publisher'];
    updateForm.appendChild(publisher);

    let date = document.createElement("input");
    date.setAttribute("type", "text");
    date.name = "date";
    date.style.width = "60%";
    date.style.marginBottom = "30px"
    date.value = bookData[index]['date'];
    updateForm.appendChild(date);
    debugger
    let button = document.createElement("button");
    button.style.marginLeft = "100px";
    button.innerHTML = "Submit";
    button.type = "submit";
    button.onclick = function () { updateBook(updateForm, book) };
    updateForm.appendChild(button);
  } else {
    if(myForm != null){
      let removeForm = document.getElementById("myFrom");
      removeForm.remove();
    }
    location.href = '../Home_page.html';

  }
})();

function updateBook(form, oldBook) {

  let newBook = form['Book_Name'].value.trim();
  let author = form['Author_Name'].value.trim();
  let publisher = form['Publisher_Name'].value.trim();
  let date = form['date'].value.trim();
  let data = {
    "book": newBook,
    "Author": author,
    "Publisher": publisher,
    "date": date

  };
  let index = -1;
  bookData = JSON.parse(localStorage.getItem("books"));
  let authors = JSON.parse(localStorage.getItem("Authors"));
  let publishers = JSON.parse(localStorage.getItem("Publishers"));
  for (let k = 0; k < bookData.length; k++) {
    if (bookData[k]['book'] == oldBook) {
      index = k;
    }
  }
  if (index != -1) {
    if (bookData[index]['Publisher'] != publisher) {
      let publisherIndex = -1;
      let oldPublisherIndex = -1;
      for (let k = 0; k < publishers.length; k++) {
        if (publishers[k].hasOwnProperty(publisher)) {
          publisherIndex = k;
        }
        if (publishers[k].hasOwnProperty(bookData[index]['Publisher'])) {
          oldPublisherIndex = k;
        }
      }

      if (publisherIndex != -1) {
        let numPublishers = publishers[publisherIndex][publisher] + 1;
        let newPublisher = {};
        newPublisher[publisher] = numPublishers;
        publishers.splice(publisherIndex, 1, newPublisher);
        localStorage.setItem("Publishers", JSON.stringify(publishers));
      } else {
        let newPublisher = {};
        newPublisher[publisher] = 1;
        publishers.splice(oldPublisherIndex, 1, newPublisher);
        localStorage.setItem("Publishers", JSON.stringify(publishers));
      }
    }

    if (bookData[index]['Author'] != author) {
      let authorIndex = -1;
      let oldAuthorIndex = -1
      for (let k = 0; k < authors.length; k++) {
        if (authors[k].hasOwnProperty(author)) {
          authorIndex = k;

        }
        if (authors[k].hasOwnProperty(bookData[index]['Author'])) {
          oldAuthorIndex = k
        }
      }

      if (authorIndex != -1) {
        let numAuthors = authors[authorIndex][author] + 1;
        let newAuthor = {};
        newAuthor[author] = numAuthors;
        authors.splice(authorIndex, 1, newAuthor);
        localStorage.setItem("Authors", JSON.stringify(authors));
      } else {

        let newAuthor = {};
        newAuthor[author] = 1;
        authors.splice(oldAuthorIndex, 1, newAuthor);
        localStorage.setItem("Authors", JSON.stringify(authors));
      }

    }
    bookData.splice(index, 1, data);
    localStorage.setItem("books", JSON.stringify(bookData));
  }


}