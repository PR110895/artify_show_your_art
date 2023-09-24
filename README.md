# Artify (A app for showcase your art-work)

This app is use to showcase your Art-work.

**Features**

1. Showcase image from diffrent category like

   `Classic Art` `Fine Art` `Abstract Art` `Sculptures` `River` `Mountain` `Camp` `Sea` `Sports` `Sports` `carSports` `Bike`

2. You can add photos from diffrent category to your favourite page just to click on image and when you click on photo it show a tost to inform you that photo added to you favourite page. it also have a check for that is image is already added to favourite page or not.

3. You can remove photos from your favourite page just click on photo and when you click on photo it show a tost to inform you that photo removed to you favourite page

4. When you hover on image then it will show some details of image like `title` ,`description`,`publishAt`,and `author`. On favorite also same.

5. It have a search input on which you can write category and press enter to search photos.

6. It have pageignation on button from where you can get data of diffrent page and when you try to press prev button when page no is 1 then it show a red dark border on button to notify you can't select page no is less than 1 and same check for next page also accordingly.

7. We also handle error case in this in which we show no data found message or some error occure then show error message.

8. We added loading spinner above the images main containar it show when process is in progress to get data from api.

9. We use unsplash for getting image from api.

10. For favourite we use localStorage to store our data.

11. If we select a category and refresh the page then category won't get change because we add that to local storage also.

### Instructions

1.  Clone the repo and run `npm install`
2.  From the app folder run `npm run dev`

---

> [Working Demo] (added soon)

\*\* Function for add photos to favourite

```js
function handleAddFaviroteContainarClick(data) {
  showSpinner();
  const arrays = localStorage.getItem("arrayOfPhotos");
  if (!arrays) {
    const faviroteObj = photosArray.find((photo) => photo.id === data);
    const faviroteArray = [];
    faviroteArray.push(faviroteObj);
    localStorage.setItem("arrayOfPhotos", JSON.stringify(faviroteArray));
    showToast();
    hideSpinner();
  } else {
    const favArray = JSON.parse(arrays);
    const faviroteObj = photosArray.find((photo) => photo.id === data);
    const alreadyAddedCheck = isObjectInArray(favArray, faviroteObj);
    if (!alreadyAddedCheck) {
      favArray.push(faviroteObj);
      localStorage.setItem("arrayOfPhotos", JSON.stringify(favArray));
      showToast();
    } else {
      showToast("Alredy exist in favirote");
    }
    hideSpinner();
  }
}
```

\*\* Function for remove photos to favourite

```js
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
}
```

\*\* Function for show and remove spinner

```js
function showSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
}

function hideSpinner() {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
}
```

\*\* Function for show tost on screen

```js
function showToast(message = "This photo has been added to favirote!.") {
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
```
