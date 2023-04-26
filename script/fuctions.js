// Display All added Jobs
export function displayJobs(jobs, append, jobsLength) {
  append.innerHTML = "";
  jobs.forEach((each, i) => {
    const { position, company, jobLocation, status, jobType, date } = each;
    let displayAddedJobs = `<div class="display-jobs-con" data-jobId="${each.id}">
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
    append.innerHTML += displayAddedJobs;

    // Add an event listener to the edit button
    // const editBtn = append.querySelector(`[data-jobId=${each.id}] .edit-btn`);
  });
  jobsLength.textContent = jobs.length;
}

/*========*/
// Function to display the body when corresponding activity bar is clicked
export function sideAndPopUpBars(bars, barContent, togglePopup) {
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
      if (window.innerWidth <= 1000) {
        togglePopup.classList.remove("add-opacity");
      }
    };
  });
}

/*========*/
// Function to make the activitycontent correspond with the acitivitybar at max and min widths of 1000 when edit btn is clicked
export function editBtnClicked(bars, barContent) {
  barContent.forEach((each, i) => {
    each.style.display = "none";
  });
  bars.forEach((each) => {
    each.style.backgroundColor = "unset";
  });
  barContent[2].style.display = "block";
  bars[2].style.backgroundColor = "#756C3A";
  bars[2].style.paddingBlock = "5px";
}

/*========*/
// Notification Popup
const displayNotification = document.querySelector(
  ".where-to-apply-noti-display"
);
const displayNotificationDashboard = document.querySelector(
  ".where-to-apply-noti-display-dashboard"
);
const notificationText = document.querySelector(".icon-and-text p");
const drain = document.querySelector(".success-drain");
const successIcon = document.querySelector(".success-icon");
const failureIcon = document.querySelector(".failure-icon");

// Function to control Notification for Landing Page
export function notification(succ, msg) {
  displayNotification.style.display = "block";
  notificationText.textContent = msg;
  if (succ === "success") {
    drain.classList.remove("failure-drain");
    successIcon.style.display = "block";
    failureIcon.style.display = "none";
  } else {
    drain.classList.add("failure-drain");
    successIcon.style.display = "none";
    failureIcon.style.display = "block";
  }
  setTimeout(() => {
    displayNotification.style.display = "none";
  }, 3000);
}

// Function to control Notification for Dashboard Page
export function notificationDashboard(succ, msg) {
  displayNotificationDashboard.style.display = "block";
  notificationText.textContent = msg;
  if (succ === "success") {
    drain.classList.remove("failure-drain");
    successIcon.style.display = "block";
    failureIcon.style.display = "none";
  } else {
    drain.classList.add("failure-drain");
    successIcon.style.display = "none";
    failureIcon.style.display = "block";
  }
  setTimeout(() => {
    displayNotificationDashboard.style.display = "none";
  }, 3000);
}
