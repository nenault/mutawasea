import { Refugees } from "./refugees.js";
import { Mainboat } from "./main-boat.js";

let mutawasea = document.querySelector(".container");
let map = document.querySelector(".map");
let clickZone = document.querySelector(".clickzone");
let refugeesBoats = document.getElementsByClassName("refugee-boat");
let ports = document.getElementsByClassName("ports");
let destinations = document.querySelectorAll(".greenDot");

let totalRefugees = 11471;
let isPortsClosed = "false";

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateMainBoat() {
  const mainBoat = new Mainboat({
    nbRefugees: 0,
    gridRow: 12,
    gridColumn: 20,
  });

  const newMainBoat = mainBoat.boatShape();
  mutawasea.appendChild(newMainBoat);

  mutawasea.addEventListener("click", function (event) {
    let getBoat = document.querySelector(".main-boat");
    let isFirstClick = "true"

    var xPosition =
      event.clientX -
      mutawasea.getBoundingClientRect().left -
      getBoat.clientWidth / 2;
    var yPosition =
      event.clientY -
      mutawasea.getBoundingClientRect().top -
      getBoat.clientHeight * 2;

    mainBoat.sail(xPosition, yPosition);
  });
}

let refugeesArray = [];

function generateRefugees() {
  let randomRefugeesNb = getRndInteger(10, 100);
  let randomColumn = getRndInteger(6, 33);

  //totalRefugees -= randomRefugeesNb;

  const refugee = new Refugees({
    nbRefugees: randomRefugeesNb,
    gridRow: 32,
    gridColumn: randomColumn,
  });
  displayRefugees(refugee);
}

function displayRefugees(refugee) {
  const newBoat = refugee.boatShape();
  mutawasea.appendChild(newBoat);
  refugeesArray.push({ newBoat, refugee });
  let randomDestination = getRndInteger(1, 7);
  refugee.sail(newBoat, randomDestination);
}
generateMainBoat();

const intervalRefugees = setInterval(() => {
  generateRefugees();
}, 3000);

// collisions

var getBoatW,
  getBoatH,
  getBoatX,
  getBoatY,
  refugeesBoatsW,
  refugeesBoatsH,
  refugeesBoatsX,
  refugeesBoatsY,
  portW,
  portH,
  portX,
  portY;

function detectBoatToPort() {
  let getBoat = document.querySelector(".main-boat");

  for (let i = 0; i < ports.length; i++) {
    getBoatW = getBoat.getBoundingClientRect().width;
    getBoatH = getBoat.getBoundingClientRect().height;
    getBoatX = getBoat.getBoundingClientRect().left;
    getBoatY = getBoat.getBoundingClientRect().top;
    portW = ports[i].getBoundingClientRect().width;
    portH = ports[i].getBoundingClientRect().height;
    portX = ports[i].getBoundingClientRect().left;
    portY = ports[i].getBoundingClientRect().top;

    if (
      getBoatX + getBoatW > portX &&
      getBoatX < portX + portW &&
      getBoatY + getBoatH > portY &&
      getBoatY < portY + portH
    ) {
      if (isPortsClosed === "false") {
        disembarkRefugees(getBoat, ports[i]);
      }
    }
  }
  window.requestAnimationFrame(detectBoatToPort);
}
detectBoatToPort();

function detectBoatToRefugees() {
  let getBoat = document.querySelector(".main-boat");

  for (let i = 0; i < refugeesArray.length; i++) {
    getBoatW = getBoat.getBoundingClientRect().width;
    getBoatH = getBoat.getBoundingClientRect().height;
    getBoatX = getBoat.getBoundingClientRect().left;
    getBoatY = getBoat.getBoundingClientRect().top;
    refugeesBoatsW = refugeesArray[i].newBoat.getBoundingClientRect().width;
    refugeesBoatsH = refugeesArray[i].newBoat.getBoundingClientRect().height;
    refugeesBoatsX = refugeesArray[i].newBoat.getBoundingClientRect().left;
    refugeesBoatsY = refugeesArray[i].newBoat.getBoundingClientRect().top;

    if (
      getBoatX + getBoatW > refugeesBoatsX &&
      getBoatX < refugeesBoatsX + refugeesBoatsW &&
      getBoatY + getBoatH > refugeesBoatsY &&
      getBoatY < refugeesBoatsY + refugeesBoatsH
    ) {
      boatCapacity(getBoat, refugeesArray[i]);
      refugeesArray.splice(refugeesArray[i], 1);
    }
  }
  window.requestAnimationFrame(detectBoatToRefugees);
}

detectBoatToRefugees();

