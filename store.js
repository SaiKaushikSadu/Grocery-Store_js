const alert=document.querySelector(".alert");
const form=document.querySelector(".grocery-form");
const grocery=document.getElementById("grocery");
const submitBtn=document.querySelector(".submit-btn");
const container=document.querySelector(".grocery-container");
const list=document.querySelector(".grocery-list");
const clearbtn=document.querySelector(".clear-btn");

let editItem;
let editFlag=false;
let editId="";

form.addEventListener("submit",addItem);

clearbtn.addEventListener("click",clearItems);

function addItem(e){
    e.preventDefault();
    // console.log(grocery.value);
    const value=grocery.value;
    const id=new Date().getTime().toString();// will give some sort of unique value
    // console.log(id);
    if(value && !editFlag){
        // console.log("add item to list");
        const element=document.createElement('article');
        element.classList.add('grocery-item');
        const attr=document.createAttribute('data-id');
        attr.value=id;
        element.setAttributeNode(attr);
        element.innerHTML=`
        <p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        `;

        const deleteBtn=element.querySelector('.delete-btn');
        const editBtn=element.querySelector('.edit-btn');
        deleteBtn.addEventListener('click',deleteItem);
        editBtn.addEventListener('click',editItems);
        
        //append child
        list.appendChild(element);
        //display alert
        displayAlert("Item added to the list","success");
        //show items in container (show-container class)
        container.classList.add("show-container");

        localStorage(id,value);

        setBackToDefault();

    }
    else if(value && editFlag){
        // console.log("Edit item");
        editElement.innerHTML=value;
        displayAlert("Edited","success");
        editLocalStorage(editId,value);
        setBackToDefault();
    }
    else{
        // alert.textContent='Empty Field Value';
        // alert.classList.add("alert-danger");
        displayAlert("Please Enter Value","danger");
    }
}

function deleteItem(e){
    // console.log("item deleted");
    const element=e.currentTarget.parentElement.parentElement;
    const id=element.dataset.id;
    list.removeChild(element);
    if(list.children.length===0){
        container.classList.remove("show-container");
    }
    displayAlert("Item Removed","danger");
    setBackToDefault();
    // removeFromLocalStorage(id);
}

function editItems(e){
    const element=e.currentTarget.parentElement.parentElement;
    editElement=e.currentTarget.parentElement.previousElementSibling;
    grocery.value=editElement.innerHTML;
    editFlag=true;
    editId=element.dataset.id;
    submitBtn.textContent="Edit";
}

function clearItems(){
    const items=document.querySelectorAll(".grocery-item");

    if(items.length>0){
        items.forEach(item => {
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("GONE",'danger');
    setBackToDefault();
    // localStorage.removeItem('list');
}

function displayAlert(text,action) {
    alert.textContent=text;
    alert.classList.add(`alert-${action}`);

    //remove alert 
    setTimeout(function() {
        alert.textContent="";
        alert.classList.remove(`alert-${action}`); 
    }, 1000);
}

function localStorage(id,value) {
    console.log("added to local storage");
}

function removeFromLocalStorage(id){

}

function setBackToDefault(){
    grocery.value="";
    editFlag=false;
    editId="";
    submitBtn.textContent="submit";
}

function editLocalStorage(id,value){

}



