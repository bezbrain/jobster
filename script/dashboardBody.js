import {
  displayJobs,
  sideAndPopUpBars,
  editBtnClicked,
  notificationDashboard,
} from "./fuctions.js";

const getCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
// The notification success and failure controller
let failure = "failure";
let success = "success";

/*=======*/
// Logout
const profile = document.querySelector(".head-btn-con .top-profile span");
const clickToLogout = document.querySelector(".top-profile");
const logout = document.querySelector(".logout");
// const dashboard = document.querySelector(".dashboard-page");

const logoutStyles = window.getComputedStyle(logout);
clickToLogout.onclick = () => {
  logout.classList.toggle("add-logout-css");
};

logout.onclick = () => {
  console.log("Logout here");
  window.location.replace("../index.html");
};

document.body.onclick = () => {
  // console.log("Body clicked");
  if (logoutStyles.display === "block") {
    // logout.style.display = "none";
    // logout.classList.remove("add-logout-css");
  }
};

/*========*/
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
  if (pageScreen <= 1000) {
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
/*========*/
// Display when the page loads
window.onload = () => {
  const conditionForProfile = getCurrentUser ? getCurrentUser.name : "Sample";
  profile.textContent = conditionForProfile; //Set right top dashboard profile to the login/Register name

  if (getCurrentUser !== null) {
    firstName.value = getCurrentUser.name;
    profileEmail.value = getCurrentUser.email;
  } else {
    // Don't give access to dashboard when not registered
    console.log("I am index");
    window.location.replace("../index.html");
  }
  // To update the profile when the page reloads
  const getUpdateProfileOnLoad =
    JSON.parse(localStorage.getItem("setUpdateProfile")) || [];
  lastName.value = getUpdateProfileOnLoad.lastName || "";
  location.value = getUpdateProfileOnLoad.location || "";
  displayJobs(inputArr, appendHere, jobsFound);
  updateStatNumbers();
};

// Update LastName and Location
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
  notificationDashboard(success, "Profile updated");
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
    id: new Date().getTime().toString(),
    position: position.value,
    company: company.value,
    jobLocation: jobLocation.value,
    date: new Date().toLocaleString(),
    status: status.value,
    jobType: jobType.value,
  };
  if (!position.value || !company.value || !jobLocation.value) {
    // Add Job Failed
    notificationDashboard(failure, "Field cannot be empty");
    return;
  }
  // Add Job Successful
  notificationDashboard(success, "Job added successfully");
  resetBtn.click(); //Trigger reset btn when submit btn is triggered

  inputArr.push(inputJob);
  localStorage.setItem("setInputJob", JSON.stringify(inputArr));
};

// Function to add new job and update edited job
addJobForm.onsubmit = (e) => {
  e.preventDefault();
  if (document.querySelector(".submit-btn").textContent === "Submit") {
    addJob();
    displayJobs(inputArr, appendHere, jobsFound);
    updateStatNumbers();
  } else {
    // Modify the addJobForm submit event listener to call the editJob function when the edit button is clicked
    editJob();
    updateStatNumbers();
    if (!position.value || !company.value || !jobLocation.value) {
      // Update Job Failed
      notificationDashboard(failure, "Field cannot be empty");
      return;
    }
    resetBtn.click(); //Trigger reset btn when submit btn is triggered
    document.querySelector(".submit-btn").textContent = "Submit";
  }
};

/*========*/
// All Jobs Display
const appendHere = document.querySelector(".apply-grid");
const jobsFound = document.querySelector(".display-all-jobs-con h2 span");

/*========*/
// Delete Job
let currentEdit = "";
appendHere.onclick = (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const jobContainer = e.target.closest(".display-jobs-con");
    const jobId = jobContainer.dataset.jobid;

    inputArr = inputArr.filter((each) => {
      return each.id !== jobId;
    });
    updateStatNumbers();

    localStorage.setItem("setInputJob", JSON.stringify(inputArr));
    displayJobs(inputArr, appendHere, jobsFound);
    // Edit Job
  } else if (e.target.classList.contains("edit-btn")) {
    const jobContainer = e.target.closest(".display-jobs-con");
    const jobId = jobContainer.dataset.jobid;
    currentEdit = jobId;

    const findEdit = inputArr.find((each) => {
      return each.id === jobId; // To separate the concentrated container to edit
    });

    // Stage what is to be edited
    position.value = findEdit.position;
    company.value = findEdit.company;
    jobLocation.value = findEdit.jobLocation;
    status.value = findEdit.status;
    jobType.value = findEdit.jobType;

    // Dynamically change the side bar concentration when edit btn is clicked
    editBtnClicked(activityBar, activityBarContent); // At greater than 1000px
    if (window.innerWidth <= 1000) {
      editBtnClicked(popUpBar, activityBarContent);
    }
    document.querySelector(".submit-btn").textContent = "Update";
  }
};

// Modify the addJob function to update the inputArr with the edited job data when the update btn is clicked
const editJob = async () => {
  const updateEdit = inputArr.find((each) => each.id === currentEdit); // To separate the concentrated container to edit
  console.log(updateEdit);
  const getIndex = inputArr.indexOf(updateEdit); //To get the index of the job to edit
  console.log(getIndex);

  const editedJob = {
    id: currentEdit, //To make sure that the edited job maintains the same id
    position: position.value,
    company: company.value,
    jobLocation: jobLocation.value,
    date: new Date().toLocaleString(),
    status: status.value,
    jobType: jobType.value,
  };

  if (!position.value || !company.value) {
    // Update Job Failed
    notificationDashboard(failure, "Field cannot be empty");
    return;
  }
  // Update Job Successful
  notificationDashboard(success, "Job updated successfully");

  inputArr.splice(getIndex, 1, editedJob); //To remove the object to be edited and return all objects including the one edited

  localStorage.setItem("setInputJob", JSON.stringify(inputArr));
  displayJobs(inputArr, appendHere, jobsFound);
};

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

/*========*/
// Search Section
const searchInput = document.querySelector(".search-con input");

searchInput.onkeyup = () => {
  const newInputArr = inputArr.filter((each) => {
    return (
      each.position.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      each.company.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  });
  displayJobs(newInputArr, appendHere, jobsFound);
};
