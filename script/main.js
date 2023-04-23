// import {
//   firstName,
//   profileEmail,
//   // toggleIcon,
//   // profileForm,
//   // addJobForm,
//   // addJob,
//   // updateProfileForm,
//   // displayJobs,
//   // sideBar,
//   // resetBtn,
//   // sideBarTabPhone,
// } from "./dashboardBody.js";

const loginRegBtn = document.querySelector(".login-reg-btn");
const displayRegPage = document.querySelector(".where-to-apply-login-display");
const undisplayLandingPage = document.querySelector(".landing-page");

const regName = document.querySelector(".reg-name-con input");
const regEmail = document.querySelector("form .reg-email-con input");
const regPassword = document.querySelector(" form .reg-password-con input");
const registerForm = document.querySelector(".login-reg-con form");

const landingPageLogin = document.querySelector(".landing-page-login");
const dashboard = document.querySelector(".dashboard-page");

loginRegBtn.onclick = () => {
  undisplayLandingPage.style.display = "none";
  displayRegPage.style.display = "block";
  console.log("Clicked");
};

// Register form effect
const register = async () => {
  const regOption = {
    name: regName.value,
    email: regEmail.value,
    password: regPassword.value,
  };
  if (!regName.value) {
    console.log("Name cannot be empty");
    return;
  }
  if (!regEmail.value) {
    console.log("Email cannot be empty");
    return;
  }
  if (!regPassword.value) {
    console.log("Password cannot be empty");
    return;
  }

  // Send to localStorage
  const { password, ...rest } = regOption; //Exclude password
  localStorage.setItem("currentUser", JSON.stringify(rest));

  setTimeout(() => {
    location.href = "../pages/dashboard.html";
    console.log(regOption);
  }, 3000);
};

// Register form
registerForm.onsubmit = (e) => {
  e.preventDefault();
  register();
};
