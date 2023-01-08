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
customers = JSON.parse(localStorage.getItem("customers")) || [];

let callReasonData = [];
callReasonData = JSON.parse(localStorage.getItem("callReasonData")) || [];

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
  } else if (JSON.parse(localStorage.getItem("customers")) === null) {
    newUserValidationMsg.innerHTML = "";
    acceptUserData();
    submitUserBtn.setAttribute("data-bs-dismiss", "modal");
    submitUserBtn.click();

    (() => {
      submitUserBtn.setAttribute("data-bs-dismiss", "");
    })();
    newUserForm.reset();
  } else if (
    JSON.parse(localStorage.getItem("customers")).filter((user) => {
      return user.newTel === newUserTel.value;
    }).length !== 0
  ) {
    newUserValidationMsg.innerHTML = "این شماره متعلق به کاربر دیگری است.";
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

function newUserFormReset() {
  newUserForm.reset();
  newUserValidationMsg.innerHTML = "";
}

// ***************************************
// ***************************************

// Call Reason Form JS

// Form inputs and groups
let CallReasonForm = document.querySelector("#cr-form");
let crList = document.querySelectorAll(".callReasonList");
let delayReportType = document.querySelectorAll(".delay-reportType");
let vendorDelayStatus = document.querySelectorAll(".vendorDelayStatus");
let delayCustomerAsk = document.querySelectorAll(".delayCustomerAsk");
let delayRepeat = document.querySelectorAll(".delayRepeat");

let exDeliveryStatus = document.querySelectorAll(".exDeliveryStatus");
let exDelayVendorSend = document.querySelectorAll(".exDelay-vendorSend");
let exSpentTime = document.querySelectorAll(".exSpentTime");
let exOrderStatus = document.querySelectorAll(".exOrderStatus");
let exGivenTime = document.querySelectorAll(".exGivenTime");
let returnedResend = document.querySelectorAll(".returnedResend");

// Form components
let crNext = document.querySelector("#cr-next-btn");
let crPre = document.querySelector("#cr-pre-btn");
let crFinish = document.querySelector("#cr-finish-btn");
let crSubmitBtn = document.querySelector("#cr-submit-btn");
let crCloseBtn = document.querySelector("#cr-close-btn");
let crValidationMsg = document.querySelector("#crValidationMsg");
if (!crList[0].classList.contains("display-none")) {
  crPre.setAttribute("disabled", "true");
}

//Diagram Components
let finishDiagram = document.querySelector("#finishDiagram");
let diagramOne = document.querySelector("#d-one");
let diagramTwo = document.querySelector("#d-two");
let diagramThree = document.querySelector("#d-three");
let diagramFour = document.querySelector("#d-four");
let diagramFive = document.querySelector("#d-five");
let diagramSix = document.querySelector("#d-six");
let diagramSeven = document.querySelector("#d-seven");
let diagramEight = document.querySelector("#d-eight");
let diagramNine = document.querySelector("#d-nine");

crNext.addEventListener("click", (e) => {
  // ------ درخواست مشتری اکسپرس ------
  if (
    !delayCustomerAsk[0].classList.contains("display-none") &&
    document.getElementById("callReason").value === "تاخیر پیک اکسپرس"
  ) {
    if (
      !document.getElementById("delayWait").checked &&
      !document.getElementById("delayCancel").checked
    ) {
      callReasonValidationMsg("لطفا درخواست مشتری را مشخص کنید");
      return;
    }
    if (document.getElementById("delayWait").checked) {
      reasonHide(delayCustomerAsk);
      diagramShow(diagramSeven, "منتظر می مانند", "درخواست مشتری");
      reasonShow(exGivenTime);
      crNext.classList.add("display-none");
      crFinish.classList.remove("display-none");
      return;
    }
  }

  // ------ وضعیت ارسال سفارش توسط وندور ------
  if (!vendorDelayStatus[0].classList.contains("display-none")) {
    if (
      vendorDelayStatus[0].getElementsByTagName("select")[0].value === "default"
    ) {
      callReasonValidationMsg("لطفا وضعیت ارسال سفارش را مشخص کنید.");
      return;
    }
    console.log("test");
    crNext.classList.add("display-none");
    crFinish.classList.remove("display-none");
    switch (vendorDelayStatus[0].getElementsByTagName("select")[0].value) {
      case "تحویل تا 5 دقیقه آینده":
        reasonHide(vendorDelayStatus);
        reasonShow(delayCustomerAsk);
        diagramShow(diagramFour, "تحویل تا 5 دقیقه آینده", "وضعیت ارسال سفارش");
        break;
      case "تحویل تا 10 دقیقه آینده":
        reasonHide(vendorDelayStatus);
        reasonShow(delayCustomerAsk);
        diagramShow(
          diagramFour,
          "تحویل تا 10 دقیقه آینده",
          "وضعیت ارسال سفارش"
        );
        break;
      case "تحویل تا 15 دقیقه آینده":
        reasonHide(vendorDelayStatus);
        reasonShow(delayCustomerAsk);
        diagramShow(
          diagramFour,
          "تحویل تا 15 دقیقه آینده",
          "وضعیت ارسال سفارش"
        );
        break;
      case "تحویل تا 20 دقیقه آینده":
        reasonHide(vendorDelayStatus);
        reasonShow(delayCustomerAsk);
        diagramShow(
          diagramFour,
          "تحویل تا 20 دقیقه آینده",
          "وضعیت ارسال سفارش"
        );
        break;
      case "تحویل تا 25 دقیقه آینده":
        reasonHide(vendorDelayStatus);
        reasonShow(delayCustomerAsk);
        diagramShow(
          diagramFour,
          "تحویل تا 25 دقیقه آینده",
          "وضعیت ارسال سفارش"
        );
        break;
      case "تحویل تا 30 دقیقه آینده":
        reasonHide(vendorDelayStatus);
        reasonShow(delayCustomerAsk);
        diagramShow(
          diagramFour,
          "تحویل تا 30 دقیقه آینده",
          "وضعیت ارسال سفارش"
        );
        break;
      case "عدم امکان ارسال و کنسلی سفارش":
        reasonHide(vendorDelayStatus);
        reasonShow(delayCustomerAsk);
        delayCustomerAsk[0]
          .getElementsByTagName("input")[0]
          .setAttribute("disabled", "true");
        diagramShow(
          diagramFour,
          "عدم امکان ارسال و کنسلی سفارش",
          "وضعیت ارسال سفارش"
        );
        break;
      case "سفارش برگشت خورده است":
        reasonHide(vendorDelayStatus);
        reasonShow(delayCustomerAsk);
        diagramShow(diagramFour, "سفارش برگشت خورده است", "وضعیت ارسال سفارش");
        break;
    }
  }

  // -------------- وضعیت سفارش در وندور -----------

  if (!exOrderStatus[0].classList.contains("display-none")) {
    if (
      !document.getElementById("inVendor").checked &&
      !document.getElementById("withDelivery").checked
    ) {
      callReasonValidationMsg("لطفا وضعیت سفارش را مشخص کنید!");
      return;
    }
    reasonHide(exOrderStatus);
    reasonShow(delayCustomerAsk);
    if (document.getElementById("inVendor").checked) {
      diagramShow(diagramSix, "در وندور مانده است", "وضعیت سفارش");
      return;
    }
    if (document.getElementById("withDelivery").checked) {
      diagramShow(diagramSix, "تحویل پیک شده است", "وضعیت سفارش");
      return;
    }
  }

  // -------------- زمان سپری شده در وضعیت -----------

  if (!exSpentTime[0].classList.contains("display-none")) {
    if (
      !document.getElementById("lower45").checked &&
      !document.getElementById("higher45").checked
    ) {
      callReasonValidationMsg("لطفا زمان سپری شده را مشخص کنید!");
      return;
    }
    if (document.getElementById("lower45").checked) {
      diagramShow(diagramFive, "کمتر از 45 دقیقه", "زمان سپری شده");
      reasonShow(delayCustomerAsk);
      reasonHide(exSpentTime);
      return;
    }

    if (document.getElementById("higher45").checked) {
      diagramShow(diagramFive, "بیشتر از 45 دقیقه", "زمان سپری شده");
      reasonShow(exOrderStatus);
      reasonHide(exSpentTime);
      return;
    }
  }

  // -------------- وضعیت ارسال توسط وندور -----------

  if (!exDelayVendorSend[0].classList.contains("display-none")) {
    if (
      !document.getElementById("send").checked &&
      !document.getElementById("notSend").checked
    ) {
      callReasonValidationMsg("لطفا امکان ارسال وندور را مشخص کنید.");
    }
    reasonHide(exDelayVendorSend);
    reasonShow(delayCustomerAsk);
    exVendorSendHide();
    if (document.getElementById("send").checked) {
      diagramShow(
        diagramFive,
        document.getElementById("send").value,
        "وضعیت ارسال توسط وندور"
      );
      return;
    }
    if (document.getElementById("notSend").checked) {
      diagramShow(
        diagramFive,
        document.getElementById("notSend").value,
        "وضعیت ارسال توسط وندور"
      );
      return;
    }
  }

  // -------------- وضعیت پنل اکسپرس -----------
  if (!exDeliveryStatus[0].classList.contains("display-none")) {
    if (
      exDeliveryStatus[0].getElementsByTagName("select")[0].value === "default"
    ) {
      callReasonValidationMsg("لطفا وضعیت پیک اکسپرس را مشخص کنید");
      return;
    }
    switch (exDeliveryStatus[0].getElementsByTagName("select")[0].value) {
      case "undefined":
      case "requested":
      case "assigned":
        reasonHide(exDeliveryStatus);
        reasonShow(exDelayVendorSend);
        diagramShow(
          diagramFour,
          exDeliveryStatus[0]
            .getElementsByTagName("select")[0]
            .value.toUpperCase(),
          "وضعیت پیک اکسپرس"
        );
        break;
      case "ack":
      case "atRestaurant":
      case "atDropOff":
      case "picked":
        reasonHide(exDeliveryStatus);
        reasonShow(exSpentTime);
        diagramShow(
          diagramFour,
          exDeliveryStatus[0]
            .getElementsByTagName("select")[0]
            .value.toUpperCase(),
          "وضعیت پیک اکسپرس"
        );
        break;
      case "delivered":
        reasonHide(exDeliveryStatus);
        reasonShow(exOrderStatus);
        diagramShow(
          diagramFour,
          exDeliveryStatus[0]
            .getElementsByTagName("select")[0]
            .value.toUpperCase(),
          "وضعیت پیک اکسپرس"
        );
        break;
      case "canceled":
        reasonHide(exDeliveryStatus);
        reasonShow(delayCustomerAsk);
        document.getElementById("delayWait").disabled = true;
        diagramShow(
          diagramFour,
          exDeliveryStatus[0]
            .getElementsByTagName("select")[0]
            .value.toUpperCase(),
          "وضعیت پیک اکسپرس"
        );
        break;
      case "سفارش برگشت خورده است":
        reasonHide(exDeliveryStatus);
        reasonShow(returnedResend);
        crNext.classList.add("display-none");
        crFinish.classList.remove("display-none");
        diagramShow(
          diagramFour,
          exDeliveryStatus[0]
            .getElementsByTagName("select")[0]
            .value.toUpperCase(),
          "وضعیت پیک اکسپرس"
        );
        break;
    }
  }

  // -------------- تکرار تاخیر -----------
  if (!delayRepeat[0].classList.contains("display-none")) {
    let repeats = delayRepeat[0].getElementsByTagName("input");
    if (!repeats[0].checked && !repeats[1].checked && !repeats[2].checked) {
      callReasonValidationMsg("لطفا مرتبه تکرار تاخیر را مشخص کنید!");
    }
    if (
      crList[0].getElementsByTagName("select")[0].value === "تاخیر پیک وندور"
    ) {
      if (repeats[0].checked) {
        reasonHide(delayRepeat);
        reasonShow(vendorDelayStatus);
        diagramShow(diagramThree, "تاخیر اول", "تکرار تاخیر");
        return;
      }
      if (repeats[1].checked) {
        reasonHide(delayRepeat);
        reasonShow(vendorDelayStatus);
        diagramShow(diagramThree, "تاخیر دوم", "تکرار تاخیر");
        return;
      }
      if (repeats[2].checked) {
        reasonHide(delayRepeat);
        reasonShow(vendorDelayStatus);
        diagramShow(diagramThree, "تاخیر سوم و یا بیشتر", "تکرار تاخیر");
        return;
      }
    }
    if (
      crList[0].getElementsByTagName("select")[0].value === "تاخیر پیک اکسپرس"
    ) {
      if (repeats[0].checked) {
        reasonHide(delayRepeat);
        reasonShow(exDeliveryStatus);
        diagramShow(diagramThree, "تاخیر اول", "تکرار تاخیر");
        return;
      }
      if (repeats[1].checked) {
        reasonHide(delayRepeat);
        reasonShow(exDeliveryStatus);
        diagramShow(diagramThree, "تاخیر دوم", "تکرار تاخیر");
        return;
      }
      if (repeats[2].checked) {
        reasonHide(delayRepeat);
        reasonShow(exDeliveryStatus);
        diagramShow(diagramThree, "تاخیر سوم و یا بیشتر", "تکرار تاخیر");
        return;
      }
    }
  }
  // -------------- نحوه اعلام تاخیر -----------
  if (!delayReportType[0].classList.contains("display-none")) {
    let reportTypes = delayReportType[0].getElementsByTagName("input");
    if (!reportTypes[0].checked && !reportTypes[1].checked) {
      callReasonValidationMsg("لطفا نحوه اعلام تاخیر مشتری را مشخص کنید!");
      return;
    }
    if (
      crList[0].getElementsByTagName("select")[0].value === "تاخیر پیک وندور"
    ) {
      if (reportTypes[0].checked) {
        reasonHide(delayReportType);
        reasonShow(vendorDelayStatus);
        diagramShow(diagramTwo, "تماس ورودی", "نحوه اعلام تاخیر");
        return;
      }
      if (reportTypes[1].checked) {
        reasonHide(delayReportType);
        reasonShow(delayRepeat);
        diagramShow(diagramTwo, "ثبت تیکت", "نحوه اعلام تاخیر");
        return;
      }
    }

    if (
      crList[0].getElementsByTagName("select")[0].value === "تاخیر پیک اکسپرس"
    ) {
      if (reportTypes[0].checked) {
        reasonHide(delayReportType);
        reasonShow(exDeliveryStatus);
        diagramShow(diagramTwo, "تماس ورودی", "نحوه اعلام تاخیر");
        return;
      }
      if (reportTypes[1].checked) {
        reasonHide(delayReportType);
        reasonShow(delayRepeat);
        diagramShow(diagramTwo, "ثبت تیکت", "نحوه اعلام تاخیر");
        return;
      }
    }
  }

  // -------------- علت تماس مشتری -----------
  if (!crList[0].classList.contains("display-none")) {
    if (crList[0].getElementsByTagName("select")[0].value === "default") {
      callReasonValidationMsg("لطفا علت تماس مشتری را مشخص کنید.!");
      return;
    }
    reasonHide(crList);
    switch (crList[0].getElementsByTagName("select")[0].value) {
      case "تاخیر پیک وندور":
        reasonShow(delayReportType);
        diagramShow(diagramOne, "تاخیر پیک وندور", "علت تماس مشتری");
        break;
      case "تاخیر پیک اکسپرس":
        reasonShow(delayReportType);
        diagramShow(diagramOne, "تاخیر پیک اکسپرس", "علت تماس مشتری");
        break;
      case "درخواست کنسلی سفارش":
      case "درخواست ویرایش سفارش":
        reasonShow(crList);
        break;
    }
    crPre.removeAttribute("disabled");
  }
});

crPre.addEventListener("click", (e) => {
  if (!delayReportType[0].classList.contains("display-none")) {
    let delayReportInputs = delayReportType[0].getElementsByTagName("input");
    delayReportInputs[0].checked = false;
    delayReportInputs[1].checked = false;
    reasonHide(delayReportType);
    diagramHide(diagramOne);
    reasonShow(crList);
    crPre.setAttribute("disabled", "true");
    return;
  }
  if (!delayRepeat[0].classList.contains("display-none")) {
    let repeats = delayRepeat[0].getElementsByTagName("input");
    repeats[0].checked = false;
    repeats[1].checked = false;
    repeats[2].checked = false;
    reasonHide(delayRepeat);
    diagramHide(diagramTwo);
    reasonShow(delayReportType);
    return;
  }
  if (!vendorDelayStatus[0].classList.contains("display-none")) {
    vendorDelayStatus[0].getElementsByTagName("select")[0].value = "default";
    if (delayReportType[0].getElementsByTagName("input")[0].checked) {
      reasonHide(vendorDelayStatus);
      diagramHide(diagramTwo);
      reasonShow(delayReportType);
      return;
    }
    if (delayReportType[0].getElementsByTagName("input")[1].checked) {
      reasonHide(vendorDelayStatus);
      diagramHide(diagramThree);
      reasonShow(delayRepeat);
      return;
    }
  }

  if (
    !exDeliveryStatus[0].classList.contains("display-none") &&
    delayReportType[0].getElementsByTagName("input")[1].checked
  ) {
    document.getElementById("exDeliveryStatus-select").value = "default";
    reasonHide(exDeliveryStatus);
    diagramHide(diagramThree);
    reasonShow(delayRepeat);
    return;
  }
  if (
    !exDeliveryStatus[0].classList.contains("display-none") &&
    delayReportType[0].getElementsByTagName("input")[0].checked
  ) {
    document.getElementById("exDeliveryStatus-select").value = "default";
    reasonHide(exDeliveryStatus);
    diagramHide(diagramTwo);
    reasonShow(delayReportType);
    return;
  }

  if (!exDelayVendorSend[0].classList.contains("display-none")) {
    reasonHide(exDelayVendorSend);
    diagramHide(diagramFour);
    reasonShow(exDeliveryStatus);
    document.getElementById("send").checked = false;
    document.getElementById("notSend").checked = false;
    exVendorSendHide();
    return;
  }

  if (!exSpentTime[0].classList.contains("display-none")) {
    document.getElementById("lower45").checked = false;
    document.getElementById("higher45").checked = false;
    reasonHide(exSpentTime);
    diagramHide(diagramFour);
    reasonShow(exDeliveryStatus);
    return;
  }

  if (!exOrderStatus[0].classList.contains("display-none")) {
    document.getElementById("inVendor").checked = false;
    document.getElementById("withDelivery").checked = false;
    reasonHide(exOrderStatus);
    if (document.getElementById("higher45").checked) {
      diagramHide(diagramFive);
      reasonShow(exSpentTime);
      return;
    }
    if (
      document.getElementById("exDeliveryStatus-select").value === "delivered"
    ) {
      diagramHide(diagramFour);
      reasonShow(exDeliveryStatus);
      return;
    }
  }
  if (!returnedResend[0].classList.contains("display-none")) {
    document.getElementById("returnExpress").checked = false;
    document.getElementById("returnInPerson").checked = false;
    crFinish.classList.add("display-none");
    crNext.classList.remove("display-none");
    returnResendExpressHide();
    reasonHide(returnedResend);
    reasonShow(exDeliveryStatus);
    diagramHide(diagramFour);

    diagramHide(diagramFive);
    finishDiagram.classList.add("display-none");
    crSubmitBtn.classList.add("disabled");
  }

  if (!delayCustomerAsk[0].classList.contains("display-none")) {
    document.getElementById("delayWait").checked = false;
    document.getElementById("delayCancel").checked = false;
    delayCancelHide();
    diagramHide(diagramNine);
    finishDiagram.classList.add("display-none");

    if (
      document.getElementById("inVendor").checked ||
      document.getElementById("withDelivery").checked
    ) {
      reasonHide(delayCustomerAsk);
      reasonShow(exOrderStatus);
      diagramHide(diagramSix);
      return;
    }

    if (
      document.getElementById("exDeliveryStatus-select").value === "canceled"
    ) {
      diagramHide(diagramFour);
      reasonHide(delayCustomerAsk);
      reasonShow(exDeliveryStatus);
      return;
    }
    if (document.getElementById("lower45").checked) {
      diagramHide(diagramFive);
      reasonHide(delayCustomerAsk);
      reasonShow(exSpentTime);
      return;
    }
    if (
      document.getElementById("send").checked ||
      document.getElementById("notSend").checked
    ) {
      diagramHide(diagramFive);
      reasonHide(delayCustomerAsk);
      reasonShow(exDelayVendorSend);
      return;
    }
    if (!diagramFive.classList.contains("display-none")) {
      diagramHide(diagramFive);
      diagramHide(finishDiagram);
      crSubmitBtn.classList.add("disabled");
    }

    let delayCustomerAskInputs =
      delayCustomerAsk[0].getElementsByTagName("input");
    delayCustomerAskInputs[0].checked = false;
    delayCustomerAskInputs[1].checked = false;
    delayCustomerAsk[0]
      .getElementsByTagName("input")[0]
      .removeAttribute("disabled");
    crFinish.classList.add("display-none");
    crNext.classList.remove("display-none");
    reasonHide(delayCustomerAsk);
    diagramHide(diagramFour);
    reasonShow(vendorDelayStatus);
    return;
  }
  if (!exGivenTime[0].classList.contains("display-none")) {
    if (finishDiagram.classList.contains("display-none")) {
      crFinish.classList.add("display-none");
      crNext.classList.remove("display-none");
      document.getElementById("givenTime-select").value = "default";
      reasonShow(delayCustomerAsk);
      reasonHide(exGivenTime);
      diagramHide(diagramSeven);
      return;
    } else {
      crFinish.classList.add("display-none");
      crNext.classList.remove("display-none");
      document.getElementById("givenTime-select").value = "default";
      reasonShow(delayCustomerAsk);
      reasonHide(exGivenTime);
      diagramHide(diagramSeven);
      diagramHide(diagramEight);
      finishDiagram.classList.add("display-none");
    }
  }
});

crFinish.addEventListener("click", (e) => {
  if (!returnedResend[0].classList.contains("display-none")) {
    if (
      !document.getElementById("returnInPerson").checked &&
      !document.getElementById("returnExpress").checked
    ) {
      callReasonValidationMsg("لطفا نحوه دریافت مجدد را مشخص کنید");
      return;
    }
    crSubmitBtn.classList.remove("disabled");
    if (document.getElementById("returnInPerson").checked) {
      diagramShow(diagramFive, "دریافت توسط مشتری", "نحوه دریافت مجدد");
    }
    if (document.getElementById("returnExpress").checked) {
      diagramShow(diagramFive, "ارسال توسط پیک اکسپرس", "نحوه دریافت مجدد");
    }
    finishDiagram.classList.remove("display-none");
  }
  if (!delayCustomerAsk[0].classList.contains("display-none")) {
    let askInputs = delayCustomerAsk[0].getElementsByTagName("input");
    if (!askInputs[0].checked && !askInputs[1].checked) {
      callReasonValidationMsg(
        "لطفا قبل از ثبت نهایی درخواست مشتری را مشخص کنید!"
      );
      return;
    }
    if (document.getElementById("callReason").value === "تاخیر پیک وندور") {
      if (askInputs[0].checked) {
        diagramShow(diagramFive, "منتظر می مانند", "درخواست مشتری");
        finishDiagram.classList.remove("display-none");
        crSubmitBtn.classList.remove("disabled");
        return;
      }
      if (askInputs[1].checked) {
        diagramShow(diagramFive, "سفارش کنسل شود", "درخواست مشتری");
        crSubmitBtn.classList.remove("disabled");
        finishDiagram.classList.remove("display-none");
        return;
      }
    }
    if (document.getElementById("callReason").value === "تاخیر پیک اکسپرس") {
      if (askInputs[1].checked) {
        diagramShow(diagramNine, "سفارش کنسل شود", "درخواست مشتری");
        crSubmitBtn.classList.remove("disabled");
        finishDiagram.classList.remove("display-none");
        return;
      }
    }
  }
  if (
    document.getElementById("callReason").value === "تاخیر پیک اکسپرس" &&
    !exGivenTime[0].classList.contains("display-none")
  ) {
    if (document.getElementById("givenTime-select").value === "default") {
      callReasonValidationMsg("لطفا زمان داده شده را مشخص کنید.");
      return;
    }
    diagramShow(
      diagramEight,
      document.getElementById("givenTime-select").value,
      "زمان داده شده"
    );
    crSubmitBtn.classList.remove("disabled");
    finishDiagram.classList.remove("display-none");
  }
});
crCloseBtn.addEventListener("click", (e) => {
  crHardReset();
});
let crSubmitFormBtn = document.querySelector("#cr-submitForm-btn");

crSubmitFormBtn.addEventListener("click", (e) => {
  logUserData(customerID.value);
  if (logUserData(customerID.value)) {
    crSubmitFormBtn.setAttribute("data-bs-toggle", "modal");
    crSubmitFormBtn.click();
  }
  (() => {
    crSubmitFormBtn.setAttribute("data-bs-toggle", "");
  })();
});

crSubmitBtn.addEventListener("click", (e) => {
  let cNumber = customerID.value;
  acceptCallReasonData({ customerNumber: cNumber });
  localStorage.setItem("callReasonData", JSON.stringify(callReasonData));
  logUserReports(cNumber);
  crHardReset();
});

function acceptCallReasonData(inputObj) {
  let crFormData = document.querySelectorAll(
    "#cr-form input , #cr-form select"
  );
  for (const input of crFormData) {
    if (input.type === "select-one" && input.value !== "default") {
      inputObj[input.name] = input.value;
    }

    if (input.type === "radio" && input.checked) {
      inputObj[input.name] = input.value;
    }
  }
  callReasonData.push(inputObj);
}
/***************************************************
 * Functions Section
 */
function delayCancelShow() {
  if (document.getElementById("callReason").value === "تاخیر پیک اکسپرس") {
    let cancelHint = document.querySelectorAll(".exCancel");
    for (const el of cancelHint) {
      el.classList.remove("display-none");
    }
    crNext.classList.add("display-none");
    crFinish.classList.remove("display-none");
  }
}
function delayCancelHide() {
  if (document.getElementById("callReason").value === "تاخیر پیک اکسپرس") {
    let cancelHint = document.querySelectorAll(".exCancel");
    for (const el of cancelHint) {
      el.classList.add("display-none");
    }
    crFinish.classList.add("display-none");
    crNext.classList.remove("display-none");
  }
}

function returnResendExpressShow() {
  let expressSend = document.querySelectorAll(".returnedResendTicket");
  for (const el of expressSend) {
    el.classList.remove("display-none");
  }
}
function returnResendExpressHide() {
  let expressSend = document.querySelectorAll(".returnedResendTicket");
  for (const el of expressSend) {
    el.classList.add("display-none");
  }
}

function exVendorSendShow() {
  let vendorSend = document.querySelectorAll(".exVendorSendTicket");
  for (const el of vendorSend) {
    el.classList.remove("display-none");
  }
}
function exVendorSendHide() {
  let vendorSend = document.querySelectorAll(".exVendorSendTicket");
  for (const el of vendorSend) {
    el.classList.add("display-none");
  }
}

function logUserData(CID) {
  userName.value = "";
  userTel.value = "";
  userStatus.value = "";
  userType.value = "";

  let userArray = JSON.parse(localStorage.getItem("customers")) || [];
  userArray = userArray.filter((user) => {
    return user.newTel === CID;
  });
  if (CID === "") {
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
    logUserReports(CID);
    return true;
  }
}

function logUserReports(CID) {
  let reportDiagramList = document.querySelector("#report-diagram-list");
  reportDiagramList.innerHTML = "";
  let userReports = callReasonData
    .filter((item) => item.customerNumber === CID)
    .reverse();
  if (userReports.length === 0) {
    reportDiagramList.innerHTML = "دیاگرامی جهت نمایش موجود نیست";
  }
  for (const report of userReports) {
    let reportRow = document.createElement("li");
    reportRow.setAttribute("id", "report-diagram-item");
    reportRow.classList = "d-flex justify-content-center align-items-center";
    reportDiagramList.appendChild(reportRow);
    let reportStart = document.createElement("div");
    reportStart.classList =
      "diagram-circle rounded-circle d-flex justify-content-center align-items-center text-white";
    reportStart.innerHTML = `شروع`;
    let reportFinish = document.createElement("div");
    reportFinish.classList = "flex-alignCenter";
    reportFinish.setAttribute("id", "reportFinish");
    reportFinish.innerHTML = `<div class="reportLine"></div>
  <div
    class="diagram-circle rounded-circle d-flex justify-content-center align-items-center text-white"
  >
    پایان
  </div>`;
    reportRow.appendChild(reportStart);
    for (const reason in report) {
      switch (reason) {
        case "reason-select":
          reportDiagram(reportRow, "دلیل تماس مشتری", report[reason]);
          break;
        case "delay-reportType":
          reportDiagram(reportRow, "نحوه اعلام تاخیر", report[reason]);
          break;
        case "delayRepeat":
          reportDiagram(reportRow, "تکرار تاخیر", report[reason]);
          break;
        case "exDeliveryStatus-select":
          reportDiagram(reportRow, "وضعیت پیک اکسپرس", report[reason]);
          break;
        case "returnedResend":
          reportDiagram(reportRow, "نحوه دریافت مجدد", report[reason]);
          break;
        case "exDelay-vendorSend":
          reportDiagram(reportRow, "امکان ارسال توسط وندور", report[reason]);
          break;
        case "exSpentTime":
          reportDiagram(reportRow, "زمان سپری شده", report[reason]);
          break;
        case "exOrderStatus":
          reportDiagram(reportRow, "وضعیت سفارش در وندور", report[reason]);
          break;
        case "vendorSendStatus-select":
          reportDiagram(reportRow, "وضعیت ارسال سفارش", report[reason]);
          break;
        case "delayCustomerAsk":
          reportDiagram(reportRow, "درخواست مشتری", report[reason]);
          break;
        case "exGivenTime-select":
          reportDiagram(reportRow, "زمان داده شده", report[reason]);
          break;
      }
    }
    reportRow.appendChild(reportFinish);
  }
}

function reportDiagram(parent, title, text) {
  let diagram = document.createElement("div");
  diagram.classList = "flex-alignCenter";
  diagram.innerHTML = `<div class="reportLine"></div>
  <div class="reportRectangle d-flex flex-column">
    <small>${title}:</small>
    ${text}
  </div>`;
  parent.appendChild(diagram);
}

function crHardReset() {
  let formComponents = document.querySelectorAll(".resetForm");
  reasonShow(crList);
  for (let item of formComponents) {
    if (!item.classList.contains("display-none")) {
      item.classList.add("display-none");
    }
  }

  crFinish.classList.add("display-none");
  crNext.classList.remove("display-none");
  crPre.setAttribute("disabled", "true");
  crSubmitBtn.classList.add("disabled");
  CallReasonForm.reset();
}

function reasonHide(group) {
  for (item of group) {
    if (!item.classList.contains("display-none")) {
      item.classList.add("display-none");
    }
  }
}
function reasonShow(group) {
  for (item of group) {
    if (item.classList.contains("display-none")) {
      item.classList.remove("display-none");
    }
  }
}

function diagramShow(inputDiagram, inputText, inputTitle) {
  if (inputDiagram.classList.contains("display-none")) {
    inputDiagram.children[1].innerHTML = `
  <small>${inputTitle}:</small>
  ${inputText}
`;
    inputDiagram.classList.remove("display-none");
  }
}
function diagramHide(inputDiagram) {
  if (!inputDiagram.classList.contains("display-none")) {
    inputDiagram.classList.add("display-none");
  }
}

function callReasonValidationMsg(message) {
  crValidationMsg.textContent = message;
  setTimeout(() => {
    crValidationMsg.textContent = "";
  }, 1500);
}
