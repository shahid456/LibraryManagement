(function publisherTableManagement() {
  
  let publisherNumbers = JSON.parse(localStorage.getItem("Publishers"));
  debugger
  let myTable = document.getElementById("tablePublishers");
  let tableLength = myTable.childNodes.length-2;
  let len = publisherNumbers.length;
  if(tableLength!=len) {
    let row = ""; 
    let text = "";
    let tdata = "";
    let button = "";
    for(let k=0; k<len; k++){
      row = document.createElement("tr");
      myTable.appendChild(row);
      let publisher = Object.keys(publisherNumbers[k]);  
      tdata = document.createElement("TD");
      text = document.createTextNode(publisher);
      tdata.appendChild(text);
      row.appendChild(tdata);
              
      tdata = document.createElement("TD");
      text = document.createTextNode(publisherNumbers[k][publisher]);
      tdata.appendChild(text);
      row.appendChild(tdata);
        
      tdata = document.createElement("TD");
      button = document.createElement("span");
      button.innerHTML = '<button onclick = "deletePublisher(\'' + publisherNumbers[k] + '\')">delete</button>';
      tdata.appendChild(button);
      row.appendChild(tdata);
        
    }

  }
})();
  
function deletePublisher(publisherId){
  debugger
  
  let books = JSON.parse(localStorage.getItem("books"));
  let authors = JSON.parse(localStorage.getItem("Authors"));
  let publishers = JSON.parse(localStorage.getItem("Publishers"));
  
  for(let k=0; k<publishers.length; k++) {
    if(publishers[k].hasOwnProperty(publisherId)) {
      publishers.splice(k,1);
      break;
    }
  }
  for (let k = 0; k < books.length; k++) {
    if (books[k]['Publisher'] == publisherId) {
      let author = books[k]['Author'];
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
      books.splice(k,1);
    }
  }
  localStorage.setItem("Authors",JSON.stringify(authors));
  localStorage.setItem("books",JSON.stringify(books));
  localStorage.setItem("Publishers",JSON.stringify(publishers));
  location.reload();
}