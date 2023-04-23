// Display All added Jobs
export function displayJobs(jobs, append, jobsLength) {
  append.innerHTML = "";
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
    append.innerHTML += displayAddedJobs;
  });
  jobsLength.textContent = jobs.length;
}

/*========*/
// Function for side bar at more than 1000px and popUp bar at less than 1000px
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
      if (window.innerWidth < 1000) {
        togglePopup.classList.remove("add-opacity");
      }
    };
  });
}
