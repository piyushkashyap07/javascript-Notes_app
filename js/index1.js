// console.log("this is project on Note making")
shownotes();
// if user adds a note then add that to local storage
let addBtn=document.getElementById('addBtn');
let editBtn = document.getElementById("editBtn");
addBtn.addEventListener("click", function(e){
    let addTxt=document.getElementById("addTxt");
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value="";
    // console.log(notesObj);
    shownotes();
})
editBtn.addEventListener("click", function(e){
    let addTxt=document.getElementById("addTxt");
    let notes=localStorage.getItem("notes");
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj[this.id] = addTxt.value;
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value="";
    addBtn.classList.remove("d-none");
    editBtn.classList.add('d-none');
    // console.log(notesObj);
    shownotes();
})
function shownotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element,index){
        html +=` <div class="notecard mx-3 my-3 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index+1}</h5>
                    <p class="card-text">${element}</p>
                    <button id="delete_${index}" onclick="deleteNote(${index})" type="button" class="btn btn-danger">Delete</button>
                    <button id="edit_${index}" onclick="editNote(${index})" type="button" class="btn btn-primary">Edit</button>
                </div>
            </div>
        `
    });
    let notesElm=document.getElementById("notes");
    if(notesObj.length !=0){
        notesElm.innerHTML=html;
    }
    else{
        notesElm.innerHTML=`Nothing to Show! Use Add a note Section to Add Notes  `
    }
}

// function on ediittt

function editNote(index) {
    let addTxt = document.getElementById("addTxt");
    
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    txtedit = notesObj[index];
    addBtn.classList.add('d-none');
    editBtn.classList.remove('d-none');
    editBtn.id = index
    addTxt.value = txtedit
    console.log(editBtn)
}

// Function to delete a note
function deleteNote(index){
    // console.log('I am deleting',index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    shownotes();
}
let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener("input",function(){
    let inputVal = searchTxt.value.toLowerCase();
    // console.log('input event fired!',inputVal);
    let notecard = document.getElementsByClassName('notecard');
    Array.from(notecard).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })

})