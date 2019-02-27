(function publisherTableManagement() {
  
    let publisherNumbers = publisherList();
    debugger
    let myTable = document.getElementById("tablePublishers");
    let tableLength = myTable.childNodes.length-2;
    let publishers = Object.keys(publisherNumbers);
    let len = publishers.length;
    if(tableLength!=len) {
      let row = ""; 
      let t = "";
      let z = "";
      let b = "";
      for(let k=0; k<len; k++){
        row = document.createElement("tr");
        myTable.appendChild(row);
          
        z = document.createElement("TD");
        t = document.createTextNode(publishers[k]);
        z.appendChild(t);
        row.appendChild(z);
                
        z = document.createElement("TD");
        t = document.createTextNode(publisherNumbers[publishers[k]]);
        z.appendChild(t);
        row.appendChild(z);
          
        z = document.createElement("TD");
        b = document.createElement("span");
        b.innerHTML = '<button id="'+ publishers[k] +'" onclick = "deletePublisher(this.id)"/>delete</button>';
        z.appendChild(b);
        row.appendChild(z);
          
      }
  
    }
  })();
  
  function publisherList() {
    let publisherNumbers = {};
    let storage = localStorage;
    for(let k=0; k<storage.length; k++){
      let book = localStorage.key(k);
      let data = JSON.parse(storage[book]);
      if(publisherNumbers.hasOwnProperty(data["Publisher"])) {
        publisherNumbers[data["Publisher"]]++; 
      } else{
        publisherNumbers[data["Publisher"]] = 1;
      }
  
    }
    return publisherNumbers;
  }
  
  function deletePublisher(publisherId){
    debugger
    console.log(publisherId)
    let storage = localStorage;
    let book = "";
    let data = "";
    for(let k=0; k<storage.length; k++){
      book = localStorage.key(k);
      data = JSON.parse(localStorage.getItem(book));
      if(publisherId==data["Publisher"]) {
        localStorage.removeItem(book);
        k--;
      }
    }
    location.reload();
  }