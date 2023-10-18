let player1Score = 0;
let player2Sore = 0;
var player1move = true;
var player1move = false;

const weapons = document.querySelectorAll(".weapon");
const dropTargets = document.querySelectorAll(".drop-target");

weapons.forEach((weapon) => {
  weapon.addEventListener("dragstart", (event) => {
    console.log("drag start");
    event.dataTransfer.setData("text/plain", event.target.id);
  });
});

dropTargets.forEach((dropTarget) => {
  dropTarget.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  dropTarget.addEventListener("drop", (event) => {
    event.preventDefault();
    const weaponId = event.dataTransfer.getData("text/plain");
    const weapon = document.getElementById(weaponId);
    var targetid = event.target.id;
    weapon.className = weapon.className + " ";
    weapon.className = weapon.className + targetid;
    event.target.appendChild(weapon);
    checkWinner();
  });
});

function checkWinner() {
  const grids = document.querySelectorAll(".grid");
  const crossLocation = [];
  const tickLocation = [];

  grids.forEach((grid) => {
    const allCross = grid.querySelectorAll(".cross");
    const allTicks = grid.querySelectorAll(".tick");
    console.log(allCross);
    console.log(allTicks);

    allCross.forEach((cross) => {
      const classes = cross.classList;
      const lastClass = classes[classes.length - 1];
      crossLocation.push(lastClass);
    });

    allTicks.forEach((tick) => {
      const classes = tick.classList;
      const lastClass = classes[classes.length - 1];
      tickLocation.push(lastClass);
    });
  });

  console.log(crossLocation);
  console.log(tickLocation);
  if (crossLocation.length == 3 && tickLocation.length != 3) {
    var diff1 = crossLocation[0].charCodeAt(0) - crossLocation[1].charCodeAt(0);
    var diff2 = crossLocation[1].charCodeAt(0) - crossLocation[2].charCodeAt(0);

    if (diff1 < 0) {
      diff1 = diff1 * -1;
    }
    if (diff2 < 0) {
      diff2 = diff2 * -1;
    }

    if (diff1 == diff2 && diff1 < 5 && diff2 < 5) {
      console.log("player1 win");
      var popup = document.getElementById("popup");
      var closePopup = document.getElementById("closePopup");
      var playerName = document.getElementById("winply");
      playerName.textContent = "Player 1 wins";
      popup.style.display = "block";

      closePopup.addEventListener("click", function () {
        popup.style.display = "none";
        location.reload(true);
      });

      window.addEventListener("click", function (event) {
        if (event.target == popup) {
          popup.style.display = "none";
          location.reload(true);
        }
      });
    }
  }
  if (crossLocation.length != 3 && tickLocation.length == 3) {
    var diff1 = tickLocation[0].charCodeAt(0) - tickLocation[1].charCodeAt(0);
    var diff2 = tickLocation[1].charCodeAt(0) - tickLocation[2].charCodeAt(0);

    if (diff1 < 0) {
      diff1 = diff1 * -1;
    }
    if (diff2 < 0) {
      diff2 = diff2 * -1;
    }

    if (diff1 == diff2 && diff1 < 5 && diff2 < 5) {
      console.log("player2 win");
      var popup = document.getElementById("popup");
      var closePopup = document.getElementById("closePopup");
      var playerName = document.getElementById("winply");
      playerName.textContent = "Player 2 wins";
      popup.style.display = "block";

      closePopup.addEventListener("click", function () {
        popup.style.display = "none";
        location.reload(true);
      });

      window.addEventListener("click", function (event) {
        if (event.target == popup) {
          popup.style.display = "none";
          location.reload(true);
        }
      });
    }
  }
}
