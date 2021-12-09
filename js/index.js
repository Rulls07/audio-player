let playBtn = document.querySelector("#play");
let divPlayBtn = document.querySelector(".play");
let pauseBtn = document.querySelector("#pause");
let divPauseBtn = document.querySelector(".pause");
let stopBtn = document.querySelector("#stop");
let forwardBtn = document.querySelector("#forward");
let backwardBtn = document.querySelector("#backward");
let prevBtn = document.querySelector("#stepBackward");
let nextBtn = document.querySelector("#stepForward");
let muteBtn = document.querySelector("#volumenMute");
let randomBtn = document.querySelector("#random");
let volumenUpBtn = document.querySelector("#volumenUp");
let volumenDownBtn = document.querySelector("#volumenDown");
let audioPlayer = document.querySelector("#audioPlayer");
let artisteInput = document.querySelector("#artiste");
let albumInput = document.querySelector("#album");
let titreInput = document.querySelector("#titre");
let progTime = document.querySelector("#progTime");
let spTime = document.getElementById("spTimeSong");
let spDuration = document.getElementById("spDuration");
let listSong = document.querySelector("#listeChansons");
let muted = false;
let volume = 4;
let currentSong = 0;
let randomSong;

// getSons();
// fetch("./json/musique.json")
//   .then((data) => data.json())
//   .then((data) => {
//     let allMusic = data.chansons;
//     playSong(allMusic);
//     showInfoMusique(allMusic);
//     nextBtn.addEventListener("click", () => {
//       currentSong++;
//       console.log("currentSong ++",currentSong);
//       playSong(allMusic);
//       showInfoMusique(allMusic);
//       play();
//     });
//     prevBtn.addEventListener("click", () => {
//       currentSong--;
//       console.log("currentSong --",currentSong);
//       playSong(allMusic);
//       showInfoMusique(allMusic);
//       play();
//     });
//     updateProgress(audioPlayer);

//   });

//**************************************************************** Function Audio Player********************* */

