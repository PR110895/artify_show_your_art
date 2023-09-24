const mainContainar = document.querySelector("#favirote");

function showToast() {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerText = "This photo has been removed from favirote!.";
  document.body.appendChild(toast);
  toast.style.display = "block";
  // Hide the toast after 3 seconds
  setTimeout(() => {
    toast.style.display = "none";
    document.body.removeChild(toast);
  }, 3000);
}

function showSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
}

function hideSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
}

function getRenderFavirotePhotos() {
  const array = localStorage.getItem("arrayOfPhotos");
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
    favArrayList.length
      ? (mainContainar.innerHTML = getUrls.join(""))
      : (mainContainar.innerHTML = `<div id='noData'><h1> OOPS! No Data found...</h1></div>`);
  }
  hideSpinner();
  const imageContainars = document.querySelectorAll(".image-containar");
  imageContainars.forEach((imageContainar) => {
    imageContainar.addEventListener("click", () =>
    handleRemoveItemContainarClick(imageContainar.id)
    );
  });
}
// initial get render when page get load
getRenderFavirotePhotos();

// handle for remove from favirote
function handleRemoveItemContainarClick(data) {
  showSpinner();
  const arrays = localStorage.getItem("arrayOfPhotos");
  const favArray = JSON.parse(arrays);
  if (favArray) {
    const faviroteArray = favArray.filter((item) => item.id !== data);
    localStorage.setItem("arrayOfPhotos", JSON.stringify(faviroteArray));
    showToast();
    getRenderFavirotePhotos();
    hideSpinner();
  }
  hideSpinner()
}
