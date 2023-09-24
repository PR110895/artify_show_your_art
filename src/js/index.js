import { createApi } from "unsplash-js";

const homeContainar = document.querySelector("#homeContainar");
const favContainar = document.querySelector("#favouriteContainar");
const mainContainar = document.querySelector("#main");
const pageIgnationContainar = document.querySelector("#pageIgnation");
const preButton = document.querySelector("#prev");
const nextButton = document.querySelector("#next");
const currentPage = document.querySelector("#current-page-no");
const buttons = document.querySelectorAll(".my-button");
const favButtons = document.querySelector("#favButton");
const input = document.querySelector("input");
const unsplash = createApi({
  accessKey: "4XdpT0pUfK1pFsaMFJeiPphqKglxbf4UcNCMw1GbUhM",
});

function showSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
}

function hideSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerText = message;
  document.body.appendChild(toast);
  toast.style.display = "block";
  // Hide the toast after 3 seconds
  setTimeout(() => {
    toast.style.display = "none";
    document.body.removeChild(toast);
  }, 3000);
}
let countermaximumValue;
// initalize counter value
let counterValue = 1;
let photosArray = [];

// function for getPhotos from unsplash
function getPhotos(page) {
  showSpinner();
  // set counter
  counterValue = page;
  updateCounterDisplay();
  // get query from localStorage
  let query = localStorage.getItem("query");
  if (!query) {
    query = "Modern Art";
    localStorage.setItem("query", "Modern Art");
  }
  // get call unsplash
  unsplash.search
    .getPhotos({
      query: query,
      page: page,
      perPage: 12,
      orientation: "portrait",
    })
    .then((result) => {
      if (result.type === "success") {
        countermaximumValue = result.response.total_pages;
        const photos = result.response.results;
        photosArray = photos;
        const getUrls = photos.map((photo, i) => {
          const description =
            photo.description !== null ? photo.description : "Description";
          return `<div id=${photo.id} class='image-containar' key=${i}>
        <img src=${photo.urls.small} alt=${photo.urls.small} class="image"/>
        <div class='image-details'>
        <p class="heading">${
          description.toUpperCase().substring(0, 25) + "..."
        }</p>
        <p class='description'>${
          photo.alt_description.substring(0, 50) + "..."
        }</p>
        <div class='user'><p class='time'>Publish At:- ${new Date(
          photo.created_at
        ).toLocaleString("en-US")}</p>
        <p class='time'>Author:- ${photo.user.name}</p>
        </div>
        </div>
        </div>`;
        });
        {
          photos.length
            ? (mainContainar.innerHTML = getUrls.join(""))
            : (mainContainar.innerHTML = `<div id='noData'><h1> OOPS! No Data found...</h1></div>`);
        }
        {
          !photos.length
            ? (pageIgnationContainar.style.display = "none")
            : (pageIgnationContainar.style.display = "flex");
        }
        hideSpinner();
      } else {
        // error Handling
        mainContainar.innerHTML = `<div id='noData'><h1> OOPS! No Data found...</h1></div>`;
      }
      const imageContainars = document.querySelectorAll(".image-containar");
      imageContainars.forEach((imageContainar) => {
        imageContainar.addEventListener("click", () =>
          handleAddFaviroteContainarClick(imageContainar.id)
        );
      });
    })
    .catch((e) => {
      // error Handling
      console.log(e);
      mainContainar.innerHTML = `<div id='noData'><h1> OOPS! ${e.message}</h1></div>`;
    });
}
// initally get photos when Page get Render
getPhotos(1);

// Add eventListner to button
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

// Function for button on click
function handleButtonClick(event) {
  // set query on localstorage
  localStorage.setItem("query", event.target.innerText);
  getPhotos(1);
}

// Add Event Listner on Input
input.addEventListener("keydown", (event) => {
  // if search bar have some value
  if (event.key === "Enter" && event.target.value) {
    localStorage.setItem("query", event.target.value);
    getPhotos(1);
    event.target.value = "";
  }
  // if search bar have no value
  if (event.key === "Enter" && event.target.value !== "") {
    // set query on localstorage
    localStorage.setItem("query", "Travel");
    getPhotos(1);
    event.target.value = "";
  }
});
// function for update counter value
function updateCounterDisplay() {
  currentPage.innerText = `Current Page: ${counterValue}`;
}

