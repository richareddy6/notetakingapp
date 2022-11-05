class User {
    constructor(email , password) {
      this.setEmail(email)
      this.setPassword(password)
    }
    getEmail() { return this.email; }
    getPassword() { return this.password; }
    setEmail(email) { this.email = email; }
    setPassword(password) { this.password = password; }
  }


  class Register {
    constructor(email , password,firstName,lastName) {
      this.setEmail(email)
      this.setPassword(password)
      this.setFirstName(firstName)
      this.setLastName(lastName)
    }
    getEmail() { return this.email; }
    getPassword() { return this.password; }
    getFirstName() { return this.firstName; }
    getLastName() { return this.lastName; }
    setEmail(email) { this.email = email; }
    setPassword(password) { this.password = password; }
    setFirstName(firstName) { this.firstName = firstName;}
    setLastName(lastName) { this.lastName = lastName;}
  }


  class Note {
    constructor(note) {
      this.setNote(note)
    }
    getNote() { return this.note; }
    setNote(note) { this.note = note; }
  }


  
function getLoginData(){
console.log("Fetching login data information...")
const user = new User(document.getElementById("username").value, document.getElementById("password").value);
console.log("The user id is : ",user.getEmail());
console.log("The password is : ",user.getPassword() );
}

function getRegestrationsData(){
    console.log("Fetching Register data information...")
    const register = new Register(document.getElementById("email").value, document.getElementById("psw").value,document.getElementById("first_name").value,document.getElementById("last_name").value);
    console.log("The email id is : ",register.getEmail());
    console.log("The password data is : ",register.getPassword());
    console.log("The first name data is : ",register.getFirstName());
    
    console.log("The last name  data is : ",register.getLastName());
    
}

function getNoteData(){
console.log("Fetching note data information...")
const note = new Note(document.getElementById("note").value);
console.log("The note data is : ",note.getNote());
}
