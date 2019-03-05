
(function authorTableManagement() {
  
  let authorNumbers = JSON.parse(localStorage.getItem("Authors"));
  debugger
  let myTable = document.getElementById("tableAuthors");
  let tableLength = myTable.childNodes.length-2;
  let len = authorNumbers.length;
  if(tableLength!=len) {
    let row = ""; 
    let text = "";
    let tdata = "";
    let button = "";
    for(let k=0; k<len; k++){
      row = document.createElement("tr");
      myTable.appendChild(row);
      let author = Object.keys(authorNumbers[k]);  
      tdata = document.createElement("TD");
      text = document.createTextNode(author);
      tdata.appendChild(text);
      row.appendChild(tdata);
              
      tdata = document.createElement("TD");
      text = document.createTextNode(authorNumbers[k][author]);
      tdata.appendChild(text);
      row.appendChild(tdata);
        
      tdata = document.createElement("TD");
      button = document.createElement("span");
      button.innerHTML = '<button onclick = "deleteAuthor(\'' + author + '\')">delete</button>';
      tdata.appendChild(button);
      row.appendChild(tdata);
        
    }

  }
})();

function deleteAuthor(authorId){
  let books = JSON.parse(localStorage.getItem("books"));
  let authors = JSON.parse(localStorage.getItem("Authors"));
  let publishers = JSON.parse(localStorage.getItem("Publishers"));
  
  for(let k=0; k<authors.length; k++) {
    if(authors[k].hasOwnProperty(authorId)) {
      authors.splice(k,1);
      break;
    }
  }
  for (let k = 0; k < books.length; k++) {
    if (books[k]['Author'] == authorId) {
      let publisher = books[k]['Publisher'];
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
      books.splice(k,1);
    }
  }
  localStorage.setItem("Authors",JSON.stringify(authors));
  localStorage.setItem("books",JSON.stringify(books));
  localStorage.setItem("Publishers",JSON.stringify(publishers));
  location.reload();
}