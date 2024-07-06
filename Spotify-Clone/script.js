console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

const songs = [
    { songName: "Salame Ishq", filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
    { songName: "Bhula Dena", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
    { songName: "Tumhari Kasam", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
    { songName: "Na Jaane Kyu", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
    { songName: "Dil Ne Tumko", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
    { songName: "Tum Mile", filepath: "songs/6.mp3", coverpath: "covers/6.jpg" },
    { songName: "Raabta", filepath: "songs/7.mp3", coverpath: "covers/7.jpg" },
    { songName: "Phir Le Aaya Dil", filepath: "songs/8.mp3", coverpath: "covers/8.jpg" },
    { songName: "Tum Hi Ho", filepath: "songs/9.mp3", coverpath: "covers/9.jpg" },
    { songName: "Samjhawan", filepath: "songs/10.mp3", coverpath: "covers/10.jpg" }
];

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;

})

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    // Update seekbar
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('input', () => {
    const seekTime = (myProgressBar.value * audioElement.duration) / 100;
    audioElement.currentTime = seekTime;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt( e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
    songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
    songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})