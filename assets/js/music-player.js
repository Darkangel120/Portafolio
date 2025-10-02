const audioPlayer = document.createElement('audio');
audioPlayer.id = 'audio-player';
audioPlayer.controls = false;
audioPlayer.autoplay = false;
document.body.appendChild(audioPlayer);

// Eventos de audio globales
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('loadedmetadata', () => {
    const pb = document.querySelector('.progress-bar');
    if (pb) pb.max = audioPlayer.duration;
});
audioPlayer.addEventListener('ended', playNextTrack);

let isPlaying = false;
let currentTrackIndex = 0;
let progressBar;

// Lista de pistas con rutas locales
const tracks = [
    { name: 'Robin Thicke - Blurred lines ft. Pharrell', src: 'assets/audio/Robin Thicke - Blurred lines ft. Pharrell.MP3' },
    { name: 'Skillet - Monster', src: 'assets/audio/Skillet - Monster.mp3' },
    { name: 'Måneskin - GOSSIP ft. Tom Morello', src: 'assets/audio/Måneskin - GOSSIP ft. Tom Morello.mp3' },
    // Agrega más canciones aquí
];

const playerBtn = document.getElementById('music-player-btn');
const playlist = document.getElementById('music-playlist');
const playlistUl = document.getElementById('playlist-ul');

function initPlaylist() {
    playlistUl.innerHTML = '';

    // Crear título del reproductor
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('playlist-title');
    titleDiv.textContent = 'Mis Gustos Musicales :)';
    playlistUl.appendChild(titleDiv);

    // Crear nombre de la canción actual
    const songNameDiv = document.createElement('div');
    songNameDiv.classList.add('current-song');
    songNameDiv.textContent = tracks[currentTrackIndex].name;
    playlistUl.appendChild(songNameDiv);

    // Crear barra de progreso
    const progressDiv = document.createElement('div');
    progressDiv.classList.add('progress-container');
    progressBar = document.createElement('input');
    progressBar.type = 'range';
    progressBar.classList.add('progress-bar');
    progressBar.min = '0';
    progressBar.max = audioPlayer.duration || 100;
    progressBar.value = audioPlayer.currentTime || 0;
    progressBar.addEventListener('input', seekTo);
    progressDiv.appendChild(progressBar);
    playlistUl.appendChild(progressDiv);

    // Crear controles de reproducción
    const controlsDiv = document.createElement('div');
    controlsDiv.classList.add('music-controls');

    const prevBtn = document.createElement('button');
    prevBtn.classList.add('control-btn');
    prevBtn.setAttribute('aria-label', 'Anterior');
    prevBtn.innerHTML = '<i class="fas fa-backward"></i>';
    prevBtn.addEventListener('click', playPreviousTrack);

    const playPauseBtn = document.createElement('button');
    playPauseBtn.classList.add('control-btn', 'play-pause-btn');
    playPauseBtn.setAttribute('aria-label', 'Reproducir/Pausar');
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    playPauseBtn.addEventListener('click', togglePlayPause);

    const nextBtn = document.createElement('button');
    nextBtn.classList.add('control-btn');
    nextBtn.setAttribute('aria-label', 'Siguiente');
    nextBtn.innerHTML = '<i class="fas fa-forward"></i>';
    nextBtn.addEventListener('click', playNextTrack);

    controlsDiv.appendChild(prevBtn);
    controlsDiv.appendChild(playPauseBtn);
    controlsDiv.appendChild(nextBtn);

    playlistUl.appendChild(controlsDiv);

    // Crear control de volumen
    const volumeDiv = document.createElement('div');
    volumeDiv.classList.add('volume-container');
    const volumeIcon = document.createElement('i');
    volumeIcon.classList.add('fas', 'fa-volume-up', 'volume-icon');
    const volumeBar = document.createElement('input');
    volumeBar.type = 'range';
    volumeBar.classList.add('volume-bar');
    volumeBar.min = '0';
    volumeBar.max = '1';
    volumeBar.step = '0.1';
    volumeBar.value = audioPlayer.volume;
    volumeBar.addEventListener('input', setVolume);
    volumeDiv.appendChild(volumeIcon);
    volumeDiv.appendChild(volumeBar);
    playlistUl.appendChild(volumeDiv);

    // Crear lista de canciones
    tracks.forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = track.name;
        li.classList.add('playlist-item');
        if (index === currentTrackIndex) {
            li.classList.add('playing');
        }
        li.addEventListener('click', () => playTrack(index));
        playlistUl.appendChild(li);
    });
}