function playSong(jsonObj) {
  const song = jsonObj[currentSong];
  // const title = song.title;
  const audioSource = song.src;
  // const album = song.album;
  // const artiste = song.artiste;
  changeSourceAudio(audioSource);
  // console.log("Artiste:",artiste, "Album:", album,"Title:", title, "Source:", audioSource);
}
function showInfoMusique(jsonObj) {
  const song = jsonObj[currentSong];
  const artiste = song.artiste;
  const title = song.title;
  const album = song.album;
  artisteInput.value = artiste;
  titreInput.value = title;
  albumInput.value = album;
}
function showListeMusique(jsonObj) {
  for (let i = 0; i < jsonObj.length; i++) {
    const element = jsonObj[i];
    let option = document.createElement("option");

    option.textContent = element.title;
    listSong.appendChild(option);
  }
}
let allMusic=false;
async function test() {
  let toto = await getSons();
  // console.log(toto);
  allMusic = toto.chansons;
  playSong(allMusic);
  showInfoMusique(allMusic);
  showListeMusique(allMusic);
  updateProgress(audioPlayer);
}
test();
async function getSons() {
  return fetch("./json/musique.json").then((response) => {
    return response.json();
  });
}
function changeSourceAudio(source) {
  return (audioPlayer.src = source);
}
function play() {
  audioPlayer.play();
}
function updateProgress(player) {
  let duration = player.duration; // Durée totale
  let time = player.currentTime; // Temps écoulé
  let fraction = time / duration;
  let percent = Math.ceil(fraction * 100);
  progTime.value = percent;
  progTime.textContent = percent + "%";
}
function updateTime(audioPlayer, value) {
  let timeSet = (value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = timeSet;
}
function paddZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function updateTimeSong() {
  let played = audioPlayer.currentTime;
  progTime.value = audioPlayer.currentTime;
  played =
    played < 60
      ? "00:" + paddZero(Math.floor(played))
      : paddZero(Math.floor(played / 60)) +
        ":" +
        paddZero(Math.floor(played % 60));
  spTime.textContent = played;
}
function updateDuration() {
  let timeTotal = audioPlayer.duration;
  timeTotal =
    timeTotal < 60
      ? "00:" + paddZero(Math.floor(timeTotal))
      : paddZero(Math.floor(timeTotal / 60)) +
        ":" +
        paddZero(Math.floor(timeTotal % 60));
  spDuration.textContent = timeTotal;
}
function getRandomSong(jsonObj){
  let randomSong =  Math.floor(Math.random() * jsonObj.length);
  // console.log("function random",jsonObj[randomSong]);
  // console.log("currentSong random",currentSong);
  currentSong = randomSong;
  return currentSong
}

//* ---------------------------------------------- RANDOM SONG BUTTON
randomBtn.addEventListener("click", () => {
  getRandomSong(allMusic);
  // console.log("currentSong random",currentSong);
  playSong(allMusic);
  showInfoMusique(allMusic);
  play();
  divPauseBtn.classList.remove("visibility");
  divPlayBtn.classList.add("visibility");
  });
//* ---------------------------------------------- NEXT SONG BUTTON
nextBtn.addEventListener("click", () => {
  // if (!allMusic) {
  //   return;
  // }
    currentSong++;
    // console.log(currentSong);
    if (currentSong == allMusic.length) {
      currentSong = 0;
      // console.log("currentSong == allMusic.length", currentSong);
    }
    playSong(allMusic);
    showInfoMusique(allMusic);
    play();
  });
//* ---------------------------------------------- PREV SONG BUTTON
  prevBtn.addEventListener("click", () => {
    currentSong--;
    if (currentSong < 0) {
      currentSong = allMusic.length - 1;
      console.log("currentSong derniere", currentSong);
    }
    playSong(allMusic);
    showInfoMusique(allMusic);
    play();
  });
//* ---------------------------------------------- LIST SONG - SELECT
  listSong.addEventListener("click", (e) => {
    if (e.target && e.target.tagName == "OPTION") {
      let valueListe = e.target.textContent;
      for (let i = 0; i < allMusic.length; i++) {
        const valueTitleJson = allMusic[i].title;
        if (valueListe == valueTitleJson) {
          console.log(
            "*******liste*******",
            valueListe,
            "*******JSON*******",
            valueTitleJson
          );
          // console.log(allMusic);
          // console.log(i);
          currentSong = i;
          console.log("currentSong****>", currentSong);
          playSong(allMusic);
          showInfoMusique(allMusic);
          play();
          divPauseBtn.classList.remove("visibility");
          divPlayBtn.classList.add("visibility");
        }
      }
    }
  });


  //* ----------------------------------------------AUDIOPLAYER SONG

  audioPlayer.addEventListener("timeupdate", (e) => {
  updateTimeSong();
  updateProgress(audioPlayer);
  updateDuration();

});
  audioPlayer.addEventListener('ended', (e) => nextBtn.click());


  //* ----------------------------------------------PLAY SONG
playBtn.addEventListener("click", () => {
  divPauseBtn.classList.remove("visibility");
  divPlayBtn.classList.add("visibility");

  play();
});
//* ----------------------------------------------STOP SONG
stopBtn.addEventListener("click", () => {
  divPauseBtn.classList.add("visibility");
  divPlayBtn.classList.remove("visibility");
  audioPlayer.pause();
  audioPlayer.currentTime = 0;
});
//* ---------------------------------------------- PAUSE SONG
pauseBtn.addEventListener("click", () => {
  audioPlayer.pause();
  divPauseBtn.classList.add("visibility");
  divPlayBtn.classList.remove("visibility");
});
//* ---------------------------------------------- BACKWARD SONG
backwardBtn.addEventListener("click", () => {
  audioPlayer.currentTime -= 15;
});
//* ---------------------------------------------- FORWARD SONG
forwardBtn.addEventListener("click", () => {
  audioPlayer.currentTime += 15;
});
//* ---------------------------------------------- VOLUMEN UP SONG
volumenUpBtn.addEventListener("click", () => {
  if (volume < 9 && !muted) {
    volume += 1;
    audioPlayer.volume = volume / 10;
  }
});
//* ---------------------------------------------- VOLUMEN DOWN SONG
volumenDownBtn.addEventListener("click", (e) => {
  if (volume > 0 && !muted) {
    volume -= 1;
    audioPlayer.volume = volume / 10;
  }
});
//* ---------------------------------------------- MUTE SONG
muteBtn.addEventListener("click", () => {
  if (audioPlayer.volume > 0) {
    let volumenM = 0;
    audioPlayer.volume = volumenM / 10;
    audioPlayer.muted = true;
    muted = true;
  } else {
    audioPlayer.volume = volume / 10;
    audioPlayer.muted = false;
    muted = false;
  }
});
//* ---------------------------------------------- INPUT RANGE
progTime.addEventListener("input", (e) => {
  // console.log(e.target.value,"<=================>",progTime.value);
  updateTime(audioPlayer, progTime.value);
});



//************************************************************************************* */
//************************************************************************************* */
//**************************************************************** Ballons********************* */
//************************************************************************************* */
//************************************************************************************* */

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(5) + 5;
  return `
    background-color: rgba(${r},${g},${b},0.7);
    color: rgba(${r},${g},${b},0.7); 
    box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
    margin: ${mt}px 0 0 ${ml}px;
    animation: float ${dur}s ease-in infinite
    `;
}

function createBalloons(num) {
  let balloonContainer = document.getElementById("balloon-container");
  for (let i = num; i > 0; i--) {
    let balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    balloonContainer.append(balloon);
  }
}

window.onload = function () {
  createBalloons(9);
};