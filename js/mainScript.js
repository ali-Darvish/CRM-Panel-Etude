const customerID = document.querySelector("#user-id");
let idValidationMsg = document.querySelector("#id-msg");

let userName = document.querySelector("#user-name");
let userTel = document.querySelector("#user-tel");
let userStatus = document.querySelector("#user-status");
let userType = document.querySelector("#user-type");

const newUserForm = document.querySelector("#submit-user-form");
const newFirstName = document.querySelector("#user-newFirstName");
const newLastName = document.querySelector("#user-newLastName");
const newUserTel = document.querySelector("#user-newTel");

let newUserValidationMsg = document.querySelector("#newUserValidationMsg");

const submitUserBtn = document.querySelector("#new-user-submit-btn");
const closeUserBtn = document.querySelector("#new-user-close-btn");

let customers = [];
submitUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formValidation();
});

function formValidation() {
  newUserValidationMsg.innerHTML = "";

  if (newFirstName.value === "" || newLastName.value === "") {
    newUserValidationMsg.innerHTML =
      "نام، نام خانوادگی و شماره تلفن کاربر الزامی می باشد.";
  } else if (
    isNaN(Number(newUserTel.value)) ||
    newUserTel.value.length !== 11
  ) {
    newUserValidationMsg.innerHTML =
      "لطفا فرمت شماره تلفن را به درستی وارد کنید";
  } else if (
    JSON.parse(localStorage.getItem("customers")).filter((user) => {
      return user.newTel === newUserTel.value;
    }).length !== 0
  ) {
    newUserValidationMsg.innerHTML = "این شماره متعلق به کاربر دیگری است.";
  } else if (JSON.parse(localStorage.getItem("customers")).length === 0) {
    console.log("faiure");
  } else {
    newUserValidationMsg.innerHTML = "";
    acceptUserData();
    submitUserBtn.setAttribute("data-bs-dismiss", "modal");
    submitUserBtn.click();

    (() => {
      submitUserBtn.setAttribute("data-bs-dismiss", "");
    })();
    newUserForm.reset();
  }
}
function acceptUserData() {
  let customerData = { status: "ثبت شده", type: "نامشخص" };
  let formData = document.querySelectorAll("#submit-user-form input");
  for (let input of formData) {
    if (
      (input.type === "text" ||
        input.type === "tel" ||
        input.type === "email") &&
      input.value !== ""
    ) {
      customerData[input.name] = input.value;
    } else if (input.type === "radio" && input.checked) {
      customerData[input.name] = input.value;
    }
  }
  customers.push(customerData);
  localStorage.setItem("customers", JSON.stringify(customers));
}

closeUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  newUserForm.reset();
  newUserValidationMsg.innerHTML = "";
});

customerID.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    logUserData(customerID.value);
  }
});

function logUserData(CID) {
  userName.value = "";
  userTel.value = "";
  userStatus.value = "";
  userType.value = "";

  let userArray = JSON.parse(localStorage.getItem("customers")).filter(
    (user) => {
      return user.newTel === CID;
    }
  );
  if (customerID.value === "") {
    idValidationMsg.innerHTML = "لطفا شماره مشتری را وارد کنید!";
  } else if (userArray.length === 0) {
    idValidationMsg.innerHTML = "کاربری با شماره وارد شده یافت نشد!";
  } else {
    idValidationMsg.innerHTML = "";
    const user = userArray[0];
    userName.value = `${user.newFirstName} ${user.newLastName}`;
    userTel.value = user.newTel;
    userStatus.value = user.status;
    userType.value = user.type;
  }
}

function newUserFormReset() {
  newUserForm.reset();
  newUserValidationMsg.innerHTML = "";
}

(() => {
  customers = JSON.parse(localStorage.getItem("customers")) || [];
})();

// ---------------------------------------
