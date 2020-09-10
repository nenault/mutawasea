// Main boat
export class Mainboat {
  /**
   * Constructor of Mainboat class
   * @param infos - Object that contains datas about main boat
   */
  constructor(infos) {
    this.nbRefugees = infos.nbRefugees;
    this.gridRow = infos.gridRow;
    this.gridColumn = infos.gridColumn;
    this.maxRefugees = 150;
  }

  /**
   * Creates main boat HTML element
   */
  boatShape() {
    const div = document.createElement("div");
    div.className = "main-boat";
    div.style.gridRow = this.gridRow;
    div.style.gridColumn = this.gridColumn;
    return div;
  }

  /**
   * Moves main boats according to click positions
   * @param xPosition - Number, X position of mouse click
   * @param yPosition - Number, Y position of mouse click
   */
  sail(xPosition, yPosition) {
    let mainBoat = document.querySelector(".main-boat");

    mainBoat.style.visibility = "hidden";
    const timeOutSave = setTimeout(() => {
      mainBoat.style.visibility = "visible";
    }, 1000);

    if (yPosition < mainBoat.getBoundingClientRect().top) {
      mainBoat.style.transition = "all 6s";

      mainBoat.style.gridColumn = "1";
      mainBoat.style.gridRow = "1";

      mainBoat.style.transform = `translate(${xPosition}px, ${
        yPosition + mainBoat.getBoundingClientRect().height * 2
      }px)`;
      mainBoat.style.transform += "rotate(180deg)";
    } else {
      mainBoat.style.transition = "all 6s";

      mainBoat.style.gridColumn = "1";
      mainBoat.style.gridRow = "1";

      mainBoat.style.transform = `translate(${xPosition}px, ${
        yPosition + mainBoat.getBoundingClientRect().height
      }px)`;
    }
  }
}
