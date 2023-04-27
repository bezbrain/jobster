import { notification } from "./fuctions.js";

const getCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
console.log(getCurrentUser);
// console.log(getLoginUser);

const loginRegBtn = document.querySelector(".login-reg-btn");
const displayRegPage = document.querySelector(".where-to-apply-login-display");
const undisplayLandingPage = document.querySelector(".landing-page");

const regCon = document.querySelector(".centralizing-con");
const regName = document.querySelector(".reg-name-con input");
const regEmail = document.querySelector("form .reg-email-con input");
const regPassword = document.querySelector(" form .reg-password-con input");
const registerForm = document.querySelector(".login-reg-con form");
const letsLogin = document.querySelector(".login-reg-con p span");

const loginCon = document.querySelector(".centralizing-login-con");
const loginEmail = document.querySelector("form .login-email-con input");
const loginPassword = document.querySelector(" form .login-password-con input");
const loginForm = document.querySelector(".login-con form");
const letsReg = document.querySelector(".login-con p span");

// Dashboard Login/Register button
loginRegBtn.onclick = () => {
  undisplayLandingPage.style.display = "none";
  displayRegPage.style.display = "block";
};

// Switch to Register
letsReg.onclick = () => {
  loginCon.style.display = "none";
  regCon.style.display = "flex";
};

// Switch to Login
letsLogin.onclick = () => {
  regCon.style.display = "none";
  loginCon.style.display = "flex";
};

let failure = "failure";
let success = "success";

/*=========*/
// Login form effect
const getLoginUser = JSON.parse(localStorage.getItem("loginUser"));

const login = async () => {
  const loginOption = {
    email: loginEmail.value,
    password: loginPassword.value,
  };
  if (!loginEmail.value || !loginPassword.value) {
    // On Field empty
    notification(failure, "No field should be empty");
    return;
  }

  if (!localStorage.getItem("currentUser")) {
    // When the Local Storage initially contains no data
    notification(failure, "No account found, register");
    return;
  }

  if (
    loginOption.email !== getLoginUser.email ||
    loginOption.password !== getLoginUser.password
  ) {
    console.log("Not equal");
    // On login, if reg email and login email are not the same
    notification(failure, "Email or password incorrect");
    return;
  }

  setTimeout(() => {
    location.href = "../pages/dashboard.html";
  }, 3000);

  // On Registration completed
  notification(success, "Login successful");
};

/*========*/
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
  localStorage.setItem("currentUser", JSON.stringify(regOption));

  const { name, ...rest } = regOption;
  localStorage.setItem("loginUser", JSON.stringify(rest));

  setTimeout(() => {
    location.href = "../pages/dashboard.html";
  }, 3000);

  // On Registration completed
  notification(success, "Registration successful");
};

/*========*/
// Register form
registerForm.onsubmit = (e) => {
  e.preventDefault();
  register();
};

/*========*/
// Login form
loginForm.onsubmit = (e) => {
  e.preventDefault();
  login();
};
