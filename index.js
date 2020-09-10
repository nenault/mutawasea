/** 

 * @projectname Mutawasea
 * @version 0.1
 * @author Nicolas Enault
 * @copyright 2020
 * 
 */

import { Refugees } from "./refugees.js";
import { Mainboat } from "./main-boat.js";

/**
 * IIFE function
 */

(function () {
  let mutawasea = document.querySelector(".container");
  let clickZone = document.querySelector(".clickzone");
  let ports = document.getElementsByClassName("ports");
  let consoleLog = document.getElementById("console-log");
  let isPortsClosed = "false";
  let launchSimulation = document.querySelector(".launch");

  /**
   * Launches simulation and collision detection functions
   */
  launchSimulation.addEventListener("click", () => {
    launchSimulation.remove();
    startsGame();
    detectBoatToPort();
    detectBoatToRefugees();
    detectRefugeesToPort();

    // Clears alert message for opening or closing ports
    const intervalAlert = setInterval(() => {
      alertPort.innerHTML = ">>>";
    }, 4000);

    // Creates div that contains the port alert message
    const alertPort = document.createElement("div");
    alertPort.className = "alert";
    alertPort.innerHTML = ">>>";
    mutawasea.appendChild(alertPort);

    // Cursor on the click zone
    clickZone.style.cursor = "pointer";

    // Creates div that contains refugee data
    const div = document.createElement("div");
    div.className = "console";
    div.innerHTML += `
    <span id="saving-number">0 on board</span>
    <span id="death-number">0 drowned</span>
    <span id="saved-number">0 rescued</span>`;
    consoleLog.appendChild(div);

    // Manages random closing or opening of ports every six seconds
    const intervalclose = setInterval(() => {
      let randomNb = Math.random();
      let portsArr = [...ports];
      if (randomNb < 0.4) {
        isPortsClosed = "true";
        alertPort.innerHTML = `>>> Ports are closed to boats carrying refugees until further notice...`;
        portsArr.forEach((port) => {
          port.style.background =
            "url('./img/port-closed.png') center no-repeat";
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

  /**
   * Generates a random integer
   * @param min - Minimum integer from which to start
   * @param max - Maximum integer from which to stop
   */
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * Creates a new instance of the Mainboat class
   */
  function generateMainBoat() {
    const mainBoat = new Mainboat({
      nbRefugees: 0,
      gridRow: 12,
      gridColumn: 20,
    });

    // Creates main boat object
    const newMainBoat = mainBoat.boatShape();
    mutawasea.appendChild(newMainBoat);

    /**
     * Detects position of the user's mouse on click and invokes function to move the boat
     * @param event - Mouse event on click
     */
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

  // Empty array who will receive new refugee boat instances
  let refugeesArray = [];

  /**
   * Generates instances of Refugees class, with a random number of refugees and random positions
   */
  function generateRefugees() {
    let randomRefugeesNb = getRndInteger(10, 100);
    let randomColumn = getRndInteger(7, 33);

    const refugee = new Refugees({
      nbRefugees: randomRefugeesNb,
      gridRow: 30,
      gridColumn: randomColumn,
    });
    displayRefugees(refugee);
  }

  /**
   * Creates refugee boat object, creates an object that contains refugee Boat instance and HTML element and inserts them into  refugee boat array. Generates a random direction for this boat
   * @param refugee - An instance of the class Refugees
   */
  function displayRefugees(refugee) {
    const newBoat = refugee.boatShape();
    mutawasea.appendChild(newBoat);
    refugeesArray.push({ newBoat, refugee });
    let randomDestination = getRndInteger(1, 7);
    refugee.sail(newBoat, randomDestination);
  }

  /**
   * Invokes function that generates main boat, generates boats of refugees every three seconds, up to 750 deaths
   */
  function startsGame() {
    generateMainBoat();
    const intervalRefugees = setInterval(() => {
      if (deathAll >= 750) {
        clearInterval(intervalRefugees);
        endSimulation();
      } else {
        generateRefugees();
      }
    }, 3000);
  }

  // Declares necessary variables for collision detection
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

  /**
   * Function to detect collisions between main boat and one of the ports. Invokes disembarkRefugees function in case of collision, if port is open
   */
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

  /**
   * Function to detect collisions between  main boat and a refugee boat. Invokes the boat capaciy function in case of collision
   */
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

  /**
   * Invokes saveRefugees function if number of refugees on board in main boat is less than 350. Displays alert messages to warn user when boat exceeds its initial capacity and when it can no longer take new people
   * @param getBoat - HTML element which is the main boat
   * @param refugeesBoat - Object that contains  HTML element that is the refugees boat and the instance of Refugees class that contains metadatas of this boat
   */
  function boatCapacity(getBoat, refugeesBoat) {
    console.log(refugeesBoat.refugee.nbRefugees);
    // console.log(refugeesBoat);
    //let boatArr = [...refugeesBoat.refugee.nbRefugees];
    //console.log(boatArr);

    // Creates a div that contains alert messages about capacity of main boat
    const alertCapacity = document.createElement("div");
    alertCapacity.className = "alert-capacity";
    const intervalAlertCapacity = setInterval(() => {
      alertCapacity.innerHTML = "";
    }, 3000);
    mutawasea.appendChild(alertCapacity);
    if (saveAll < 250) {
      saveRefugees(getBoat, refugeesBoat);
    } else if (saveAll > 250 && saveAll < 350) {
      saveRefugees(getBoat, refugeesBoat);
      alertCapacity.innerHTML = `>>> Warning, you have exceeded the capacity of the boat, you can continue or go back to a safe harbor.`;
    } else {
      alertCapacity.innerHTML = `>>> There is no room at all on board, you should really find a safe harbor.`;
    }
  }

  /**
   * Invokes countSave function and delete refugee boat that has come into contact with main boat
   * @param mainBoat - Main boat html element
   * @param boat - Object that contains HTML element that is the refugees boat and the instance of Refugees class that contains metadatas of this boat
   */
  function saveRefugees(mainBoat, boat) {
    countSave(boat.refugee.nbRefugees);

    boat.newBoat.remove();
    boat.refugee.nbRefugees = 0;

    mainBoat.style.transition = "all 100s";
    mainBoat.style.transform = `translate(${0}px, ${0}px)`;

    boat.newBoat.style.transition = "all 600s";
    boat.newBoat.style.transform = `translate(${0}px, ${0}px)`;
  }

  let saveAll = 0;
  /**
   * Adds the number of refugees rescued by the main boat
   * @param count - Number of refugees in the refugee boat which came into contact with main boat
   */
  function countSave(count) {
    saveAll += count;
    countAllSavings();
  }

  /**
   * Display number of refugees in main boat in HTML
   */
  function countAllSavings() {
    let savingNumber = document.getElementById("saving-number");
    savingNumber.innerHTML = `${saveAll} on board`;
  }

  /**
   * Drops refugees at the port and empties main boat
   * @param mainBoat - Main boat html element
   * @param port - One of port HTML element
   */
  function disembarkRefugees(mainBoat, port) {
    mainBoat.style.transform = `translate(${
      port.getBoundingClientRect().left - mutawasea.getBoundingClientRect().left
    }px, ${port.getBoundingClientRect().top + 20}px)`;
    mainBoat.style.transform += "rotate(180deg)";

    validateSave();
    saveAll = 0;
    let savingNumber = document.getElementById("saving-number");
    savingNumber.innerHTML = `${saveAll} on board`;
  }

  let savedTotal = 0;
  /**
   * Adds number of refugees that have just been rescued to total number of refugees rescued and display it in HTML
   */
  function validateSave() {
    savedTotal += saveAll;
    let savedNumber = document.getElementById("saved-number");
    savedNumber.innerHTML = `${savedTotal} rescued`;
  }

  /**
   * Function to detect collisions between between refugee boats and ports. Invokes landRefugees function in case of collision
   */
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
          landRefugees(refugeesArray[i]);
          refugeesArray.splice(refugeesArray[i], 1);
        }
      }
    }
    window.requestAnimationFrame(detectRefugeesToPort);
  }

  /**
   * Delete refugee boats that reach a port
   * @param boat - Object that contains HTML element that is the refugees boat and the instance of Refugees class that contains metadatas of this boat
   */
  function landRefugees(boat) {
    boat.newBoat.style.transition = "all 500s";
    boat.newBoat.style.transform = `translate(${0}px, ${0}px)`;
    const intervalPort = setInterval(() => {
      boat.newBoat.remove();
    }, 1000);
  }

  // Invokes function that will generate perils for refugee boats, every two seconds
  const intervalEvent = setInterval(() => {
    refugeesArray.forEach((boat) => {
      randomPeril(boat);
    });
  }, 2000);

  let deathAll = 0;
  /**
   * Generates random perils for refugee boats
   * @param boat - Object that contains HTML element that is the refugees boat and the instance of Refugees class that contains metadatas of this boat
   */
  function randomPeril(boat) {
    let randomNb = Math.random();

    if (randomNb < 0.02) {
      // if (randomNb < 0.6) {
      boat.newBoat.style.transition = "all 50s";
      boat.newBoat.style.transform = `translate(${0}px, ${0}px)`;
      boat.newBoat.classList.add("flicker-1");

      // Invokes function that will count number of dead and remove HTML element if main boat does not make contact with refugee boat within ten seconds
      const timeOutSink = setTimeout(() => {
        (function () {
          countDeath(boat.refugee.nbRefugees);
        })();
        boat.refugee.nbRefugees = 0;
        boat.newBoat.remove();
      }, 10000);
    }
  }
  /**
   * Increments total number of deaths with number of deaths just recorded
   * @param a - Number of deaths just recorded
   */
  function countDeath(count) {
    deathAll += count;
    countAllDeath();
  }

  /**
   * Display the total number of deaths in HTML
   */
  function countAllDeath() {
    let deathNumber = document.getElementById("death-number");
    deathNumber.innerHTML = `${deathAll} drowned`;
  }

  /**
   * When the number of deaths exceeds 750, this function is invoked and displays  div that contains final text.
   */
  function endSimulation() {
    const endText = document.createElement("div");
    endText.className = "end-text";
    endText.innerHTML += `<h2 id="title-end">Simulation is over</h2>
    <p class="endPara"><b>750 people died</b>. This is the number of people who have drowned in the central Mediterranean since the beginning of 2020, if only those who were trying to reach Italy are counted. Since 2014, nearly 20,000 people have died in these conditions, according to the UNHCR, throughout the Mediterranean Sea.
    <br /><br />This is the world's most deadly migration route.<br/ ><br />You should check <a href="https://www.sosmediterranee.org/" target="_blank">SOS MEDITERRANEE's</a> website.<br />#refugeeswelcome
    </p>`;
    mutawasea.appendChild(endText);
  }
})();
