const form = document.test;
const getAllBtn = document.getElementById("getAll");
const section = document.getElementById("sql");
const dropDown = document.getElementById("dropDown");

baseURL = "http://localhost:4565";

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
getAllCountries()
getAll()
// form.addEventListener("click", getAll);
