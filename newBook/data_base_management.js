
function submitted(form) {
  let book = form['Book_Name'].value.trim();
  let author = form['Author_Name'].value.trim();
  let publisher = form['Publisher_Name'].value.trim();
  let date = form['date'].value.trim();
  let data = {
    "book": book,
    "Author": author,
    "Publisher": publisher,
    "date": date

  };


  if (author != "" && book != "" && publisher != "" && date != "") {

    let check = true;

    let bookData = JSON.parse(localStorage.getItem("books"));
    for (let k = 0; bookData != null && k < bookData.length; k++) {
      if (bookData[k]['book'] == book) {
        check = false;
        alert(book + 'already in library');
        break;
      }
    }
    if (check) {
      if (bookData != null) {
        bookData.push(data);
      } else {
        let writeBook = [];
        writeBook.push(data);
        bookData = writeBook;
      }
      bookData = JSON.stringify(bookData);
      localStorage.setItem("books", bookData);
  
      //Author's Data base Management
      let authorData = JSON.parse(localStorage.getItem("Authors"));

      if (authorData != null) {
        let authorIndex = -1;
        for (let k = 0; k < authorData.length; k++) {
          if (authorData[k].hasOwnProperty(author)) {
            authorIndex = k;
          }
        }
        if (authorIndex != -1) {
          let numAuthors = authorData[authorIndex][author] + 1;
          let newAuthor = {};
          newAuthor[author] = numAuthors;
          authorData.splice(authorIndex, 1, newAuthor);
          localStorage.setItem("Authors", JSON.stringify(authorData));
        } else {

          let newAuthor = {};
          newAuthor[author] = 1;
          authorData.push(newAuthor);
          localStorage.setItem("Authors", JSON.stringify(authorData));
        }


      } else {
        let writeAuthor = [];
        let newAuthor = {};
        newAuthor[author] = 1;
        writeAuthor.push(newAuthor);
        localStorage.setItem("Authors", JSON.stringify(writeAuthor));
      }
    }



    //Publisher's Data base Management
    let publisherData = JSON.parse(localStorage.getItem("Publishers"));

    if (publisherData != null) {
      let publisherIndex = -1;
      for (let k = 0; k < publisherData.length; k++) {
        if (publisherData[k].hasOwnProperty(publisher)) {
          publisherIndex = k;
        }
      }
      if (publisherIndex != -1) {
        let numPublishers = publisherData[publisherIndex][publisher] + 1;
        let newPublisher = {};
        newPublisher[publisher] = numPublishers;
        publisherData.splice(publisherIndex, 1, newPublisher);
        localStorage.setItem("Publishers", JSON.stringify(publisherData));
      } else {
        let newPublisher = {};
        newPublisher[publisher] = 1;
        publisherData.push(newPublisher);
        localStorage.setItem("Publishers", JSON.stringify(publisherData));
      }


    } else {
      let writePublisher = [];
      let newPublisher = {};
      newPublisher[publisher] = 1;
      writePublisher.push(newPublisher);
      localStorage.setItem("Publishers", JSON.stringify(writePublisher));
    }
  }


  document.getElementById("new_book").reset();
}
