const activityBar = document.querySelectorAll("aside ul li");
const activityBarContent = document.querySelectorAll(".con");

activityBar.forEach((each, i) => {
  each.onclick = (e) => {
    activityBarContent.forEach((each) => {
      each.style.display = "none";
    });
    activityBar.forEach((each) => {
      each.style.backgroundColor = "unset";
    });
    activityBarContent[i].style.display = "block";
    activityBar[i].style.backgroundColor = "#756C3A";
    activityBar[i].style.paddingBlock = "5px";
  };
});

// Activity Bar toggle at min-width: 1000px
let pageScreen = window.innerWidth;

const toggleIcon = document.querySelector(".toggle-bar-con");
console.log(toggleIcon);
const sideBar = document.querySelector(".sidebar-other-sections aside");
const sideBarTabPhone = document.querySelector(
  ".sidebar-other-sections aside ul"
);

// const sideBarStyle = window.getComputedStyle(sideBar);
// console.log(sideBarStyle.display);
// toggleIcon.onclick = () => {
//   if (sideBarStyle.display === "blcok") {
//     sideBarStyle.display = "none";
//   }
// };

// Toggle the side bar when toggle icon is clicked
toggleIcon.onclick = () => {
  if (pageScreen > 1000) {
    sideBar.classList.toggle("add-toggle-bar-con");
    console.log("Clicked");
  } else {
    // sideBarTabPhone.style.display = "block";
    // sideBar.style.display = "block";
    // activityBar.forEach((each, i) => {
    //   each.onclick = () => {
    //     sideBar.style.display = "none";
    //   };
    // });
  }
};

/*========*/
// Profile Section
/*========*/
export const firstName = document.querySelector(".first-name-section input");
export const profileEmail = document.querySelector(".email-section input");
const lastName = document.querySelector(".last-name-section input");
const location = document.querySelector(".location-section input");
// console.log(firstName, profileEmail, lastName, location);

// Update profile
const profileForm = document.querySelector(".profile-con form");
console.log(profileForm);

const updateProfileForm = async () => {
  const updateProfile = {
    name: firstName.value,
    email: profileEmail.value,
    lastName: lastName.value,
    location: location.value,
  };
  console.log(updateProfile);
};

// Function to update the profile when adjustment is made from the profile section
profileForm.onsubmit = (e) => {
  e.preventDefault();
  updateProfileForm();
};

/*========*/
// Add Job
/*========*/
const addJobForm = document.querySelector(".job-inputs-sect form");
const position = document.querySelector(".position-con input");
const company = document.querySelector(".company-con input");
const jobLocation = document.querySelector(".location-con input");
const status = document.querySelector(".add-job-status-con select");
const jobType = document.querySelector(".jobtype-con select");
const resetBtn = document.querySelector(".clear-btn");
// console.log(addJobForm, position, company, jobLocation, status, jobType);

let inputArr = [];
const addJob = async () => {
  const inputJob = {
    position: position.value,
    company: company.value,
    jobLocation: jobLocation.value,
    status: status.value,
    jobType: jobType.value,
  };
  console.log(inputJob);
  inputArr.push(inputJob);
  console.log(inputArr);
};

// Function to add new job
addJobForm.onsubmit = (e) => {
  e.preventDefault();
  addJob();
  displayJobs();
  resetBtn.click(); //Trigger reset btn when submit btn is triggered
};

/*========*/
// Stat/Job Status
/*========*/
const pendingApp = document.querySelector(".pending-icon-con p");
const interviewSch = document.querySelector(".interview-icon-con p");
const jobDeclined = document.querySelector(".jobs-declined-icon-con p");

/*========*/
// All Jobs Display
/*========*/
const appendHere = document.querySelector(".apply-grid");
const jobsFound = document.querySelector(".display-all-jobs-con h2 span");

function displayJobs() {
  appendHere.innerHTML = "";
  inputArr.forEach((each) => {
    const { position, company, jobLocation, status, jobType } = each;
    let displayAddedJobs = `<div class="display-jobs-con">
                  <h3>${position}</h3>
                  <p>${company}</p>
                  <section class="more-info-sect">
                    <p>
                      <i class="fa-solid fa-paper-plane"></i><span>${jobLocation}</span>
                    </p>
                    <p>
                      <i class="fa-sharp fa-solid fa-calendar-days"></i></i></i><span>Date</span>
                    </p>
                    <p>
                      <i class="fa-sharp fa-solid fa-box"></i><span>${jobType}</span>
                    </p>
                  </section>
                  <button class="job-status-btn">${status}</button>
                  <br><button class="edit-btn">Edit</button><button class="delete-btn">Delete</button>
                </div>`;
    // console.log(displayAddedJobs);
    appendHere.innerHTML += displayAddedJobs;
    console.log(appendHere);
  });
  jobsFound.textContent = inputArr.length;
}

/*========*/
// Toggle nav bar onclick of Toggle icon
