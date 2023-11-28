const images = [
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  "images/10.jpg",
  "images/8.avif",
];
const tiles = [...document.querySelectorAll(".tile")];
let imagesDuplicate = [...images, ...images];
const imagesLength = imagesDuplicate.length;
const tilesFront = [...document.querySelectorAll(".tile-front")];
let clickCardevent = 0;
let cardsMatching = [];
let cardsMatchingReplica = [];

let timer = 0;
let [hour, min, sec] = [0, 0, 0];

startgame();

const interval = setInterval(Timer, 1000);
function Timer() {
  sec++;
  if (sec == 60) {
    sec = 0;
    min++;
    if (min == 60) {
      min = 0;
      hour++;
    }
  }
  let seconds, minutes, hours;
  if (sec <= 9) {
    seconds = "0" + sec;
  } else {
    seconds = sec;
  }
  if (min <= 9) {
    minutes = "0" + min;
  } else {
    minutes = min;
  }
  if (hours <= 9) {
    hours = "0" + hour;
  } else {
    hours = hour;
  }

  document.getElementById("timer").innerHTML = `${hours}:${minutes}:${seconds}`;
}

function view() {
  tiles.forEach((tile) => {
    let targetforview = tile.querySelector(".tile-front");
    if (!cardsMatchingReplica.includes(tile)) {
      targetforview.style.transform = "translate(-50%,-50%) rotateY(90deg) ";
      setTimeout(() => {
        targetforview.style.transform = "translate(-50%,-50%) rotateY(0deg)";
      }, 2000);
    } else {
      return;
    }
  });
}

function restartGameplay() {
  tilesFront.forEach((tilesOpen) => {
    tilesOpen.style.transform = "translate(-50%,-50%) rotateY(0deg) ";
  });

  [hour, min, sec] = [0, 0, 0];

  clickCardevent = 0;
  cardsMatching = [];
  cardsMatchingReplica = [];

  const overlay = document.querySelector(".overlay");
  overlay.style.opacity = 0;
  overlay.style.zIndex = "-1";
  startgame();
}

function startgame() {
  view();
  let imagesDuplicateArray = [];
  let j = 0;
  let indexForremember = imagesLength;
  while (indexForremember > 0) {
    let indexRandom = Math.floor(Math.random() * imagesLength);
    if (!imagesDuplicateArray.includes(indexRandom)) {
      indexForremember--;
      tiles[j].style.background = `url(${imagesDuplicate[indexRandom]})`;
      tiles[j].style.backgroundSize = "cover";
      imagesDuplicateArray.push(indexRandom);
      j++;
    }
  }
}

tiles.forEach((tile) => tileOpen(tile));

function tileOpen(tile) {
  tile.addEventListener("click", function (e) {
    if (clickCardevent === 2) {
      return;
    }
    clickCardevent++;
    let target = e.currentTarget.querySelector(".tile-front");
    target.style.transform = "translate(-50%, -50%) rotateY(90deg)";
    if (clickCardevent === 1) {
      cardsMatching.push(tile);
    } else if (clickCardevent === 2) {
      cardsMatching.push(tile);
      matchCards();
    }
  });
}

function matchCards() {
  let time = document.getElementById("timer").innerHTML;
  let score = 0;
  let cardoneBackground = cardsMatching[0].style.background;
  let cardtwoBackground = cardsMatching[1].style.background;
  if (cardoneBackground === cardtwoBackground) {
    clickCardevent = 0;
    cardsMatchingReplica.push(cardsMatching[0]);
    cardsMatchingReplica.push(cardsMatching[1]);
    cardsMatching = [];
    setTimeout(() => {
      if (cardsMatchingReplica.length === 12) {
        clearInterval(interval);
        if (sec < 60) {
          score = score += 100;
        } else if (min < 5) {
          score = score += 90;
        } else if (min > 5 && min < 10) {
          score = score += 70;
        } else {
          score = 50;
        }

        const banner = document.querySelector(".banner h2");
        const overlay = document.querySelector(".overlay");
        overlay.style.opacity = 1;
        overlay.style.zIndex = "1";

        banner.innerHTML = `TIME:  ${time} <br>
        YOUR SCORE:  ${score}`;
      }
    }, 200);
  } else if (cardoneBackground !== cardtwoBackground) {
    setTimeout(() => {
      cardsMatching[0].querySelector(".tile-front").style.transform =
        "translate(-50%,-50%) rotateY(0deg)";
      cardsMatching[1].querySelector(".tile-front").style.transform =
        "translate(-50%,-50%) rotateY(0deg)";
      clickCardevent = 0;
      cardsMatching = [];
    }, 500);
  }
}
