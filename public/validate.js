class User {
    constructor(username , password) {
      this.setEmail(username)
      this.setPassword(password)
    }
    getEmail() { return this.username; }
    getPassword() { return this.password; }
    setEmail(email) { this.username = email; }
    setPassword(password) { this.password = password; }
  }


  class Register {
    constructor(username , password,firstname,lastname) {
      this.setEmail(username)
      this.setPassword(password)
      this.setFirstName(firstname)
      this.setLastName(lastname)
    }
    getEmail() { return this.username; }
    getPassword() { return this.password; }
    getFirstName() { return this.firstname; }
    getLastName() { return this.lastname; }
    setEmail(email) { this.username = email; }
    setPassword(password) { this.password = password; }
    setFirstName(firstName) { this.firstname = firstName;}
    setLastName(lastName) { this.lastname = lastName;}
  }


  class Note {
    constructor(note) {
      this.setNote(note)
      this.setUserID(0)
    }
    getNote() { return this.note; }
    setNote(note) { this.note = note; }
    setUserID(userid){this.userID=userid;}
  }


  
function getLoginData(){
console.log("Fetching login data information...")
const user = new User(document.getElementById("username").value, document.getElementById("password").value);
console.log("The user id is : ",user.getEmail());
console.log("The password is : ",user.getPassword() );
  fetchData("/users/login", user, "POST")
  .then((data) => {
    setCurrentUser(data);
    window.location.href = "note.html";
  })
  .catch((err) => {
    console.log(`Error!!! ${err.message}`)
  }) 
}

function getRegestrationsData(){
    console.log("Fetching Register data information...")
    const register = new Register(document.getElementById("email").value, document.getElementById("psw").value,document.getElementById("first_name").value,document.getElementById("last_name").value);
    console.log("The email id is : ",register.getEmail());
    console.log("The password data is : ",register.getPassword());
    console.log("The first name data is : ",register.getFirstName());
    
    console.log("The last name  data is : ",register.getLastName());
    const user =new User(document.getElementById("email").value, document.getElementById("psw").value)
  console.log(register)
    fetchData("/users/register", register, "POST")
  .then((data) => {
    setCurrentUser(data);
    alert("registration success")
    window.location.href = "note.html";
  })
  .catch((err) =>{
    console.log(err);
  })
}

function getNoteData(e){
  
console.log("Fetching note data information...")
const note = new Note(document.getElementById("note").value);
console.log("The note data is : ",note.getNote());
let user = getCurrentUser();
note.setUserID(user.user_id);
fetchData("/notes/create", note , "POST")
.then((data) => {
//setCurrentUser(data);
console.log(data);

alert("Inserted successfully");
window.location.reload();
})
.catch((err) =>{
let p = document.querySelector('.error');

})
}


function setCurrentUser(user) {
  localStorage.setItem('registered_user', JSON.stringify(user));
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('registered_user'));
}
function removeCurrentUser() {
  localStorage.removeItem('user');
  window.location.href="login.html";
}


async function fetchData(route = '', data = {}, methodType) {
  const token = sessionStorage.getItem('token');
  const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType, 
    mode: 'cors',
    cache: 'no-cache', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer',
    Authorization: `Bearer ${token}`,
    body: JSON.stringify(data)
  });
  if(response.ok) {
    return await response.json(); 
  } else {
    throw await response.json();
  }
}
