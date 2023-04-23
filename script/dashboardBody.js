import { displayJobs, sideAndPopUpBars } from "./fuctions.js";

// Add jobs
const addJobForm = document.querySelector(".job-inputs-sect form");
const position = document.querySelector(".position-con input");
const company = document.querySelector(".company-con input");
const jobLocation = document.querySelector(".location-con input");
const status = document.querySelector(".add-job-status-con select");
const jobType = document.querySelector(".jobtype-con select");
const resetBtn = document.querySelector(".clear-btn");

// Side Bar selection
const activityBar = document.querySelectorAll("aside ul li");
const activityBarContent = document.querySelectorAll(".con");

// When screen size is more than 1000px: Toggle side bar, add bg, padding and display:none when side bar items are clicked
sideAndPopUpBars(activityBar, activityBarContent);

// Activity Bar toggle at min-width and max-width: 1000px
const toggleIcon = document.querySelector(".toggle-bar-con");
const sideBar = document.querySelector(".sidebar-other-sections aside");

// Toggle the side bar when toggle icon is clicked
const closePopUp = document.querySelector(".close-icon");
const popUpNav = document.querySelector(".append-popup");

toggleIcon.onclick = () => {
  let pageScreen = window.innerWidth;
  sideBar.classList.toggle("add-toggle-bar-con"); //Toggle side bar when screen is more than 1000px
  if (pageScreen < 1000) {
    popUpNav.classList.add("add-opacity");
    console.log("clicked");
  }
};
// Close popup NavBar
closePopUp.onclick = () => {
  popUpNav.classList.remove("add-opacity");
};

// Remove popup when screensize is more than 1000px
window.onresize = () => {
  if (window.innerWidth > 1000) {
    popUpNav.classList.remove("add-opacity");
    // popUpNav.style.display = "none";
  }
};

// Popup Nav bg and padding settings
const popUpBar = document.querySelectorAll("section ul li");
// When screen size is less than 1000px: Toggle side bar, add bg, padding and display:none when side bar items are clicked
sideAndPopUpBars(popUpBar, activityBarContent, popUpNav);

/*========*/
// Profile Section
const firstName = document.querySelector(".first-name-section input");
const profileEmail = document.querySelector(".email-section input");
const lastName = document.querySelector(".last-name-section input");
const location = document.querySelector(".location-section input");

// Update profile
const profileForm = document.querySelector(".profile-con form");

// collect back from loclStorage
let inputArr = JSON.parse(localStorage.getItem("setInputJob")) || [];

// Display when the page loads
window.onload = () => {
  const getCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
  // Checkout Redirection when localStorage is deleted
  if (getCurrentUser !== null) {
    firstName.value = getCurrentUser.name;
    profileEmail.value = getCurrentUser.email;
  } else {
    console.log("I am index");
    location.href = "index.html";
  }
  // To update the profile when the page reloads
  const getUpdateProfileOnLoad = JSON.parse(
    localStorage.getItem("setUpdateProfile")
  );
  lastName.value = getUpdateProfileOnLoad.lastName;
  location.value = getUpdateProfileOnLoad.location;
  displayJobs(inputArr, appendHere, jobsFound);
  updateStatNumbers();
};

const updateProfileForm = async () => {
  const updateProfile = {
    lastName: lastName.value,
    location: location.value,
  };
  localStorage.setItem("setUpdateProfile", JSON.stringify(updateProfile));
  console.log(updateProfile);

  const getUpdateProfile = JSON.parse(localStorage.getItem("setUpdateProfile"));
  lastName.value = getUpdateProfile.lastName;
  location.value = getUpdateProfile.location;
};

// Update the profile when adjustment is made from the profile section
profileForm.onsubmit = (e) => {
  e.preventDefault();
  updateProfileForm();
  console.log("Clicked Already");
};

/*========*/
// Add Job
const addJob = async () => {
  const inputJob = {
    position: position.value,
    company: company.value,
    jobLocation: jobLocation.value,
    date: new Date().toLocaleString(),
    status: status.value,
    jobType: jobType.value,
  };
  if (position.value === "") {
    console.log("Field cannot be empty"); //Write error code here
    return;
  }
  if (company.value === "") {
    console.log("Company cannot be empty"); // Write error code here
    return;
  }

  console.log(inputJob);
  inputArr.push(inputJob);
  localStorage.setItem("setInputJob", JSON.stringify(inputArr));
  console.log(inputArr);
};

// Function to add new job
addJobForm.onsubmit = (e) => {
  e.preventDefault();
  addJob();
  displayJobs(inputArr, appendHere, jobsFound);
  updateStatNumbers();
  resetBtn.click(); //Trigger reset btn when submit btn is triggered
};

/*========*/
// All Jobs Display
const appendHere = document.querySelector(".apply-grid");
const jobsFound = document.querySelector(".display-all-jobs-con h2 span");
const deleteJob = document.querySelector(".delete-btn");
console.log(deleteJob);
console.log(appendHere);

/*========*/
// Stat/Job Status
const pendingCon = document.querySelector(".pending-icon-con");
const interviewCon = document.querySelector(".interview-icon-con");
const jobDeclinedCon = document.querySelector(".jobs-declined-icon-con");
const pendingApp = document.querySelector(".pending-icon-con p");
const interviewSch = document.querySelector(".interview-icon-con p");
const jobDeclined = document.querySelector(".jobs-declined-icon-con p");

// Using dataset to dynamically update the numbers of pending, interviewed and declined jobs
function updateStatNumbers() {
  const newPending = inputArr.filter((each) => {
    return each.status === pendingCon.dataset.pending;
  });
  const newInterview = inputArr.filter((each) => {
    return each.status === interviewCon.dataset.interview;
  });
  const newDecline = inputArr.filter((each) => {
    return each.status === jobDeclinedCon.dataset.decline;
  });

  pendingApp.textContent = newPending.length;
  interviewSch.textContent = newInterview.length;
  jobDeclined.textContent = newDecline.length;
}
