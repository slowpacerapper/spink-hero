const imageContainer = document.querySelector("[data-container]");
const body = document.querySelector("body");
const wrapper = document.querySelector("[data-wrap]");
const cancelBtn = document.querySelector("[data-cancel]");
const switchBtnOne = document.querySelector("[data-switchOne]");
const switchBtnTwo = document.querySelector("[data-switchTwo]");
const nonClient = document.querySelector("[data-nonclient]");
const client = document.querySelector("[data-client]");
const trackers = document.querySelectorAll("[data-item]");
const loginBtn = document.querySelector("[data-name='login']");
const form = document.querySelector(".login__section form");

let indexOfTracker;
let intervals = 7000;

if (switchBtnOne)
  switchBtnOne.onclick = (e) => {
    e.preventDefault();
    switchBtnTwo.classList.remove("current-btn");
    nonClient.classList.add("hide");
    client.classList.remove("hide");
    e.target.classList.add("current-btn");
  };

if (switchBtnTwo)
  switchBtnTwo.onclick = (e) => {
    e.preventDefault();
    switchBtnOne.classList.remove("current-btn");
    nonClient.classList.remove("hide");
    client.classList.add("hide");
    e.target.classList.add("current-btn");
  };

if (loginBtn)
  loginBtn.onclick = () => {
    wrapper.classList.add("rotate");
    body.classList.add("sizing");
    setTimeout(() => {
      form.classList.add("show");
    }, 500);
  };

if (cancelBtn)
  cancelBtn.onclick = () => {
    wrapper.classList.remove("rotate");
    form.classList.remove("show");
    body.classList.remove("sizing");
  };

// function to add, remove active class on tracker and scroll appropriate banner into view
const trackerAndBannerHandler = (e) => {
  for (let i = 0; i < trackers.length; i++) {
    trackers[i]?.classList?.remove("active");
  }
  imageContainer.children[e.target.dataset.item].scrollIntoView({
    behavior: "smooth",
  });
  e.target.classList.add("active");
  indexOfTracker = e.target.dataset.item;
};

// This function removes the active class from the previous tracker and adds it to the current tracker
trackers?.forEach((tracker) => {
  tracker.addEventListener("click", trackerAndBannerHandler);
});

const options = {
  threshold: 0.9,
  root: imageContainer,
};

// Variable for the intervals
let scrollDownInterval;
let scrollUpInterval;

// Callback function for scrolling down the images.
const callback = (entries) => {
  if (entries[0].isIntersecting) {
    indexOfTracker = 0;
    clearInterval(scrollUpInterval);
    scrollDownInterval = setInterval(() => {
      imageContainer.scrollBy({
        top: 200,
        left: 0,
        behavior: "smooth",
      });
      for (let i = indexOfTracker; i < trackers.length; i++) {
        trackers[i]?.classList?.remove("active");
      }
      indexOfTracker++;
      trackers && trackers[indexOfTracker]?.classList?.add("active");
    }, intervals);
  }
};

// This code is to observe the image that fires the above callback
const observer = new IntersectionObserver(callback, options);
observer.observe(imageContainer.children[0]);

// Function to scroll the images up
const callbackToScrollImagesUp = (entries) => {
  if (entries[0].isIntersecting) {
    clearInterval(scrollDownInterval);
    scrollUpInterval = setInterval(() => {
      imageContainer.scrollBy({
        top: -200,
        left: 0,
        behavior: "smooth",
      });
      for (let i = trackers.length - 1; i >= indexOfTracker; i--) {
        trackers[i]?.classList.remove("active");
      }
      indexOfTracker--;
      trackers && trackers[indexOfTracker]?.classList.add("active");
      //   console.log(indexOfTracker);
    }, intervals);
  }
};

const scrollUpObserver = new IntersectionObserver(
  callbackToScrollImagesUp,
  options
);

const indexOfLastImageContainerChild = imageContainer.children.length - 1;
scrollUpObserver.observe(
  imageContainer.children[indexOfLastImageContainerChild]
);
