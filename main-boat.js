// Main boat
export class Mainboat {
  constructor(infos) {
    this.nbRefugees = infos.nbRefugees;
    this.gridRow = infos.gridRow;
    this.gridColumn = infos.gridColumn;
    this.maxRefugees = 150;
  }

  boatShape() {
    const div = document.createElement("div");
    div.className = "main-boat";
    div.style.gridRow = this.gridRow;
    div.style.gridColumn = this.gridColumn;
    return div;
  }

  sail(xPosition, yPosition) {
    let mainBoat = document.querySelector(".main-boat");

    if (yPosition < mainBoat.getBoundingClientRect().top) {
      mainBoat.style.transition = "all 1s";
      
      mainBoat.style.gridColumn = "1";
      mainBoat.style.gridRow = "1";
      
      mainBoat.style.transform = `translate(${xPosition}px, ${yPosition + (mainBoat.getBoundingClientRect().height)*2}px)`;
      mainBoat.style.transform += "rotate(180deg)";
    } else {
      mainBoat.style.transition = "all 1s";
      
      mainBoat.style.gridColumn = "1";
      mainBoat.style.gridRow = "1";
      
      mainBoat.style.transform = `translate(${xPosition}px, ${yPosition + mainBoat.getBoundingClientRect().height}px)`;
    }
  }
}
