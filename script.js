const playBtn = document.getElementById('play');
const progressBar = document.getElementById('progressBar');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const forwardBtn = document.getElementById('forward');
const backwardBtn = document.getElementById('backward');
const nowBarImg = document.getElementById('currentSongImg');
const nowBarTitle = document.getElementById('currentSongTitle');
const nowBarDes = document.getElementById('currentSongDes');
const musicCards = Array.from(document.getElementsByClassName('music-card'));
const playMusicIcons = Array.from(document.getElementsByClassName('playMusic'));
const currTimeDisplay = document.getElementById('currTime');
const durTimeDisplay = document.getElementById('durTime');

let songIndex = 0; 
let audio = new Audio();
let isShuffle = false;
let isRepeat = false;


const songs = [
    { songName: 'Ghar Kab Aaoge', songDes: 'Anu Malik, Sonu Nigam', songImage: 'Spotify:1.jpg' },
    { songName: 'Sitaare Ikkis', songDes: 'Arijit Singh', songImage: 'https://github.com/yash111-ctrl/spotify.p/blob/main/2.jpg?raw=true', songPath: 'Audio/2.mp3' },
    { songName: 'Ishq Jalakar', songDes: 'Shashwat Sachdev', songImage: '3.jpg', songPath: 'Audio/3.mp3' },
    { songName: 'Nache Nache', songDes: 'Thaman S', songImage: 'spotify.p/4.jpg', songPath: 'Audio/4.mp3' },
    { songName: 'Seet Lehar', songDes: 'Seet Lehar', songImage: '5.jpg', songPath: 'Audio/5.mp3' },
    { songName: 'Darkhaast', songDes: 'Arijit Singh', songImage: '6.jpg', songPath: 'Audio/6.mp3' },
    { songName: 'Aaya Re Toofan', songDes: 'Irshad Kamil', songImage: '7.jpg', songPath: 'Audio/7.mp3' },
    { songName: 'Ram Siya Ram', songDes: 'Sachet-Parampara', songImage: '8.jpg', songPath: 'Audio/8.mp3' },
    { songName: 'Hanuman Chalisa', songDes: 'Bhaskaruni', songImage: '9.jpg', songPath: 'Audio/9.mp3' },
    { songName: 'Jaane Tu', songDes: 'Arijit Singh', songImage: '10.jpg', songPath: 'Audio/10.mp3' },
    { songName: 'Ghamand Kar', songDes: 'Sachet Tandon', songImage: '11.jpg', songPath: 'Audio/11.mp3' },
    { songName: 'Om Namo Bhagavate Vasudevaya', songDes: 'Saurabh Mittal', songImage: '12.jpg', songPath: 'Audio/12.mp3' },
    { songName: 'Aashiqui 2', songDes: 'Arijit Singh', songImage: '13.jpg', songPath: 'Audio/13.mp3' },
    { songName: 'Deewani Mastani', songDes: 'Shreya Ghoshal', songImage: '14.jpg', songPath: 'Audio/14.mp3' },
    { songName: 'Aawaara Angaara', songDes: 'Irshad Kamil', songImage: '15.jpg', songPath: 'Audio/15.mp3' },
    { songName: 'Tum Kya Mile', songDes: 'Arijit Singh', songImage: '16.jpg', songPath: 'Audio/16.mp3' },
    { songName: 'Sahiba', songDes: 'Stebin Ben,Jasleen Royal', songImage: '17.jpg', songPath: 'Audio/17.mp3' },
    { songName: 'Haanikaarak Bapu', songDes: 'Sarwar Khan', songImage: 18.jpg', songPath: 'Audio/18.mp3' }
];

function init() {
    
    musicCards.forEach((element, i) => {
        if (i < songs.length) {
            let img = element.getElementsByTagName('img')[0];
            let title = element.getElementsByClassName('img-title')[0];
            let desc = element.getElementsByClassName('img-description')[0];
            
            img.src = songs[i].songImage;
            title.innerText = songs[i].songName;
            desc.innerText = truncate(songs[i].songDes, 20); // Helper to shorten text
        }
    });

    
    loadSong(songIndex);
}

function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
}



function loadSong(index) {
    audio.src = songs[index].songPath;
    nowBarImg.src = songs[index].songImage;
    nowBarTitle.innerText = songs[index].songName;
    nowBarDes.innerText = songs[index].songDes;
    
   
    resetAllIcons();
   
    playMusicIcons[index].classList.remove('fa-circle-play');
    playMusicIcons[index].classList.add('fa-circle-pause');
}

function playSong() {
    audio.play();
    playBtn.classList.remove('fa-circle-play');
    playBtn.classList.add('fa-circle-pause');
    
   
    let cardIcon = document.getElementById(songIndex.toString());
    if(cardIcon) {
        cardIcon.classList.remove('fa-circle-play');
        cardIcon.classList.add('fa-circle-pause');
    }
}

function pauseSong() {
    audio.pause();
    playBtn.classList.add('fa-circle-play');
    playBtn.classList.remove('fa-circle-pause');
    
    
    makeAllPlays(); 
}

function togglePlay() {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
}

function nextSong() {
    if (isShuffle) {
       
        songIndex = Math.floor(Math.random() * songs.length);
    } else {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0; 
        }
    }
    loadSong(songIndex);
    playSong();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songIndex);
    playSong();
}

function resetAllIcons() {
    playMusicIcons.forEach((el) => {
        el.classList.add('fa-circle-play');
        el.classList.remove('fa-circle-pause');
    });
}

function makeAllPlays() {
    resetAllIcons();
    playBtn.classList.add('fa-circle-play');
    playBtn.classList.remove('fa-circle-pause');
}



playBtn.addEventListener('click', togglePlay);


forwardBtn.addEventListener('click', nextSong);
backwardBtn.addEventListener('click', prevSong);


playMusicIcons.forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);
        
        if (clickedIndex === songIndex && !audio.paused) {
         
            pauseSong();
        } else {
            
            songIndex = clickedIndex;
            loadSong(songIndex);
            playSong();
        }
    });
});


audio.addEventListener('timeupdate', () => {
    if(audio.duration) {
    
        let progress = parseInt((audio.currentTime / audio.duration) * 100);
        progressBar.value = progress;
        progressBar.style.background = `linear-gradient(to right, #1db954 ${progress}%, #4d4d4d ${progress}%)`;

        let curMins = Math.floor(audio.currentTime / 60);
        let curSecs = Math.floor(audio.currentTime % 60);
        if (curSecs < 10) curSecs = "0" + curSecs;
        currTimeDisplay.innerText = `${curMins}:${curSecs}`;

        let durMins = Math.floor(audio.duration / 60);
        let durSecs = Math.floor(audio.duration % 60);
        if (durSecs < 10) durSecs = "0" + durSecs;
        if (durMins || durSecs) durTimeDisplay.innerText = `${durMins}:${durSecs}`;
    }
});

progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});


audio.addEventListener('ended', () => {
    if (isRepeat) {
        audio.currentTime = 0;
        playSong();
    } else {
        nextSong();
    }
});


shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle;
    isRepeat = false; 
    shuffleBtn.classList.toggle('active-btn');
    repeatBtn.classList.remove('active-btn');
});


repeatBtn.addEventListener('click', () => {
    isRepeat = !isRepeat;
    isShuffle = false; 
    repeatBtn.classList.toggle('active-btn');
    shuffleBtn.classList.remove('active-btn');
});


init();
