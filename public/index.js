//form
const form = document['form-test']
//dropdown list
const dropDown = document.getElementById("dropDown");
//form input
const fName = document.getElementById("fName")
const lName = document.getElementById("lName")
const email = document.getElementById("email")
const submitBtn = document.getElementById("submitBtn");

baseURL = "http://localhost:8000";


//try to get the names in the database to the front end
function getAll() {
  axios.get(`${baseURL}/users`).then((res) => {
    res.data[0].map((user) => {
        // console.log(user.first_name)
        const users = document.createElement("option");
        users.textContent = user.first_name;
        dropDown.appendChild(users);
    })
  })
}

//get all the coutries from the database to the front
function getAllCountries() {
  axios.get(`${baseURL}/countries`).then((res) => {
    res.data[0].map((country) => {
        // console.log(country.name)
        const list = document.createElement("option");
        list.textContent = country.name;
        countries.appendChild(list);
    })
  })
}

function defaultForm() {
  const inputs = document.querySelector('.firstName',
  '.lastName',
  '.username',
  '.email',
  '.password');

  inputs.forEach(input => {
    input.value = '';
  });
}

function addToDatabase(e) {
  e.preventDefault();
  defaultForm()
  
  const fName = form.firstName.value
  const lName = form.lastName.value
  const username = form.username.value
  const email = form.email.value
  const password = form.password.value

  
  
  const body = {
  
  first_name: fName,
  last_name: lName,
  username: username,
  email: email,
  password: password
}
  console.log(body)
  axios.post(`${baseURL}/users`, body)
    .then(res => console.log(res.data))
    .catch((err) => alert('username is already in use'))
}

//this will populate the dropdowns
getAllCountries()
getAll()


//event listeners
//make sure to use 'submit' as the listener for form buttons instead of 'click'
form.addEventListener("submit", addToDatabase);
