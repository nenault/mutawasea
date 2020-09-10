// Refugees boat
export class Refugees {
  constructor(infos) {
    this.nbRefugees = infos.nbRefugees;
    this.gridRow = infos.gridRow;
    this.gridColumn = infos.gridColumn;
    this.landingFirstPort = 0;
  }

  boatShape() {
    const div = document.createElement("div");
    div.className = "refugee-boat";
    div.style.gridRow = this.gridRow;
    div.style.gridColumn = this.gridColumn;
    return div;
  }

  sail(newBoat, randomDestination) {
    let lampedusaPort = document.getElementById("lampedusa-port");
    let maltaPort = document.getElementById("malta-port");
    let pozzalloPort = document.getElementById("pozzallo-port");
    let messinaPort = document.getElementById("messina-port");
    let crotonePort = document.getElementById("crotone-port");
    let tarantoPort = document.getElementById("taranto-port");

    let departArea = (8 * window.innerHeight) / 100;

    if (randomDestination === 1) {
      let calcY =
        window.innerHeight -
        lampedusaPort.getBoundingClientRect().top -
        newBoat.getBoundingClientRect().height * 4 -
        departArea;

      if (
        lampedusaPort.getBoundingClientRect().left >
        newBoat.getBoundingClientRect().left
      ) {
        let calcX =
          lampedusaPort.getBoundingClientRect().left -
          newBoat.getBoundingClientRect().left +
          newBoat.getBoundingClientRect().width * 2;
        newBoat.style.transitionDuration = "100S";
        newBoat.style.transform = `translate(${calcX}px, ${0 - calcY}px)`;
      } else {
        let calcX =
          newBoat.getBoundingClientRect().left -
          lampedusaPort.getBoundingClientRect().right -
          newBoat.getBoundingClientRect().width * 2;
        let subCalcX = 0 - calcX - newBoat.getBoundingClientRect().width * 4;

        newBoat.style.transitionDuration = "100S";
        newBoat.style.transform = `translate(${subCalcX}px, ${0 - calcY}px)`;
      }
    } else if (randomDestination === 2) {
      let calcY =
        window.innerHeight -
        maltaPort.getBoundingClientRect().top -
        newBoat.getBoundingClientRect().height * 4 -
        departArea;

      if (
        maltaPort.getBoundingClientRect().left >
        newBoat.getBoundingClientRect().left
      ) {
        let calcX =
          maltaPort.getBoundingClientRect().left -
          newBoat.getBoundingClientRect().left +
          newBoat.getBoundingClientRect().width * 2;
        newBoat.style.transitionDuration = "100S";
        newBoat.style.transform = `translate(${calcX}px, ${0 - calcY}px)`;
      } else {
        let calcX =
          newBoat.getBoundingClientRect().left -
          maltaPort.getBoundingClientRect().right -
          newBoat.getBoundingClientRect().width * 2;
        let subCalcX = 0 - calcX - newBoat.getBoundingClientRect().width * 4;

        newBoat.style.transitionDuration = "100S";
        newBoat.style.transform = `translate(${subCalcX}px, ${0 - calcY}px)`;
      }
    } else if (randomDestination === 3) {
      let calcY =
        window.innerHeight -
        pozzalloPort.getBoundingClientRect().top -
        newBoat.getBoundingClientRect().height * 4 -
        departArea;

      if (
        pozzalloPort.getBoundingClientRect().left >
        newBoat.getBoundingClientRect().left
      ) {
        let calcX =
          pozzalloPort.getBoundingClientRect().left -
          newBoat.getBoundingClientRect().left +
          newBoat.getBoundingClientRect().width * 2;
        newBoat.style.transitionDuration = "100S";
        newBoat.style.transform = `translate(${calcX}px, ${0 - calcY}px)`;
      } else {
        let calcX =
          newBoat.getBoundingClientRect().left -
          pozzalloPort.getBoundingClientRect().right -
          newBoat.getBoundingClientRect().width * 2;
        let subCalcX = 0 - calcX - newBoat.getBoundingClientRect().width * 4;

        newBoat.style.transitionDuration = "100S";
        newBoat.style.transform = `translate(${subCalcX}px, ${0 - calcY}px)`;
      }
    } else if (randomDestination === 4) {
      let calcY =
        window.innerHeight -
        messinaPort.getBoundingClientRect().top -
        newBoat.getBoundingClientRect().height * 4 -
        departArea;

      if (
        messinaPort.getBoundingClientRect().left >
        newBoat.getBoundingClientRect().left
      ) {
        let calcX =
          messinaPort.getBoundingClientRect().left -
          newBoat.getBoundingClientRect().left +
          newBoat.getBoundingClientRect().width * 2;
        newBoat.style.transitionDuration = "100S";
        newBoat.style.transform = `translate(${calcX}px, ${0 - calcY}px)`;
      } else {
        let calcX =
          newBoat.getBoundingClientRect().left -
          messinaPort.getBoundingClientRect().right -
          newBoat.getBoundingClientRect().width * 2;
        let subCalcX = 0 - calcX - newBoat.getBoundingClientRect().width * 4;

        newBoat.style.transitionDuration = "100S";
        newBoat.style.transform = `translate(${subCalcX}px, ${0 - calcY}px)`;
      }
    } else if (randomDestination === 5) {
      let calcY =
        window.innerHeight -
        crotonePort.getBoundingClientRect().top -
        newBoat.getBoundingClientRect().height * 4 -
        departArea;

      if (
        crotonePort.getBoundingClientRect().left >
        newBoat.getBoundingClientRect().left
      ) {
        let calcX =
          crotonePort.getBoundingClientRect().left -
          newBoat.getBoundingClientRect().left +
          newBoat.getBoundingClientRect().width * 2;
        newBoat.style.transitionDuration = "100S";
        newBoat.style.transform = `translate(${calcX}px, ${0 - calcY}px)`;
      } else {
        let calcX =
          newBoat.getBoundingClientRect().left -
          crotonePort.getBoundingClientRect().right -
          newBoat.getBoundingClientRect().width * 2;
        let subCalcX = 0 - calcX - newBoat.getBoundingClientRect().width * 4;

        newBoat.style.transitionDuration = "100S";
        newBoat.style.transform = `translate(${subCalcX}px, ${0 - calcY}px)`;
      }
    } else {
      let calcY =
        window.innerHeight -
        tarantoPort.getBoundingClientRect().top -
        newBoat.getBoundingClientRect().height * 4 -
        departArea;

      if (
        tarantoPort.getBoundingClientRect().left >
        newBoat.getBoundingClientRect().left
      ) {
        let calcX =
          tarantoPort.getBoundingClientRect().left -
          newBoat.getBoundingClientRect().left +
          newBoat.getBoundingClientRect().width * 2;
        newBoat.style.transitionDuration = "100S";
        newBoat.style.transform = `translate(${calcX}px, ${0 - calcY}px)`;
      } else {
        let calcX =
          newBoat.getBoundingClientRect().left -
          tarantoPort.getBoundingClientRect().right -
          newBoat.getBoundingClientRect().width * 2;
        let subCalcX = 0 - calcX - newBoat.getBoundingClientRect().width * 4;

        newBoat.style.transitionDuration = "100S";
        newBoat.style.transform = `translate(${subCalcX}px, ${0 - calcY}px)`;
      }
    }
  }
}
