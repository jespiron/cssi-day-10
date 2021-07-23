const inputName = document.querySelector("#inputName");
const inputImg = document.querySelector("#inputImg");
const inputDescription = document.querySelector("#inputDescription");
const inputProtein = document.querySelector("#inputProtein");
const inputCarbs = document.querySelector("#inputCarbs");
const inputFat = document.querySelector("#inputFat");
const addButton = document.querySelector("#addButton");

const dropdown = document.querySelector("#dropdown");
const display = document.querySelector("#foodDisplay");
const addButton2 = document.querySelector("#addButton2");

const mealDisplay = document.querySelector("#mealDisplay");
let meals = [];
let totalProtein = 0;
let totalCarbs = 0;
let totalFat = 0;

function updateDisplay() {
  const selectedId = dropdown[dropdown.selectedIndex].value;
  const selectedName = dropdown[dropdown.selectedIndex].innerHTML;
  
  // get from firebase database
  let img = "https://bulma.io/images/placeholders/1280x960.png";
  let description = "This food aint healthy dont eat it";

  const messagesRef = firebase.database().ref();
        messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        for(key in data) {
            if(data[key]["id"] == selectedId) {
                img = data[key]["img"];
                description = data[key]["description"];
                break;
            }
        }
    });
  
  display.innerHTML = `<div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src=${img} alt="Placeholder image">
        </figure>
      </div>
  
      <div class="media-content">
        <p class="title is-4">${selectedName}</p>
      </div>

      <div class="content">
        <p>${description}</p>
        <a href="#">learn more</a> 
      <br>
      </div>
  </div>`;
}

function getMeal(id) {
    let name = "placeholder";
    let img = "https://bulma.io/images/placeholders/1280x960.png";
    let description = "This food aint healthy dont eat it";

  const messagesRef = firebase.database().ref();
        messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        for(key in data) {
            if(data[key]["id"] == id) {
                name = data[key]["name"];
                img = data[key]["img"];
                description = data[key]["description"];
                break;
            }
        }
    });
    return {
        name: name,
        img: img,
        description: description
    };
}

function addToList() {
    const id = inputName.value.toLowerCase();
    const name = inputName.value;
    const img = inputImg.value;
    const description = inputDescription.value;
  firebase.database().ref().push({
        id: id,
        name: name,
        img: img,
        description: description
    });
}

function updateMealDisplay() {
    meals.push(dropdown[dropdown.selectedIndex].value);
    mealDisplay.innerHTML = "";

    console.log(meals);

    for(id of meals) {
        stuff = getMeal(id);
        mealDisplay.innerHTML += `<div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src=${stuff.img} alt="Placeholder image">
        </figure>
      </div>
  
      <div class="media-content">
        <p class="title is-4">${stuff.name}</p>
      </div>

      <div class="content">
        <p>${stuff.description}</p>
        <a href="#">learn more</a> 
      <br>
      </div>
  </div>`;     
    }
}

function initialize() {
    dropdown.innerHTML = "";

    const messagesRef = firebase.database().ref();
        messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        for(key in data) {
            dropdown.innerHTML += `<option value=${data[key].id}>${data[key].name}</option>`;
        }
    });
}

initialize();
dropdown.addEventListener("change", updateDisplay);
addButton.addEventListener("click", addToList);
addButton2.addEventListener("click", updateMealDisplay);