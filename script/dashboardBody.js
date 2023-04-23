const activityBar = document.querySelectorAll("aside ul li");
const activityBarContent = document.querySelectorAll(".con");

// When screen size is more than 1000px: Toggle side bar, add bg, padding and display:none when side bar items are clicked
sideAndPopUpBars(activityBar, activityBarContent);

// Activity Bar toggle at min-width and max-width: 1000px
const toggleIcon = document.querySelector(".toggle-bar-con");
console.log(toggleIcon);
const sideBar = document.querySelector(".sidebar-other-sections aside");

// Toggle the side bar when toggle icon is clicked
const closePopUp = document.querySelector(".close-icon");
const popUpNav = document.querySelector(".append-popup");

toggleIcon.onclick = () => {
  let pageScreen = window.innerWidth;
  sideBar.classList.toggle("add-toggle-bar-con"); //Toggle side bar when screen is more than 1000px
  if (pageScreen < 1000) {
    // popUpNav.style.display = "block";
    popUpNav.classList.add("add-opacity");
    console.log("clicked");
  }
};
// Close popup NavBar
closePopUp.onclick = () => {
  popUpNav.classList.remove("add-opacity");
  // popUpNav.style.display = "none";
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
export const firstName = document.querySelector(".first-name-section input");
export const profileEmail = document.querySelector(".email-section input");
const lastName = document.querySelector(".last-name-section input");
const location = document.querySelector(".location-section input");

// Update profile
const profileForm = document.querySelector(".profile-con form");
console.log(profileForm);

// collect back from loclStorage
let inputArr = JSON.parse(localStorage.getItem("setInputJob")) || [];

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

  displayJobs(inputArr);
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

// Function to update the profile when adjustment is made from the profile section
profileForm.onsubmit = (e) => {
  e.preventDefault();
  updateProfileForm();
  console.log("Clicked Already");
};

/*========*/
// Add Job
const addJobForm = document.querySelector(".job-inputs-sect form");
const position = document.querySelector(".position-con input");
const company = document.querySelector(".company-con input");
const jobLocation = document.querySelector(".location-con input");
const status = document.querySelector(".add-job-status-con select");
const jobType = document.querySelector(".jobtype-con select");
const resetBtn = document.querySelector(".clear-btn");

// const getInputJob = JSON.parse(localStorage.getItem("setInputJob"));

const addJob = async () => {
  const inputJob = {
    position: position.value,
    company: company.value,
    jobLocation: jobLocation.value,
    date: new Date().toLocaleString(),
    status: status.value,
    jobType: jobType.value,
  };
  console.log(inputJob);
  inputArr.push(inputJob);
  localStorage.setItem("setInputJob", JSON.stringify(inputArr));
  console.log(inputArr);
};

// Function to add new job
addJobForm.onsubmit = (e) => {
  e.preventDefault();
  addJob();
  displayJobs(inputArr);
  resetBtn.click(); //Trigger reset btn when submit btn is triggered
};

/*========*/
// Stat/Job Status
const pendingApp = document.querySelector(".pending-icon-con p");
const interviewSch = document.querySelector(".interview-icon-con p");
const jobDeclined = document.querySelector(".jobs-declined-icon-con p");

/*========*/
// All Jobs Display
const appendHere = document.querySelector(".apply-grid");
const jobsFound = document.querySelector(".display-all-jobs-con h2 span");

/*========*/
// All functions
function displayJobs(jobs) {
  // const dateTime = new Date().toLocaleString();

  appendHere.innerHTML = "";
  jobs.forEach((each) => {
    const { position, company, jobLocation, status, jobType, date } = each;
    let displayAddedJobs = `<div class="display-jobs-con">
                  <h3>${position}</h3>
                  <p>${company}</p>
                  <section class="more-info-sect">
                    <p>
                      <i class="fa-solid fa-paper-plane"></i><span>${jobLocation}</span>
                    </p>
                    <p>
                      <i class="fa-sharp fa-solid fa-calendar-days"></i></i></i><span>${date}</span>
                    </p>
                    <p>
                      <i class="fa-sharp fa-solid fa-box"></i><span>${jobType}</span>
                    </p>
                  </section>
                  <button class="job-status-btn">${status}</button>
                  <br><button class="edit-btn">Edit</button><button class="delete-btn">Delete</button>
                </div>`;
    appendHere.innerHTML += displayAddedJobs;
    console.log(appendHere);
  });
  jobsFound.textContent = inputArr.length;
}

// Function for side bar at more than 1000px and popUp bar at less than 1000px
function sideAndPopUpBars(bars, barContent, togglePopup) {
  bars.forEach((each, i) => {
    each.onclick = (e) => {
      barContent.forEach((each) => {
        each.style.display = "none";
      });
      bars.forEach((each) => {
        each.style.backgroundColor = "unset";
      });
      barContent[i].style.display = "block";
      bars[i].style.backgroundColor = "#756C3A";
      bars[i].style.paddingBlock = "5px";
      if (window.innerWidth < 1000) {
        // togglePopup.style.display = "none";
        // togglePopup.style.opacity = "1";
        togglePopup.classList.remove("add-opacity");
        // togglePopup.classList.remove("visible");
      }
    };
  });
}
