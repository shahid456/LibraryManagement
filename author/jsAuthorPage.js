
(function authorTableManagement() {
  
  let authorNumbers = authorList();
  debugger
  let myTable = document.getElementById("tableAuthors");
  let tableLength = myTable.childNodes.length-2;
  let authors = Object.keys(authorNumbers);
  let len = authors.length;
  if(tableLength!=len) {
    let row = ""; 
    let t = "";
    let z = "";
    let b = "";
    for(let k=0; k<len; k++){
      row = document.createElement("tr");
      myTable.appendChild(row);
        
      z = document.createElement("TD");
      t = document.createTextNode(authors[k]);
      z.appendChild(t);
      row.appendChild(z);
              
      z = document.createElement("TD");
      t = document.createTextNode(authorNumbers[authors[k]]);
      z.appendChild(t);
      row.appendChild(z);
        
      z = document.createElement("TD");
      b = document.createElement("span");
      b.innerHTML = '<button id="'+ authors[k] +'" onclick = "deleteAuthor(this.id)"/>delete</button>';
      z.appendChild(b);
      row.appendChild(z);
        
    }

  }
})();

function authorList() {
  let authorNumbers = {};
  let storage = localStorage;
  for(let k=0; k<storage.length; k++){
    let book = localStorage.key(k);
    let data = JSON.parse(storage[book]);
    if(authorNumbers.hasOwnProperty(data["Author"])) {
      authorNumbers[data["Author"]]++; 
    } else{
      authorNumbers[data["Author"]] = 1;
    }

  }
  return authorNumbers;
}

function deleteAuthor(authorId){
  debugger
  console.log(authorId)
  let storage = localStorage;
  let book = "";
  let data = "";
  for(let k=0; k<storage.length; k++){
    book = localStorage.key(k);
    data = JSON.parse(localStorage.getItem(book));
    if(authorId==data["Author"]) {
      localStorage.removeItem(book);
      k--;
    }
  }
  location.reload();
}