function playTrack(index) {
    // Remover clase 'playing' de la canción anterior
    const prevLi = playlistUl.querySelector('.playlist-item.playing');
    if (prevLi) {
        prevLi.classList.remove('playing');
    }

    currentTrackIndex = index;
    audioPlayer.src = tracks[index].src;
    updateCurrentSongName();
    audioPlayer.play().catch(error => console.log('Error playing audio:', error));
    isPlaying = true;
    updateButtonIcon();
    updatePlayPauseButtonIcon();

    // Añadir clase 'playing' a la nueva canción
    const currentLi = playlistUl.querySelectorAll('.playlist-item')[index];
    if (currentLi) {
        currentLi.classList.add('playing');
    }
}

function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        isPlaying = false;
    } else {
        audioPlayer.play();
        isPlaying = true;
    }
    updateButtonIcon();
    updatePlayPauseButtonIcon();
}

function updateButtonIcon() {
    const icon = playerBtn.querySelector('i');
    icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-music';
}

function updatePlayPauseButtonIcon() {
    const playPauseBtn = playlistUl.querySelector('.music-controls .control-btn[aria-label="Reproducir/Pausar"] i');
    if (playPauseBtn) {
        playPauseBtn.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }
}

function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack(currentTrackIndex);
}

function playPreviousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentTrackIndex);
}

function togglePlaylist() {
    const isVisible = playlist.classList.contains('show');
    if (isVisible) {
        hidePlaylist();
    } else {
        showPlaylist();
    }
}

function showPlaylist() {
    playlist.classList.add('show');
    playerBtn.style.display = 'none';
    initPlaylist();
    // Cargar la canción actual sin reproducir
    audioPlayer.src = tracks[currentTrackIndex].src;
}

function hidePlaylist() {
    playlist.classList.remove('show');
    playerBtn.style.display = 'block';
}

// Cambiar evento del botón principal para mostrar/ocultar la lista
playerBtn.removeEventListener('click', togglePlayPause);
playerBtn.addEventListener('click', togglePlaylist);

// Ocultar playlist al hacer clic fuera
document.addEventListener('click', (event) => {
    if (!playerBtn.contains(event.target) && !playlist.contains(event.target)) {
        hidePlaylist();
    }
});

// Inicializar
updateButtonIcon();

function updateCurrentSongName() {
    const songNameDiv = playlistUl.querySelector('.current-song');
    if (songNameDiv) {
        songNameDiv.textContent = tracks[currentTrackIndex].name;
    }
}

function updateProgress() {
    if (progressBar && audioPlayer.duration) {
        progressBar.value = audioPlayer.currentTime;
    }
}

function seekTo() {
    if (progressBar && audioPlayer.duration) {
        audioPlayer.currentTime = progressBar.value;
    }
}

function setVolume() {
    const volumeBar = playlistUl.querySelector('.volume-bar');
    if (volumeBar) {
        audioPlayer.volume = volumeBar.value;
        const volumeIcon = playlistUl.querySelector('.volume-icon');
        if (volumeIcon) {
            if (audioPlayer.volume === 0) {
                volumeIcon.className = 'fas fa-volume-mute volume-icon';
            } else if (audioPlayer.volume < 0.5) {
                volumeIcon.className = 'fas fa-volume-down volume-icon';
            } else {
                volumeIcon.className = 'fas fa-volume-up volume-icon';
            }
        }
    }
}
