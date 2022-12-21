let songs = [
  { name: "Vaaste", filePath: "./songs/1.mp3", coverPath: './covers/1.jpg', duration: "4:20" },
  { name: "Leja Re", filePath: "./songs/2.mp3", coverPath: './covers/2.jpg', duration: "3:26" },
  { name: "Tera Ghata", filePath: "./songs/3.mp3", coverPath: './covers/3.jpg', duration: "4:14" },
  { name: "Besabriyaan", filePath: "./songs/4.mp3", coverPath: './covers/4.jpg', duration: "4:15" },
  { name: "Akh Lad Jaave", filePath: "./songs/5.mp3", coverPath: './covers/5.jpg', duration: "3:00" },
  { name: "Nayan", filePath: "./songs/6.mp3", coverPath: './covers/6.jpg', duration: "4:15" },
  { name: "Kuch Tho Bata Zindagi", filePath: "./songs/7.mp3", coverPath: './covers/7.jpg', duration: "3:59" },
  { name: "Let Me Love You", filePath: "./songs/8.mp3", coverPath: './covers/8.jpg', duration: "3:26" },
  { name: "Sorry", filePath: "./songs/9.mp3", coverPath: './covers/9.jpg', duration: "3:18" },
  { name: "Closer - Kabira Cover", filePath: "./songs/10.mp3", coverPath: './covers/10.jpg', duration: "3:22" },
  { name: "Kar Har Maidan Fateh", filePath: "./songs/11.mp3", coverPath: './covers/11.jpg', duration: "5:11" }
];
let songIndex = 0;
const songsContainer = document.getElementById('songs-container');
let s = '';
songs.forEach((song, i) => {
  s += `<div class="songItem" id=${i}>
   <img src=${song.coverPath} alt="${i + 1}">
   <span class="songName">${song.name}</span>
   <span class="timeSpan">${song.duration}<img src="./logos/play.svg" class="songListPlayBtn" alt="play-pause-btn"/>
     <img src="./logos/pause.svg" class="songListPauseBtn hide">
   </span>
 </div>`;
})
songsContainer.innerHTML = s;


let playBtn = document.getElementById('play');
let pauseBtn = document.getElementById('pause');
let playPrevBtn = document.getElementById('play-reverse');
let playNextBtn = document.getElementById('play-forward');


let audioElement = new Audio('./songs/1.mp3');
let myProgressBar = document.getElementById('myProgressBar');
let musicGif = document.getElementById('music_gif');
let songTitle = document.getElementById('songTitle');

let songItems = Array.from(document.getElementsByClassName('songItem'));





//Listen to Events
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songListPlayBtn')).forEach((element) => {
    element.classList.remove('hide');
  });
  Array.from(document.getElementsByClassName('songListPauseBtn')).forEach((element) => {
    element.classList.add('hide');
  });

  songItems.forEach((element) => {
    element.classList.remove('antiqueWhite');
  });
}


const stopAllSongs = () => {
  Array.from(document.getElementsByClassName('songListPlayBtn')).forEach((element, i) => {
    audioElement.src = songs[i].filePath;
    audioElement.pause();
  })
}

const updateSeekBar = (audioElement) => {
  audioElement.currentTime = 0;
  audioElement.addEventListener('timeupdate', () => {
    progress = (audioElement.currentTime / audioElement.duration) * 1000000;
    myProgressBar.value = progress;
  })

  myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 1000000;

  });

}

Array.from(document.getElementsByClassName('songListPlayBtn')).forEach((element, i) => {
  element.addEventListener('click', (e) => {
    makeAllPlays();
    stopAllSongs();
    e.target.parentNode.children[0].classList.add('hide');
    e.target.parentNode.children[1].classList.remove('hide');
    e.target.parentNode.parentNode.classList.add('antiqueWhite');
    audioElement = new Audio();
    audioElement.src = songs[i].filePath;
    audioElement.play();

    songIndex = i;
    updateSeekBar(audioElement);
    document.getElementById('songTitle').innerText = songs[i].name;
    playBtn.classList.add('hide');
    pauseBtn.classList.remove('hide');
    musicGif.style.opacity = 1;

  });




}
);

Array.from(document.getElementsByClassName('songListPauseBtn')).forEach((element) => {
  element.addEventListener('click', (e) => {

    e.target.parentNode.children[1].classList.add('hide');
    e.target.parentNode.children[0].classList.remove('hide');
    e.target.parentNode.parentNode.classList.remove('antiqueWhite');
    audioElement.pause();

    pauseBtn.classList.add('hide');
    playBtn.classList.remove('hide');

    musicGif.style.opacity = 0;

  }
  )
});



playBtn.addEventListener('click', (e) => {
  playBtn.classList.add('hide');
  pauseBtn.classList.remove('hide');
  audioElement.play();
  musicGif.style.opacity = 1;

  songItems[songIndex].children[2].children[0].classList.add('hide');
  songItems[songIndex].children[2].children[1].classList.remove('hide');



});
pauseBtn.addEventListener('click', (e) => {
  pauseBtn.classList.add('hide');
  playBtn.classList.remove('hide');
  audioElement.pause();
  musicGif.style.opacity = 0;

  songItems[songIndex].children[2].children[1].classList.add('hide');
  songItems[songIndex].children[2].children[0].classList.remove('hide');

});


playPrevBtn.addEventListener('click', () => {

  if (songIndex > 0) {
    songIndex--;
  }
  else {
    songIndex = 10;
  }
  stopAllSongs();
  makeAllPlays();
  songItems[songIndex].classList.add('antiqueWhite');
  audioElement = new Audio();
  audioElement.src = songs[songIndex].filePath;
  audioElement.play();
  updateSeekBar(audioElement);
  document.getElementById('songTitle').innerText = songs[songIndex].name;
  songItems[songIndex].children[2].children[0].classList.add('hide');
  songItems[songIndex].children[2].children[1].classList.remove('hide');

})

playNextBtn.addEventListener('click', () => {

  if (songIndex < 10) {
    songIndex++;
  }
  else {
    songIndex = 0;
  }
  stopAllSongs();
  makeAllPlays();
  songItems[songIndex].classList.add('antiqueWhite');
  audioElement = new Audio();
  audioElement.src = songs[songIndex].filePath;
  audioElement.play();
  updateSeekBar(audioElement);
  document.getElementById('songTitle').innerText = songs[songIndex].name;
  songItems[songIndex].children[2].children[0].classList.add('hide');
  songItems[songIndex].children[2].children[1].classList.remove('hide');

})





