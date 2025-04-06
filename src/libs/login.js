const usersData=[
{ _username: "wer123", _password: "gg666" },
{ _username: "ola098", _password: "fff3323r" },
{ _username: "1111", _password: "2234rrr" },
];
// updating the date every 4 hours.
window.onload = () => {
insertHeaderContent(); // initializing text inside p element inside header based on screen width.
updateDate();
};
function formValidation(event) {
const username = document.querySelector("#username").value;
// console.log(username);
const password = document.querySelector("#password").value;
const errorMessage = document.querySelector("#error-message");
//variable with bool value based on if the input only has numbers or digits
if (username === "" || password === "") {
  errorMessage.innerHTML = "Username or password are empty";
  styleErrorMessage(errorMessage);
  event.preventDefault();
} else {
  const currentUser = usersData.find(
    (user) => user._username === username && user._password === password
  );

  if (typeof currentUser === "undefined") {
    errorMessage.innerHTML = "Username or password incorrect";
    styleErrorMessage(errorMessage);
    event.preventDefault();
  } else {
    errorMessage.innerHTML = "";
    alert(`Welcome ${username}`);
  }
}
}

function welcomeGuest() {
alert("Welcome Guest");
}

function updateDate() {
const dateElement = document.querySelector("#date");
const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString("en-GB"); // date type: dd/mm/yyyy
dateElement.innerHTML = formattedDate;
}

//Change text inside paragrapg element inside header.
function insertHeaderContent() {
const paragraph = document.querySelector("#header-text"); // p element inside header.
const originalText = "pokemon";
const newText = "Pokedex";

if (window.innerWidth <= 1200) {
  paragraph.innerHTML = newText; //text inside p element(in header): Pokedex
} else {
  paragraph.innerHTML = originalText; // text inside p element(in header): pokemon
}
}

function styleErrorMessage(errorMessage) {
errorMessage.style.color = "red";
errorMessage.style.fontSize = "25px";
}
window.addEventListener("resize", insertHeaderContent); // whenever the screen size change, the function insertHeaderContent() is called.

document.addEventListener("DOMContentLoaded", function () {
//This code exeuted after the DOM of the page is fully loaded so we can use event listener of input on an element.
document
  .getElementById("username")
  .addEventListener("input", function (event) {
    setTimeout(() => {
      const regex = /[^A-Za-z0-9]/g;
      event.target.value = event.target.value.replace(regex, "");
    }, 0);
  });

document
  .getElementById("password")
  .addEventListener("input", function (event) {
    setTimeout(() => {
      const regex = /[^A-Za-z0-9]/g;
      event.target.value = event.target.value.replace(regex, "");
    }, 0);
  });
});