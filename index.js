function saveToLocalStorage(event) {
    event.preventDefault();
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    const phonenumber = event.target.phonenumber.value;
    
    const obj = {
        name,
        email,
        phonenumber
    }
    axios.post("https://crudcrud.com/api/253a978e6dcf4d4f9f6ec8d82a091fc4/Appoinmentdata",obj)
    .then((respone)=>{
        showNewUserOnScreen(respone.data)
    console.log(respone)
    })
    .catch((err)=>{
        console.log(err)
    })
    // localStorage.setItem(obj.email, JSON.stringify(obj))
    // showNewUserOnScreen(obj)
}

window.addEventListener("DOMContentLoaded", () => {

    axios.get("https://crudcrud.com/api/253a978e6dcf4d4f9f6ec8d82a091fc4/appoinmentdata")
    .then((respone)=>{
        // console.log(respone)

        for(var i =0;i<respone.data.length;i++){
            showNewUserOnScreen(respone.data[i])
        }
    })

    .catch((error)=>{
        console.log(error)
    })
    const localStorageObj = localStorage;
    const localstoragekeys  = Object.keys(localStorageObj)

    for(var i =0; i< localstoragekeys.length; i++){
        const key = localstoragekeys[i]
        const userDetailsString = localStorageObj[key];
        const userDetailsObj = JSON.parse(userDetailsString);
        showNewUserOnScreen(userDetailsObj)
    }
})

function showNewUserOnScreen(user){

    user={
        _id: '',
        name: '',
        email: '',
    }

    document.getElementById('email').value = '';
    document.getElementById('username').value = '';
    document.getElementById('phonenumber').value ='';
    // console.log(localStorage.getItem(user.emailId))
    if(localStorage.getItem(user.email) !== null){
        removeUserFromScreen(user.email)
    }

    const parentNode = document.getElementById('listOfUsers');
    const childHTML = `<li id=${user.email}> ${user.name} - ${user.email}
                            <button onclick=deleteUser('${user.id}')> Delete User </button>
                            <button onclick=editUserDetails('${user.id}','${user.name}','${user.phonenumber},'${userid}')>Edit User </button>
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//Edit User

function editUserDetails(emailId, name, phonenumber,userid){
    axios.edit

    document.getElementById('email').value = emailId;
    document.getElementById('username').value = name;
    document.getElementById('phonenumber').value =phonenumber;

    deleteUser(emailId)
 }

// deleteUser('abc@gmail.com')

function deleteUser(userid){
    axios.delete(`https://crudcrud.com/api/253a978e6dcf4d4f9f6ec8d82a091fc4/appoinmentdata/${userid}`)
    .then((response)=>{
        removeUserFromScreen(userid)
    })
    .catch((err)=>{
console.log(err)
    })

    // console.log(emailId)
    // localStorage.removeItem(emailId);
    // removeUserFromScreen(emailId);

}

function removeUserFromScreen(userid){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(emailId);
    if(childNodeToBeDeleted) {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}