function onPrevClick() {
  if (counterValue > 1) {
    nextButton.style.border = "1px solid";
    counterValue--;
    getPhotos(counterValue);
    updateCounterDisplay();
  } else {
    preButton.style.border = "3px solid red";
  }
}

function onNextClick() {
  if (counterValue <= countermaximumValue) {
    preButton.style.border = "1px solid";
    counterValue++;
    getPhotos(counterValue);
    updateCounterDisplay();
  } else {
    nextButton.style.border = "3px solid red";
  }
}

preButton.addEventListener("click", onPrevClick);
nextButton.addEventListener("click", onNextClick);

function isObjectInArray(array, targetObject) {
  for (const obj of array) {
    if (obj.id === targetObject.id) {
      return true;
    }
  }
  return false;
}
// handle to add favirote picture
function handleAddFaviroteContainarClick(data) {
  showSpinner();
  const arrays = localStorage.getItem("arrayOfPhotos");
  if (!arrays) {
    const faviroteObj = photosArray.find((photo) => photo.id === data);
    const faviroteArray = [];
    faviroteArray.push(faviroteObj);
    localStorage.setItem("arrayOfPhotos", JSON.stringify(faviroteArray));
    showToast("This photo has been added to favirote!.");
    hideSpinner();
  } else {
    const favArray = JSON.parse(arrays);
    const faviroteObj = photosArray.find((photo) => photo.id === data);
    const alreadyAddedCheck = isObjectInArray(favArray, faviroteObj);
    if (!alreadyAddedCheck) {
      favArray.push(faviroteObj);
      localStorage.setItem("arrayOfPhotos", JSON.stringify(favArray));
      showToast("This photo has been added to favirote!.");
      hideSpinner();
    } else {
      showToast("Alredy exist in favirote");
      hideSpinner();
    }
    hideSpinner();
  }
}

favButtons.addEventListener("click", () => {
  homeContainar.style.display = "none";
  favContainar.style.display = "block";
  getRenderFavirotePhotos();
});

function getRenderFavirotePhotos() {
  const faviroteContainar = document.querySelector("#favirote");
  const array = localStorage.getItem("arrayOfPhotos") || [];
  const favArrayList = JSON.parse(array);
  showSpinner();

  const getUrls = favArrayList?.map((photo, i) => {
    const description =
      photo.description !== null ? photo.description : "Description";
    return `<div id=${photo.id} class='image-containar' key=${i}>
  <img class='image' src=${photo.urls.small} alt=${photo.urls.small}/>
  <div class='image-details'>
  <p class="heading">${description.toUpperCase().substring(0, 25) + "..."}</p>
  <p class='description'>${photo.alt_description.substring(0, 50) + "..."}</p>
  <div class='user'><p class='time'>Publish At:- ${new Date(
    photo.created_at
  ).toLocaleString("en-US")}</p>
  <p class='time'>Author:- ${photo.user.name}</p>
  </div>
  </div>
  </div>`;
  });

  {
    favArrayList?.length
      ? (faviroteContainar.innerHTML = getUrls.join(""))
      : (faviroteContainar.innerHTML = `<div id='noData'><h1> OOPS! No Data found...</h1></div>`);
  }
  hideSpinner();
  const backButtons = document.querySelector("#back-button");
  backButtons.addEventListener("click", backButtonFunction);
  const imageContainars = document.querySelectorAll(".image-containar");
  imageContainars.forEach((imageContainar) => {
    imageContainar.addEventListener("click", () =>
      handleRemoveItemContainarClick(imageContainar.id)
    );
  });
}

// handle for remove from favirote
function handleRemoveItemContainarClick(data) {
  showSpinner();
  const arrays = localStorage.getItem("arrayOfPhotos");
  const favArray = JSON.parse(arrays);
  if (favArray) {
    const faviroteArray = favArray.filter((item) => item.id !== data);
    localStorage.setItem("arrayOfPhotos", JSON.stringify(faviroteArray));
    showToast("This photo has been removed from favirote!.");
    getRenderFavirotePhotos();
    hideSpinner();
  }
  hideSpinner();
}

// handle for back button
function backButtonFunction() {
  homeContainar.style.display = "block";
  favContainar.style.display = "none";
  getPhotos(1);
}
