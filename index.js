import { Refugees } from "./refugees.js";
import { Mainboat } from "./main-boat.js";

(function () {
  let mutawasea = document.querySelector(".container");
  let map = document.querySelector(".map");
  let clickZone = document.querySelector(".clickzone");
  let refugeesBoats = document.getElementsByClassName("refugee-boat");
  let ports = document.getElementsByClassName("ports");
  let destinations = document.querySelectorAll(".greenDot");
  let rightZone = document.getElementById("right");
  let consoleLog = document.getElementById("console-log");

  let totalRefugees = 11471;
  let isPortsClosed = "false";

  let launchSimulation = document.querySelector(".launch");
  launchSimulation.addEventListener("click", () => {
    launchSimulation.remove();
    startsGame();
    detectBoatToPort();
    detectBoatToRefugees();
    detectRefugeesToPort();

    const intervalAlert = setInterval(() => {
      alertPort.innerHTML = ">>>";
    }, 4000);

    const alertPort = document.createElement("div");
    alertPort.className = "alert";
    alertPort.innerHTML = ">>>";
    mutawasea.appendChild(alertPort);

    clickZone.style.cursor = "pointer";

    const div = document.createElement("div");
    div.className = "console";
    div.innerHTML += `
    <span id="saving-number">0 on board</span>
    <span id="death-number">0 drowned</span>
    <span id="saved-number">0 rescued</span>`;
    consoleLog.appendChild(div);

    const intervalclose = setInterval(() => {
      let portStatus = document.getElementById("ports-status");
      let randomNb = Math.random();
      let portsArr = [...ports];
      if (randomNb < 0.4) {
        isPortsClosed = "true";
        alertPort.innerHTML = `>>> Ports are closed to boats carrying refugees until further notice...`;
        portsArr.forEach((port) => {
          port.style.background =
            "url('./img/refugee-boat.png') center no-repeat";
        });
      } else {
        isPortsClosed = "false";
        alertPort.innerHTML = `>>> Ports are open, you can dock there safely   `;
        portsArr.forEach((port) => {
          port.style.background = "url('./img/port.png') center no-repeat";
        });
      }
    }, 6000);
  });

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
    let randomColumn = getRndInteger(7, 33);

    totalRefugees -= randomRefugeesNb;

    const refugee = new Refugees({
      nbRefugees: randomRefugeesNb,
      gridRow: 30,
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

  function startsGame() {
    generateMainBoat();
    const intervalRefugees = setInterval(() => {
      if (deathAll >= 400) {
        clearInterval(intervalRefugees);
        endSimulation();
      } else {
        generateRefugees();
      }
    }, 3000);
  }

  // collisions

  let getBoatW,
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

  function boatCapacity(getBoat, refugeesBoat) {
    //console.log(refugeesBoat.refugee.nbRefugees);
    //console.log(getBoat);
    //let boatArr = [...refugeesBoat.refugee.nbRefugees];
    //console.log(boatArr);

    let savingNumber = document.getElementById("saving-number");
    const alertCapacity = document.createElement("div");
    alertCapacity.className = "alert-capacity";
    mutawasea.appendChild(alertCapacity);
    if (saveAll < 250) {
      saveRefugees(getBoat, refugeesBoat);
      savingNumber.style.color = "white";
    } else if (saveAll > 250 && saveAll < 350) {
      saveRefugees(getBoat, refugeesBoat);
      savingNumber.style.color = "orange";
      alertCapacity.innerHTML = `>>> Warning, you have exceeded the capacity of the boat, you can continue or go back to a safe harbor.`;
    } else {
      savingNumber.style.color = "red";
      alertCapacity.innerHTML = `>>> There is no room at all on board, you should really find a safe harbor.`;
    }
  }

  function saveRefugees(a, b) {
    countSave(b.refugee.nbRefugees);
    let savingNumber = document.getElementById("saving-number");
    savingNumber.style.color = "white";

    const timeOutSave = setTimeout(() => {
      b.newBoat.remove();
      b.refugee.nbRefugees = 0;
    }, 1000);

    a.style.transition = "all 600s";
    a.style.transform = `translate(${0}px, ${0}px)`;

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
    savingNumber.innerHTML = `${saveAll} on board`;
  }

  function disembarkRefugees(a, b) {
    a.style.transform = `translate(${
      b.getBoundingClientRect().left - mutawasea.getBoundingClientRect().left
    }px, ${b.getBoundingClientRect().top + 20}px)`;
    a.style.transform += "rotate(180deg)";

    validateSave();
    saveAll = 0;
    let savingNumber = document.getElementById("saving-number");
    savingNumber.innerHTML = `${saveAll} on board`;
  }

  let savedTotal = 0;
  function validateSave() {
    savedTotal += saveAll;
    let savedNumber = document.getElementById("saved-number");
    savedNumber.innerHTML = `${savedTotal} rescued`;
  }

  function detectRefugeesToPort() {
    for (let i = 0; i < refugeesArray.length; i++) {
      for (let j = 0; j < ports.length; j++) {
        refugeesBoatsW = refugeesArray[i].newBoat.getBoundingClientRect().width;
        refugeesBoatsH = refugeesArray[i].newBoat.getBoundingClientRect()
          .height;
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
    //countAllLandings();
  }

  function countAllLandings() {
    let landingNumber = document.getElementById("landing-number");
    // landingNumber.innerHTML = `${landingAll}`;
  }

  const intervalEvent = setInterval(() => {
    refugeesArray.forEach((boat) => {
      randomPeril(boat);
    });
  }, 2000);

  let deathAll = 0;
  function randomPeril(boat) {
    let randomNb = Math.random();
    //if (randomNb < 0.02) {
    if (randomNb < 0.6) {
      boat.newBoat.style.transition = "all 50s";
      boat.newBoat.style.transform = `translate(${0}px, ${0}px)`;
      boat.newBoat.style.transform += "rotate(360deg)";
      // boat.newBoat.classList.add("distress-call");;

      const timeOutSink = setTimeout(() => {
        (function () {
          countDeath(boat.refugee.nbRefugees);
        })();
        boat.refugee.nbRefugees = 0;
        boat.newBoat.remove();
      }, 5000);
    }
  }

  function countDeath(count) {
    deathAll += count;
    countAllDeath();
  }

  function countAllDeath() {
    let deathNumber = document.getElementById("death-number");
    deathNumber.innerHTML = `${deathAll} drowned`;
  }

  function endSimulation() {
    const endText = document.createElement("div");
    endText.className = "end-text";
    endText.innerHTML += `<h2 id="title-end">Simulation is over</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce orci
    lorem, fringilla interdum sapien venenatis, bibendum blandit diam.
    Etiam nec turpis eget mi   elementum feugiat quis ut lacus. Integer
    ultrices pharetra nisi. Praesent venenatis ex congue sapien aliquam
    rutrum. Nullam egestas volutpat urna, ut hendrerit augue commodo eu.
    Mauris ullamcorper hendrerit euismod. Etiam tristique justo eu
    sollicitudin facilisis. Suspendisse quis sollicitudin mi, vitae cursus
    diam. Etiam sollicitudin suscipit justo, id dignissim urna dignissim
    nec. Praesent a elementum sapien</p>
    <div id="relaunch-btn" class="btn">Relaunch simulation</div>`;
    mutawasea.appendChild(endText);
    restart();
  }

  function restart() {
    let relaunch = document.getElementById("relaunch-btn");
    relaunch.addEventListener("click", function (event) {
      let endText = document.querySelector(".end-text");
      endText.remove();
      main - boat.remove();
      deathAll = 0;
      saveAll = 0;
      startsGame();
    });
  }
})();
