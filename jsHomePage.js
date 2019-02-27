
(function table(){
    debugger
    let storage = localStorage;
    let len =  storage.length;
    let myTable = document.getElementById("tableBooks");
    let tableLength = myTable.childNodes.length-2;
    let lastBookName = "";
    if(tableLength!=len) {
  
      let k = 0;
      lastBookName = myTable.lastChild.childNodes[0].innerText;
      let storageKeys = Object.keys(storage);
      while(lastBookName != storageKeys[k] && tableLength!=0) {
        k++;
      }
      if(k!=0) { 
        k++;
      }
      let row = ""; 
      let t = "";
      let z = "";
      let b = "";
      for(k; k<len; k++){
        let bookName = localStorage.key(k);
        let bookData = JSON.parse(storage[bookName]);
        row = document.createElement("tr");
        myTable.appendChild(row);
        
        z = document.createElement("TD");
        t = document.createTextNode(bookName);
        z.appendChild(t);
        row.appendChild(z);
        
        z = document.createElement("TD");
        t = document.createTextNode(bookData["Author"]);
        z.appendChild(t);
        row.appendChild(z);
        
        z = document.createElement("TD");
        t = document.createTextNode(bookData["Publisher"]);
        z.appendChild(t);
        row.appendChild(z);
        
        z = document.createElement("TD");
        t = document.createTextNode(bookData["date"]);
        z.appendChild(t);
        row.appendChild(z);
  
        z = document.createElement("TD");
        b = document.createElement("span");
        b.innerHTML = '<button id="'+ bookName +'" onclick = "deleteBook(this.id)"/>delete</button>';
        z.appendChild(b);
        row.appendChild(z);
        
        let b1 = document.createElement("button");
        let t2 = document.createTextNode("update");
        b1.appendChild(t2);
        z.appendChild(b1);
        row.appendChild(z);    
      }
    }
  })();
  
function deleteBook(bookId) {
    debugger
    localStorage.removeItem(bookId);
    location.reload();
}
  