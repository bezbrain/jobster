import { notification } from "./fuctions.js";

const loginRegBtn = document.querySelector(".login-reg-btn");
const displayRegPage = document.querySelector(".where-to-apply-login-display");
const undisplayLandingPage = document.querySelector(".landing-page");

const regName = document.querySelector(".reg-name-con input");
const regEmail = document.querySelector("form .reg-email-con input");
const regPassword = document.querySelector(" form .reg-password-con input");
const registerForm = document.querySelector(".login-reg-con form");

const landingPageLogin = document.querySelector(".landing-page-login");
const dashboard = document.querySelector(".dashboard-page");

/*========*/
// Notification Popup
// const displayNotification = document.querySelector(
//   ".where-to-apply-noti-display"
// );
// export const notificationText = document.querySelector(".icon-and-text p");
// export const drain = document.querySelector(".success-drain");
// export const successIcon = document.querySelector(".success-icon");
// export const failureIcon = document.querySelector(".failure-icon");

loginRegBtn.onclick = () => {
  undisplayLandingPage.style.display = "none";
  displayRegPage.style.display = "block";
};

let failure = "failure";
let success = "success";

// Register form effect
const register = async () => {
  const regOption = {
    name: regName.value,
    email: regEmail.value,
    password: regPassword.value,
  };
  if (!regName.value || !regEmail.value || !regPassword.value) {
    // On Field empty
    notification(failure, "No field should be empty");
    return;
  }

  // Send to localStorage
  const { password, ...rest } = regOption; //Exclude password
  console.log(rest);
  localStorage.setItem("currentUser", JSON.stringify(rest));

  setTimeout(() => {
    location.href = "../pages/dashboard.html";
  }, 3000);

  // On Registration completed
  notification(success, "Registration successful");
};

// Register form
registerForm.onsubmit = (e) => {
  e.preventDefault();
  register();
};
