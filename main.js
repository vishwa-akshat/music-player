const songs = [
    {
        title: "Lost in the City Lights",
        artist: "Cosmo Sheldrake",
        cover: "./assets/cover-1.png",
        audio: "./assets/lost-in-city-lights-145038.mp3",
    },
    {
        title: "Forest Lullaby",
        artist: "Lesfm",
        cover: "./assets/cover-2.png",
        audio: "./assets/forest-lullaby-110624.mp3",
    },
];

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
    }${seconds}`;
};

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audio");
    const cover = document.getElementById("cover");
    const title = document.getElementById("title");
    const artist = document.getElementById("artist");
    const prev = document.getElementById("prev");
    const play = document.getElementById("play");
    const next = document.getElementById("next");
    const playImg = document.getElementById("play-img");
    const progressBar = document.getElementById("progress-bar");
    const durationCurrent = document.getElementById("duration-current");
    const durationFull = document.getElementById("duration-full");

    let currentSong = 0;
    audio.src = songs[currentSong].audio;
    cover.src = songs[currentSong].cover;
    title.textContent = songs[currentSong].title;
    artist.textContent = songs[currentSong].artist;
    progressBar.value = 0;

    const updateRangeBackground = () => {
        const value =
            ((progressBar.value - progressBar.min) /
                (progressBar.max - progressBar.min)) *
            100;
        progressBar.style.background = `linear-gradient(to right, var(--pink) ${value}%, var(--white) ${value}%)`;
    };

    updateRangeBackground();

    play.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playImg.src = "./assets/pause_fill.svg";
        } else {
            audio.pause();
            playImg.src = "./assets/Play_fill.svg";
        }
    });

    progressBar.addEventListener("input", () => {
        audio.currentTime = (progressBar.value * audio.duration) / 100;
        updateRangeBackground();
    });

    audio.addEventListener("timeupdate", () => {
        const progress = (audio.currentTime / audio.duration) * 100;

        progressBar.value = Math.min(progress, 100);
        const duration = Math.floor(audio.duration);
        durationFull.textContent = isNaN(duration)
            ? "0:00"
            : formatTime(duration);
        durationCurrent.textContent = formatTime(Math.floor(audio.currentTime));

        updateRangeBackground();
        if (progress >= 100) {
            updateSong((currentSong + 1) % songs.length);
        }
    });

    const updateSong = (songIndex) => {
        currentSong = songIndex;
        const song = songs[currentSong];
        audio.src = song.audio;
        cover.src = song.cover;
        title.textContent = song.title;
        artist.textContent = song.artist;
        audio.play();
    };

    prev.addEventListener("click", () => {
        updateSong((currentSong - 1 + songs.length) % songs.length);
    });

    next.addEventListener("click", () => {
        updateSong((currentSong + 1) % songs.length);
    });
});
