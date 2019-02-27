
function submitted(form){
  let book = form['Book_Name'].value.trim();
  let author =  form['Author_Name'].value.trim();
  let publisher = form['Publisher_Name'].value.trim();
  let date = form['date'].value.trim();
  let data = {
    "book": book,
    "Author": author,
    "Publisher": publisher,
    "date": date

  };
  data = JSON.stringify(data);
  if(author != "" && book != "" && publisher != "" && date != ""){
    localStorage.setItem("book", data);
  }
  document.getElementById("new_book").reset();
}
