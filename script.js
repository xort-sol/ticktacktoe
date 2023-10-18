let player1Score = 0;
let player2Score = 0;
let player1move = true;
let player2move = false;
let usedWeaponsPlayer1 = 0;
let usedWeaponsPlayer2 = 0;
let totalWeapons = 0;

const weapons = document.querySelectorAll(".weapon");
const dropTargets = document.querySelectorAll(".drop-target");

weapons.forEach((weapon) => {
  weapon.addEventListener("dragstart", (event) => {
    if (weapon.classList.contains("onBoard") && totalWeapons <= 5) {
    } else {
      if (player1move && weapon.classList.contains("cross")) {
        event.dataTransfer.setData("text/plain", event.target.id);
        player1move = false;
        player2move = true;
      } else if (player2move && weapon.classList.contains("tick")) {
        event.dataTransfer.setData("text/plain", event.target.id);
        player1move = true;
        player2move = false;
      } else {
        event.preventDefault();
      }
    }
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
    weapon.className = weapon.className + " " + "onBoard" + " " + targetid;
    event.target.appendChild(weapon);
    totalWeapons++;
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

  if (crossLocation.length === 3) {
    var diff1 = crossLocation[0].charCodeAt(0) - crossLocation[1].charCodeAt(0);
    var diff2 = crossLocation[1].charCodeAt(0) - crossLocation[2].charCodeAt(0);

    if (diff1 < 0) {
      diff1 = diff1 * -1;
    }
    if (diff2 < 0) {
      diff2 = diff2 * -1;
    }

    if (diff1 == diff2 && diff1 < 5 && diff2 < 5) {
      player1Score++;
      displayWinner("Player 1");
    }
  }

  if (tickLocation.length === 3) {
    var diff1 = tickLocation[0].charCodeAt(0) - tickLocation[1].charCodeAt(0);
    var diff2 = tickLocation[1].charCodeAt(0) - tickLocation[2].charCodeAt(0);

    if (diff1 < 0) {
      diff1 = diff1 * -1;
    }
    if (diff2 < 0) {
      diff2 = diff2 * -1;
    }

    if (diff1 == diff2 && diff1 < 5 && diff2 < 5) {
      player2Score++;
      displayWinner("Player 2");
    }
  }
}

function displayWinner(winner) {
  var popup = document.getElementById("popup");
  var closePopup = document.getElementById("closePopup");
  var playerName = document.getElementById("winply");
  playerName.textContent = winner + " wins!";
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