function boatCapacity(getBoat, refugeesBoat) {
  if (saveAll < 250) {
    saveRefugees(getBoat, refugeesBoat);
  } else if (saveAll > 250 && saveAll < 350) {
    saveRefugees(getBoat, refugeesBoat);
    console.log("warning capacity over 250");
  } else {
    console.log("too much");
  }
}

function saveRefugees(a, b) {
  countSave(b.refugee.nbRefugees);

  const timeOutSave = setTimeout(() => {
    b.newBoat.remove();
    b.refugee.nbRefugees = 0;
  }, 1000);

  a.style.transform = `translate(${
    b.newBoat.getBoundingClientRect().left -
    mutawasea.getBoundingClientRect().left
  }px, ${b.newBoat.getBoundingClientRect().top - 40}px)`;

  b.newBoat.style.transition = "all 600s";
  b.newBoat.style.transform = `translate(${0}px, ${0}px)`;
}

let saveAll = 0;
function countSave(count) {
  saveAll += count;
  countAllSavings();
}

function countAllSavings() {
  let savingNumber = document.getElementById("saving-number");
  savingNumber.innerHTML = `${saveAll}`;
}

function disembarkRefugees(a, b) {
  a.style.transform = `translate(${
    b.getBoundingClientRect().left - mutawasea.getBoundingClientRect().left
  }px, ${b.getBoundingClientRect().top + 20}px)`;
  a.style.transform += "rotate(180deg)";

  validateSave();
  saveAll = 0;
  let savingNumber = document.getElementById("saving-number");
  savingNumber.innerHTML = `${saveAll}`;
}

let savedTotal = 0;
function validateSave() {
  savedTotal += saveAll;
  let savedNumber = document.getElementById("saved-number");
  savedNumber.innerHTML = `${savedTotal}`;
}

function detectRefugeesToPort() {
  for (let i = 0; i < refugeesArray.length; i++) {
    for (let j = 0; j < ports.length; j++) {
      refugeesBoatsW = refugeesArray[i].newBoat.getBoundingClientRect().width;
      refugeesBoatsH = refugeesArray[i].newBoat.getBoundingClientRect().height;
      refugeesBoatsX = refugeesArray[i].newBoat.getBoundingClientRect().left;
      refugeesBoatsY = refugeesArray[i].newBoat.getBoundingClientRect().top;
      portW = ports[j].getBoundingClientRect().width;
      portH = ports[j].getBoundingClientRect().height;
      portX = ports[j].getBoundingClientRect().left;
      portY = ports[j].getBoundingClientRect().top;

      if (
        refugeesBoatsX + refugeesBoatsW > portX &&
        refugeesBoatsX < portX + portW &&
        refugeesBoatsY + refugeesBoatsH > portY &&
        refugeesBoatsY < portY + portH
      ) {
        landRefugees(refugeesArray[i], ports[j]);
        refugeesArray.splice(refugeesArray[i], 1);
      }
    }
  }
  window.requestAnimationFrame(detectRefugeesToPort);
}
detectRefugeesToPort();

function landRefugees(a, b) {
  countLanding(a.refugee.nbRefugees);
  a.newBoat.style.transition = "all 500s";
  a.newBoat.style.transform = `translate(${0}px, ${0}px)`;
  const intervalPort = setInterval(() => {
    a.newBoat.remove();
  }, 1000);
}

let landingAll = 0;
function countLanding(count) {
  landingAll += count;
  countAllLandings();
}

function countAllLandings() {
  let landingNumber = document.getElementById("landing-number");
  landingNumber.innerHTML = `${landingAll}`;
}

const intervalEvent = setInterval(() => {
  refugeesArray.forEach((boat) => {
    randomPeril(boat);
  });
}, 2000);

let deathAll = 0;
function randomPeril(boat) {
  let randomNb = Math.random();
  if (randomNb < 0.02) {
    boat.newBoat.style.transition = "all 50s";
    boat.newBoat.style.transform = `translate(${0}px, ${0}px)`;
    boat.newBoat.style.transform += "rotate(360deg)";
   // boat.newBoat.classList.add("distress-call");

    const timeOutSink = setTimeout(() => {
      (function () {
        countDeath(boat.refugee.nbRefugees);
      })();
      boat.refugee.nbRefugees = 0;
      boat.newBoat.remove();
    }, 5000);
  }
}

const intervalclose = setInterval(() => {
  let portStatus = document.getElementById("ports-status");
  let randomNb = Math.random();
  if (randomNb < 0.4) {
    isPortsClosed = "true";
    portStatus.innerHTML = "Closed";
  } else {
    isPortsClosed = "false";
    portStatus.innerHTML = "Open";
  }
}, 2000);

function countDeath(count) {
  deathAll += count;
  countAllDeath();
}

function countAllDeath() {
  let deathNumber = document.getElementById("death-number");
  deathNumber.innerHTML = `${deathAll}`;
}
