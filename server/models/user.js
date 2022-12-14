/*

const users=[{
    userId:1,
    userName:"Richa",
    password:"richa06@"
},
{
    userId:2,
    userName:"Reddy",
    password:"richerich14@"
},
{
    userId:3,
    userName:"Nagireddy",
    password:"@$@&@*"
},
];

let getUsers=()=>users;

module.exports={getUsers};

*/

const con = require("./db_connect");

// Table Creation 
async function createTable() {
  let sql=`CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    firstname VARCHAR(225) NOT NULL,
    lastname VARCHAR(225) NOT NULL,
    password VARCHAR(255) NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY(user_id)
  ); `
  await con.query(sql);
}
createTable();

// grabbing all users in database
async function getAllUsers() {
  const sql = `SELECT * FROM users;`;
  let users = await con.query(sql);
  console.log(users)
}

// Create  User - Registering
async function register(user) {
  console.log("Inside register model")
  let cUser = await getUser(user);
  if(cUser.length > 0) throw Error("Username already in use");

  const sql = `INSERT INTO users (username,firstname,lastname, user_password)
    VALUES ("${user.username}","${user.firstname}","${user.lastname}", "${user.password}");
  `
  await con.query(sql);
  return await login(user);
}

// Read User -- login user
async function login(user) { // {userName: "sda", password: "gsdhjsga"}
  let cUser = await getUser(user); //[{userName: "cathy123", password: "icecream"}]
  console.log(cUser,"Inside login model")
  if(!cUser[0]) throw Error("Username not found");
  if(cUser[0].user_password !== user.password) throw Error("Password incorrect");

  return cUser[0];
}

// Update User function
async function editUser(user) {
  let sql = `UPDATE users 
    SET userName = "${user.username}"
    WHERE userID = ${user.userID}
  `;

  await con.query(sql);
  let updatedUser = await getUser(user);
  return updatedUser[0];
}

// Delete User function
async function deleteUser(user) {
  let sql = `DELETE FROM users
    WHERE userID = ${user.user_id}
  `
  await con.query(sql);
}

// Useful Functions
async function getUser(user) {
  let sql;

  if(user.user_id) {
    sql = `
      SELECT * FROM users
       WHERE userID = ${user.user_id}
    `
  } else {
    sql = `
    SELECT * FROM users 
      WHERE username = "${user.username}"
  `;
  }
  return await con.query(sql);  
}

/*
let cathy = {
  userID: 5,
  userName: "cathy123",
  password: "icecream"
}; 
login(cathy);
*/

module.exports = { getAllUsers, login, register, editUser, deleteUser};