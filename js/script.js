// ===== CONFIGURACIÓN GLOBAL =====
const CONFIG = {
    // Rutas de contenido
    paths: {
        images: 'content/img/',
        videos: 'content/vdo/',
        audios: 'content/aud/',
        songs: 'content/sng/',
        icons: 'content/img/reproductor/'
    },
    
    // Configuración del reproductor
    player: {
        volume: 0.7,
        autoplay: false,
        loop: false
    },
    
    // Configuración de animaciones
    animations: {
        loadingDuration: 4500,
        transitionDuration: 300
    }
};

// ===== ESTADO GLOBAL =====
const STATE = {
    currentSong: 0,
    isPlaying: false,
    currentCassette: null,
    isPlaylistOpen: false,
    currentCarouselSlide: 0,
    songs: [],
    cassettes: [],
    images: [],
    videos: []
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Ocultar contenido principal inicialmente
    const mainContent = document.getElementById('main-content');
    mainContent.style.opacity = '0';
    
    // Inicializar componentes después de la animación de carga
    setTimeout(() => {
        initializeData();
        initializeMusicPlayer();
        initializeGallery();
        initializeVideos();
        initializeCassettes();
        initializePoetryBook();
        initializeLoveGame();
        initializeModals();
        initializeScrollEffects();
        initializeLoveMessages();
        initializeSpotifyPlayer();
        
        // Mostrar contenido principal
        mainContent.style.opacity = '1';
        mainContent.style.transition = 'opacity 1s ease';
    }, CONFIG.animations.loadingDuration);
}

// ===== INICIALIZACIÓN DE DATOS =====
function initializeData() {
    // Configurar canciones
    STATE.songs = [
        {
            title: 'Star Shopping',
            artist: 'Lil Peep',
            file: 'content/sng/Rpr/Lil Peep - Star Shopping.mp3',
            cover: 'content/sng/Icn/Lil Peep - Star Shopping.png'
        },
        {
            title: 'About U',
            artist: 'Lil Peep',
            file: 'content/sng/Rpr/Lil Peep - about u.mp3',
            cover: 'content/sng/Icn/Lil Peep - about u.png'
        },
        {
            title: 'Big City Blues',
            artist: 'Lil Peep',
            file: 'content/sng/Rpr/Lil Peep - big city blues.mp3',
            cover: 'content/sng/Icn/Lil Peep - big city blues.png'
        },
        {
            title: 'Feelz',
            artist: 'Lil Peep',
            file: 'content/sng/Rpr/Lil Peep- feelz.mp3',
            cover: 'content/sng/Icn/Lil Peep - feelz.png'
        },
        {
            title: 'Right Here',
            artist: 'Lil Peep',
            file: 'content/sng/Rpr/Lil Peep - right here.mp3',
            cover: 'content/sng/Icn/Lil Peep - right here.png'
        }
    ];
    
    // Configurar casetes de audio
    STATE.cassettes = [
        {
            title: 'Para cuando dudes',
            description: 'Un mensaje de amor y seguridad',
            file: 'content/aud/Audio-1.mp3'
        },
        {
            title: 'Te voy a decir amor',
            description: 'Recordando tus bellas palabras',
            file: 'content/aud/Audio-2.mp3'
        },
        {
            title: 'Cuando estés triste',
            description: 'Para alegrarte el día',
            file: 'content/aud/Audio-3.mp3'
        },
        {
            title: 'Pucheros por no contestar',
            description: 'No te enojes conmigo preciosa',
            file: 'content/aud/Audio-4.mp3'
        },
        {
            title: 'Me contestas o me contestas',
            description: 'Contestas porque yo quiero',
            file: 'content/aud/Audio-5.mp3'
        },
        {
            title: 'Si no comes no como',
            description: 'Come o me muero yo',
            file: 'content/aud/Audio-6.mp3'
        },
        {
            title: 'El borracho no miente',
            description: 'Entre el alcohol y el amor',
            file: 'content/aud/Audio-7.mp3'
        },
        {
            title: 'Te juro que te veo feo',
            description: 'Contestame bambaro',
            file: 'content/aud/Audio-8.mp3'
        }
    ];
    
    // Configurar imágenes (simuladas - en un proyecto real se cargarían dinámicamente)
    STATE.images = generateImagePaths();
    
    // Configurar videos (simulados - en un proyecto real se cargarían dinámicamente)
    STATE.videos = generateVideoPaths();
}

function generateImagePaths() {
    const folders = ['nuestras conversaciones', 'cositas juntos', 'detallitos', 'ti hermosa', 'tu y yo'];
    const images = [];
    
    folders.forEach(folder => {
        // Simulamos que cada carpeta tiene algunas imágenes
        for (let i = 1; i <= 5; i++) {
            images.push({
                src: `content/img/${folder}/imagen-${i}.jpg`,
                caption: `Momento bonito de ${folder}`,
                folder: folder
            });
        }
    });
    
    return images;
}

function generateVideoPaths() {
    const folders = ['de ti hermosa', 'nuestro aniversario', 'cosas juntos', 'nosotros'];
    const videos = [];
    
    folders.forEach(folder => {
        // Simulamos que cada carpeta tiene algunos videos
        for (let i = 1; i <= 3; i++) {
            videos.push({
                src: `content/vdo/${folder}/video-${i}.mp4`,
                thumbnail: `content/vdo/${folder}/thumb-${i}.png`,
                title: `Recuerdo ${folder}`,
                description: `Un momento especial de ${folder}`,
                folder: folder
            });
        }
    });
    
    return videos;
}

// ===== REPRODUCTOR DE MÚSICA =====
function initializeMusicPlayer() {
    const audio = document.getElementById('music-audio');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const playlistBtn = document.getElementById('playlist-btn');
    const volumeBtn = document.getElementById('volume-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const progressBar = document.getElementById('progress');
    const currentSongDisplay = document.getElementById('current-song');
    const playlist = document.getElementById('playlist');
    
    // Configurar volumen inicial
    audio.volume = CONFIG.player.volume;
    volumeSlider.value = CONFIG.player.volume * 100;
    
    // Crear playlist
    createPlaylist();
    
    // Event listeners
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', previousSong);
    nextBtn.addEventListener('click', nextSong);
    playlistBtn.addEventListener('click', togglePlaylist);
    volumeBtn.addEventListener('click', toggleMute);
    volumeSlider.addEventListener('input', changeVolume);
    
    // Eventos del audio
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    audio.addEventListener('loadedmetadata', updateSongInfo);
    
    // Cargar primera canción
    loadSong(STATE.currentSong);
}

function createPlaylist() {
    const playlistItems = document.querySelector('.playlist-items');
    playlistItems.innerHTML = '';
    
    STATE.songs.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        item.innerHTML = `
            <img src="${song.cover}" alt="${song.title}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD1cIjQwXCIgaGVpZ2h0PVwiNDBcIiB2aWV3Qm94PVwiMCAwIDQwIDQwXCIgZmlsbD1cIm5vbmVcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+PHJlY3Qgd2lkdGg9XCI0MFwiIGhlaWdodD1cIjQwXCIgZmlsbD1cIiMzMzNcIi8+PHRleHQgeD1cIjIwXCIgeT1cIjI0XCIgZm9udC1mYW1pbHk9XCJBcmlhbFwiIGZvbnQtc2l6ZT1cIjEyXCIgZmlsbD1cIiNmZmZcIiB0ZXh0LWFuY2hvcj1cIm1pZGRsZVwiPk11c2ljPC90ZXh0Pjwvc3ZnPg=='">
            <span>${song.title} - ${song.artist}</span>
        `;
        
        item.addEventListener('click', () => {
            STATE.currentSong = index;
            loadSong(index);
            if (STATE.isPlaying) {
                playAudio();
            }
            updatePlaylistSelection();
        });
        
        playlistItems.appendChild(item);
    });
    
    updatePlaylistSelection();
}

function loadSong(index) {
    const audio = document.getElementById('music-audio');
    const song = STATE.songs[index];
    
    audio.src = song.file;
    updateSongInfo();
    updatePlaylistSelection();
}

function updateSongInfo() {
    const currentSongDisplay = document.getElementById('current-song');
    const song = STATE.songs[STATE.currentSong];
    currentSongDisplay.textContent = `${song.title} - ${song.artist}`;
}

function updatePlaylistSelection() {
    const items = document.querySelectorAll('.playlist-item');
    items.forEach((item, index) => {
        item.classList.toggle('active', index === STATE.currentSong);
    });
}

function togglePlay() {
    const audio = document.getElementById('music-audio');
    const playBtn = document.getElementById('play-btn');
    const playIcon = playBtn.querySelector('img');
    
    if (STATE.isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

function playAudio() {
    const audio = document.getElementById('music-audio');
    const playBtn = document.getElementById('play-btn');
    const playIcon = playBtn.querySelector('img');
    
    audio.play().then(() => {
        STATE.isPlaying = true;
        playIcon.src = 'content/img/reproductor/pause.png';
        playIcon.alt = 'Pause';
    }).catch(error => {
        console.log('Error al reproducir:', error);
    });
}

function pauseAudio() {
    const audio = document.getElementById('music-audio');
    const playBtn = document.getElementById('play-btn');
    const playIcon = playBtn.querySelector('img');
    
    audio.pause();
    STATE.isPlaying = false;
    playIcon.src = 'content/img/reproductor/play-button.png';
    playIcon.alt = 'Play';
}

function previousSong() {
    STATE.currentSong = STATE.currentSong > 0 ? STATE.currentSong - 1 : STATE.songs.length - 1;
    loadSong(STATE.currentSong);
    if (STATE.isPlaying) {
        playAudio();
    }
}

function nextSong() {
    STATE.currentSong = STATE.currentSong < STATE.songs.length - 1 ? STATE.currentSong + 1 : 0;
    loadSong(STATE.currentSong);
    if (STATE.isPlaying) {
        playAudio();
    }
}

function togglePlaylist() {
    const playlist = document.getElementById('playlist');
    STATE.isPlaylistOpen = !STATE.isPlaylistOpen;
    playlist.classList.toggle('active', STATE.isPlaylistOpen);
}

function toggleMute() {
    const audio = document.getElementById('music-audio');
    const volumeBtn = document.getElementById('volume-btn');
    const volumeIcon = volumeBtn.querySelector('img');
    const volumeSlider = document.getElementById('volume-slider');
    
    if (audio.volume > 0) {
        audio.volume = 0;
        volumeSlider.value = 0;
        volumeIcon.src = 'content/img/reproductor/mute.png';
    } else {
        audio.volume = CONFIG.player.volume;
        volumeSlider.value = CONFIG.player.volume * 100;
        updateVolumeIcon(CONFIG.player.volume);
    }
}

function changeVolume() {
    const audio = document.getElementById('music-audio');
    const volumeSlider = document.getElementById('volume-slider');
    const volume = volumeSlider.value / 100;
    
    audio.volume = volume;
    CONFIG.player.volume = volume;
    updateVolumeIcon(volume);
}

function updateVolumeIcon(volume) {
    const volumeBtn = document.getElementById('volume-btn');
    const volumeIcon = volumeBtn.querySelector('img');
    
    if (volume === 0) {
        volumeIcon.src = 'content/img/reproductor/mute.png';
    } else if (volume < 0.3) {
        volumeIcon.src = 'content/img/reproductor/low-volume.png';
    } else if (volume < 0.7) {
        volumeIcon.src = 'content/img/reproductor/medium-volume.png';
    } else {
        volumeIcon.src = 'content/img/reproductor/volume-up.png';
    }
}

function updateProgress() {
    const audio = document.getElementById('music-audio');
    const progressBar = document.getElementById('progress');
    
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

// ===== GALERÍA DE IMÁGENES =====
function initializeGallery() {
    createCarousel();
    createPolaroidGrid();
    initializeCarouselControls();
}

function createCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    
    // Usar las primeras 5 imágenes para el carrusel principal
    const mainImages = STATE.images.slice(0, 5);
    
    mainImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `
            <img src="${image.src}" alt="${image.caption}" 
                 onclick="openLightbox('${image.src}', '${image.caption}')"
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD1cIjQwMFwiIGhlaWdodD1cIjQwMFwiIHZpZXdCb3g9XCIwIDAgNDAwIDQwMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxyZWN0IHdpZHRoPVwiNDAwXCIgaGVpZ2h0PVwiNDAwXCIgZmlsbD1cIiMzMzNcIi8+PHRleHQgeD1cIjIwMFwiIHk9XCIyMDBcIiBmb250LWZhbWlseT1cIkFyaWFsXCIgZm9udC1zaXplPVwiMjRcIiBmaWxsPVwiI2ZmZlwiIHRleHQtYW5jaG9yPVwibWlkZGxlXCIgZG9taW5hbnQtYmFzZWxpbmU9XCJjZW50cmFsXCI+SW1hZ2VuPC90ZXh0Pjwvc3ZnPg=='">
        `;
        carouselTrack.appendChild(slide);
    });
}

function createPolaroidGrid() {
    const polaroidGrid = document.getElementById('polaroid-grid');
    
    // Usar todas las imágenes para la cuadrícula de polaroids
    STATE.images.forEach((image, index) => {
        const polaroid = document.createElement('div');
        polaroid.className = 'polaroid';
        
        // Rotación aleatoria para efecto natural
        const rotation = (Math.random() - 0.5) * 20; // Entre -10 y 10 grados
        polaroid.style.setProperty('--rotation', `${rotation}deg`);
        
        polaroid.innerHTML = `
            <img src="${image.src}" alt="${image.caption}"
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD1cIjI1MFwiIGhlaWdodD1cIjIwMFwiIHZpZXdCb3g9XCIwIDAgMjUwIDIwMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxyZWN0IHdpZHRoPVwiMjUwXCIgaGVpZ2h0PVwiMjAwXCIgZmlsbD1cIiMzMzNcIi8+PHRleHQgeD1cIjEyNVwiIHk9XCIxMDBcIiBmb250LWZhbWlseT1cIkFyaWFsXCIgZm9udC1zaXplPVwiMThcIiBmaWxsPVwiI2ZmZlwiIHRleHQtYW5jaG9yPVwibWlkZGxlXCIgZG9taW5hbnQtYmFzZWxpbmU9XCJjZW50cmFsXCI+SW1hZ2VuPC90ZXh0Pjwvc3ZnPg=='">
            <div class="polaroid-caption">${image.caption}</div>
        `;
        
        polaroid.addEventListener('click', () => {
            openLightbox(image.src, image.caption);
        });
        
        polaroidGrid.appendChild(polaroid);
    });
}

function initializeCarouselControls() {
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const track = document.getElementById('carousel-track');
    
    prevBtn.addEventListener('click', () => {
        STATE.currentCarouselSlide = STATE.currentCarouselSlide > 0 ? 
            STATE.currentCarouselSlide - 1 : 4; // 5 imágenes en total
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        STATE.currentCarouselSlide = STATE.currentCarouselSlide < 4 ? 
            STATE.currentCarouselSlide + 1 : 0;
        updateCarousel();
    });
    
    // Auto-avance del carrusel
    setInterval(() => {
        STATE.currentCarouselSlide = STATE.currentCarouselSlide < 4 ? 
            STATE.currentCarouselSlide + 1 : 0;
        updateCarousel();
    }, 5000);
}

function updateCarousel() {
    const track = document.getElementById('carousel-track');
    const translateX = -STATE.currentCarouselSlide * 100;
    track.style.transform = `translateX(${translateX}%)`;
}

// ===== SECCIÓN DE VIDEOS =====
function initializeVideos() {
    const videoWall = document.getElementById('video-wall');
    
    STATE.videos.forEach((video, index) => {
        const mural = document.createElement('div');
        mural.className = 'video-mural';
        mural.innerHTML = `
            <img class="video-thumbnail" src="${video.thumbnail}" alt="${video.title}"
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD1cIjMwMFwiIGhlaWdodD1cIjIwMFwiIHZpZXdCb3g9XCIwIDAgMzAwIDIwMFwiIGZpbGw9XCJub25lXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxyZWN0IHdpZHRoPVwiMzAwXCIgaGVpZ2h0PVwiMjAwXCIgZmlsbD1cIiMzMzNcIi8+PHBvbHlnb24gcG9pbnRzPVwiMTIwLDcwIDEyMCwxMzAgMTgwLDEwMFwiIGZpbGw9XCIjZmZmXCIvPjx0ZXh0IHg9XCIxNTBcIiB5PVwiMTYwXCIgZm9udC1mYW1pbHk9XCJBcmlhbFwiIGZvbnQtc2l6ZT1cIjE0XCIgZmlsbD1cIiNmZmZcIiB0ZXh0LWFuY2hvcj1cIm1pZGRsZVwiPlZpZGVvPC90ZXh0Pjwvc3ZnPg=='">
            <video class="video-preview" muted loop>
                <source src="${video.src}" type="video/mp4">
            </video>
            <div class="video-overlay">
                <div class="play-icon">▶</div>
            </div>
            <div class="video-title">${video.title}</div>
        `;
        
        const preview = mural.querySelector('.video-preview');
        
        mural.addEventListener('mouseenter', () => {
            preview.play().catch(() => {});
        });
        
        mural.addEventListener('mouseleave', () => {
            preview.pause();
            preview.currentTime = 0;
        });
        
        mural.addEventListener('click', () => {
            openVideoModal(video.src, video.title, video.description);
        });
        
        videoWall.appendChild(mural);
    });
}

// ===== SISTEMA DE CASETES =====
function initializeCassettes() {
    createCassetteCollection();
    initializeCassettePlayer();
}

function createCassetteCollection() {
    const collection = document.getElementById('cassette-collection');
    
    STATE.cassettes.forEach((cassette, index) => {
        const item = document.createElement('div');
        item.className = 'cassette-item';
        item.innerHTML = `
            <div class="cassette-label">${cassette.title}</div>
            <div class="cassette-description">${cassette.description}</div>
        `;
        
        item.addEventListener('click', () => {
            loadCassette(index);
        });
        
        collection.appendChild(item);
    });
}

function initializeCassettePlayer() {
    const playBtn = document.getElementById('cassette-play');
    const pauseBtn = document.getElementById('cassette-pause');
    const stopBtn = document.getElementById('cassette-stop');
    const audio = document.getElementById('cassette-audio');
    
    playBtn.addEventListener('click', playCassette);
    pauseBtn.addEventListener('click', pauseCassette);
    stopBtn.addEventListener('click', stopCassette);
    
    audio.addEventListener('timeupdate', updateCassetteProgress);
    audio.addEventListener('play', startCassetteAnimation);
    audio.addEventListener('pause', stopCassetteAnimation);
    audio.addEventListener('ended', stopCassetteAnimation);
}

function loadCassette(index) {
    const cassette = STATE.cassettes[index];
    const audio = document.getElementById('cassette-audio');
    const title = document.getElementById('cassette-title');
    const items = document.querySelectorAll('.cassette-item');
    
    // Actualizar selección visual
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
    
    // Cargar audio
    audio.src = cassette.file;
    title.textContent = cassette.title;
    STATE.currentCassette = index;
    
    // Resetear progreso
    const tapeLine = document.getElementById('tape-line');
    tapeLine.style.width = '0%';
}

function playCassette() {
    const audio = document.getElementById('cassette-audio');
    
    if (STATE.currentCassette !== null) {
        audio.play().catch(error => {
            console.log('Error al reproducir casete:', error);
        });
    }
}

function pauseCassette() {
    const audio = document.getElementById('cassette-audio');
    audio.pause();
}

function stopCassette() {
    const audio = document.getElementById('cassette-audio');
    audio.pause();
    audio.currentTime = 0;
    
    const tapeLine = document.getElementById('tape-line');
    tapeLine.style.width = '0%';
}

function updateCassetteProgress() {
    const audio = document.getElementById('cassette-audio');
    const tapeLine = document.getElementById('tape-line');
    
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        tapeLine.style.width = `${progress}%`;
    }
}

function startCassetteAnimation() {
    const leftReel = document.getElementById('left-reel');
    const rightReel = document.getElementById('right-reel');
    
    leftReel.classList.add('spinning');
    rightReel.classList.add('spinning');
}

function stopCassetteAnimation() {
    const leftReel = document.getElementById('left-reel');
    const rightReel = document.getElementById('right-reel');
    
    leftReel.classList.remove('spinning');
    rightReel.classList.remove('spinning');
}

// ===== MODALES =====
function initializeModals() {
    // Lightbox para imágenes
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Modal para videos
    const videoModal = document.getElementById('video-modal');
    const videoModalClose = videoModal.querySelector('.modal-close');
    
    videoModalClose.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // Cerrar modales con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeVideoModal();
        }
    });
}

function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const captionEl = document.getElementById('lightbox-caption');
    
    img.src = src;
    captionEl.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openVideoModal(src, title, description) {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');
    const descriptionEl = document.getElementById('video-description');
    
    video.src = src;
    descriptionEl.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');
    
    modal.classList.remove('active');
    video.pause();
    video.src = '';
    document.body.style.overflow = 'auto';
}

// ===== EFECTOS DE SCROLL =====
function initializeScrollEffects() {
    // Smooth scroll para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observar secciones
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// ===== UTILIDADES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', function(e) {
    console.log('Error capturado:', e.error);
    // En un entorno de producción, aquí se podría enviar el error a un servicio de logging
});

// ===== RESPONSIVE HANDLERS =====
window.addEventListener('resize', debounce(() => {
    // Ajustar reproductor en móviles
    const musicPlayer = document.getElementById('music-player');
    if (window.innerWidth <= 768) {
        musicPlayer.style.position = 'fixed';
        musicPlayer.style.top = '10px';
        musicPlayer.style.left = '10px';
        musicPlayer.style.right = '10px';
        musicPlayer.style.transform = 'none';
    } else {
        musicPlayer.style.position = 'fixed';
        musicPlayer.style.top = '20px';
        musicPlayer.style.left = '50%';
        musicPlayer.style.right = 'auto';
        musicPlayer.style.transform = 'translateX(-50%)';
    }
}, 250));

// ===== INICIALIZACIÓN DE EVENTOS GLOBALES =====
// Prevenir clic derecho en imágenes (opcional)
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Manejar visibilidad de la página
document.addEventListener('visibilitychange', function() {
    const audio = document.getElementById('music-audio');
    const cassetteAudio = document.getElementById('cassette-audio');
    
    if (document.hidden) {
        // Pausar audios cuando la página no es visible
        if (!audio.paused) {
            audio.pause();
            STATE.wasPlayingMusic = true;
        }
        if (!cassetteAudio.paused) {
            cassetteAudio.pause();
            STATE.wasPlayingCassette = true;
        }
    } else {
        // Reanudar si estaba reproduciéndose
        if (STATE.wasPlayingMusic) {
            audio.play();
            STATE.wasPlayingMusic = false;
        }
        if (STATE.wasPlayingCassette) {
            cassetteAudio.play();
            STATE.wasPlayingCassette = false;
        }
    }
});


// ===== LIBRO DE POESÍA =====
function initializePoetryBook() {
    const bookCover = document.getElementById('bookCover');
    const bookPages = document.getElementById('bookPages');
    const bookControls = document.querySelector('.book-controls');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    
    let currentPage = 1;
    const totalPages = 4;
    let bookOpen = false;
    
    // Actualizar indicadores
    if (totalPagesSpan) totalPagesSpan.textContent = totalPages;
    
    // Abrir libro al hacer clic en la portada
    if (bookCover) {
        bookCover.addEventListener('click', function() {
            if (!bookOpen) {
                bookCover.style.display = 'none';
                bookPages.classList.add('open');
                bookControls.classList.add('show');
                bookOpen = true;
                showPage(1);
            }
        });
    }
    
    // Navegación de páginas
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        });
    }
    
    function showPage(pageNum) {
        const pages = document.querySelectorAll('.page');
        
        // Ocultar todas las páginas
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Mostrar página actual
        const targetPage = document.querySelector(`[data-page="${pageNum}"]`);
        if (targetPage) {
            setTimeout(() => {
                targetPage.classList.add('active');
                
                // Reiniciar animaciones de versos
                const verses = targetPage.querySelectorAll('.verse');
                verses.forEach((verse, index) => {
                    verse.style.animation = 'none';
                    setTimeout(() => {
                        verse.style.animation = `verseFadeIn 0.8s ease-out forwards`;
                        verse.style.animationDelay = `${0.5 + (index * 0.2)}s`;
                    }, 50);
                });
            }, 100);
        }
        
        // Actualizar indicadores
        if (currentPageSpan) currentPageSpan.textContent = pageNum;
        
        // Actualizar botones
        if (prevBtn) prevBtn.disabled = pageNum === 1;
        if (nextBtn) nextBtn.disabled = pageNum === totalPages;
    }
}

// ===== JUEGO DEL AMOR =====
function initializeLoveGame() {
    const startBtn = document.getElementById('startGame');
    const resetBtn = document.getElementById('resetGame');
    const gameBoard = document.getElementById('gameBoard');
    const scoreValue = document.getElementById('gameScore');
    const gameMessage = document.getElementById('gameMessage');
    const loveMessages = document.getElementById('loveMessages');
    
    let gameActive = false;
    let score = 0;
    let heartsFound = 0;
    let gameInterval;
    let heartTimeout;
    
    const loveMessagesList = [
        {
            title: "Primer Corazón",
            message: "Desde el primer día que te vi, supe que eras especial. Tu sonrisa iluminó mi mundo."
        },
        {
            title: "Segundo Corazón",
            message: "Cada momento contigo es un regalo. Eres mi inspiración y mi felicidad."
        },
        {
            title: "Tercer Corazón",
            message: "Tu risa es mi melodía favorita. Contigo, cada día es una nueva aventura."
        },
        {
            title: "Cuarto Corazón",
            message: "Eres mi refugio en las tormentas y mi luz en la oscuridad."
        },
        {
            title: "Quinto Corazón",
            message: "Tu amor me ha transformado. Contigo soy la mejor versión de mí mismo."
        },
        {
            title: "Sexto Corazón",
            message: "Cada 'te amo' que te digo sale desde lo más profundo de mi alma."
        },
        {
            title: "Séptimo Corazón",
            message: "Eres mi compañera de vida, mi mejor amiga, mi todo."
        },
        {
            title: "Octavo Corazón",
            message: "Contigo he aprendido que el amor verdadero sí existe."
        },
        {
            title: "Noveno Corazón",
            message: "Tu presencia hace que todo tenga sentido. Eres mi hogar."
        },
        {
            title: "Décimo Corazón",
            message: "Prometo amarte hoy, mañana y por toda la eternidad."
        },
        {
            title: "Undécimo Corazón",
            message: "Eres el amor de mi vida, mi alma gemela, mi destino."
        },
        {
            title: "Último Corazón",
            message: "Gracias por existir, por amarme y por hacer de mi vida un cuento de hadas."
        }
    ];
    
    if (startBtn) {
        startBtn.addEventListener('click', startGame);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetGame);
    }
    
    function startGame() {
        gameActive = true;
        score = 0;
        heartsFound = 0;
        
        startBtn.style.display = 'none';
        resetBtn.style.display = 'inline-block';
        
        updateScore();
        updateMessage("¡Encuentra los corazones que aparecen!");
        
        // Limpiar mensajes anteriores
        if (loveMessages) {
            loveMessages.innerHTML = '';
        }
        
        // Comenzar a generar corazones
        generateHeart();
        
        gameInterval = setInterval(() => {
            if (gameActive && heartsFound < 12) {
                generateHeart();
            }
        }, 2000);
    }
    
    function generateHeart() {
        if (!gameActive || !gameBoard) return;
        
        const heart = document.createElement('div');
        heart.className = 'game-heart';
        heart.innerHTML = '♥';
        
        // Posición aleatoria
        const boardRect = gameBoard.getBoundingClientRect();
        const maxX = boardRect.width - 40;
        const maxY = boardRect.height - 40;
        
        heart.style.left = Math.random() * maxX + 'px';
        heart.style.top = Math.random() * maxY + 'px';
        
        // Evento de clic
        heart.addEventListener('click', function() {
            if (!gameActive) return;
            
            heart.classList.add('clicked');
            heartsFound++;
            score += 100;
            
            updateScore();
            showLoveMessage(heartsFound - 1);
            
            setTimeout(() => {
                heart.remove();
            }, 600);
            
            if (heartsFound >= 12) {
                endGame();
            }
        });
        
        gameBoard.appendChild(heart);
        
        // Remover corazón después de 4 segundos si no se hace clic
        setTimeout(() => {
            if (heart.parentNode && !heart.classList.contains('clicked')) {
                heart.remove();
            }
        }, 4000);
    }
    
    function showLoveMessage(index) {
        if (!loveMessages || index >= loveMessagesList.length) return;
        
        const messageData = loveMessagesList[index];
        const messageDiv = document.createElement('div');
        messageDiv.className = 'love-message';
        messageDiv.innerHTML = `
            <h4>${messageData.title}</h4>
            <p>${messageData.message}</p>
        `;
        
        loveMessages.appendChild(messageDiv);
        
        // Scroll suave hacia el mensaje
        setTimeout(() => {
            messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
    
    function updateScore() {
        if (scoreValue) {
            scoreValue.textContent = heartsFound;
        }
    }
    
    function updateMessage(text) {
        if (gameMessage) {
            gameMessage.textContent = text;
        }
    }
    
    function endGame() {
        gameActive = false;
        clearInterval(gameInterval);
        
        updateMessage("¡Felicidades! Has encontrado todos los corazones");
        
        // Mostrar mensaje de completado
        setTimeout(() => {
            const completeDiv = document.createElement('div');
            completeDiv.className = 'game-complete';
            completeDiv.innerHTML = `
                <h3>¡Juego Completado!</h3>
                <p>Has encontrado todos los corazones y descubierto todos mis mensajes de amor. Eres increíble, mi amor. ♥</p>
            `;
            
            if (loveMessages) {
                loveMessages.appendChild(completeDiv);
                completeDiv.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1000);
    }
    
    function resetGame() {
        gameActive = false;
        clearInterval(gameInterval);
        
        // Limpiar tablero
        if (gameBoard) {
            gameBoard.innerHTML = '';
        }
        
        // Limpiar mensajes
        if (loveMessages) {
            loveMessages.innerHTML = '';
        }
        
        // Resetear valores
        score = 0;
        heartsFound = 0;
        
        updateScore();
        updateMessage("¡Haz clic en los corazones que aparecen!");
        
        // Mostrar botón de inicio
        startBtn.style.display = 'inline-block';
        resetBtn.style.display = 'none';
     }
}

// ===== MENSAJES DE AMOR EMERGENTES =====
function initializeLoveMessages() {
    const heartsContainer = document.getElementById('floatingHeartsContainer');
    const messagesFoundSpan = document.getElementById('messagesFound');
    const totalMessagesSpan = document.getElementById('totalMessages');
    
    let messagesFound = 0;
    const totalMessages = 15;
    let heartInterval;
    
    const loveMessages = [
        {
            title: "Mi Primer Pensamiento",
            message: "Cada mañana al despertar, lo primero que viene a mi mente eres tú. Tu sonrisa es el sol que ilumina mis días."
        },
        {
            title: "Tu Risa",
            message: "Tu risa es la melodía más hermosa que he escuchado. Haría cualquier cosa por escucharla todos los días de mi vida."
        },
        {
            title: "Tus Ojos",
            message: "En tus ojos veo mi futuro, veo nuestros sueños, veo el amor más puro que existe. Son mi refugio y mi hogar."
        },
        {
            title: "Nuestros Momentos",
            message: "Cada segundo contigo es un tesoro que guardo en mi corazón. Nuestros momentos juntos son mi mayor felicidad."
        },
        {
            title: "Tu Abrazo",
            message: "En tus brazos encuentro la paz que mi alma necesita. Eres mi refugio en este mundo tan caótico."
        },
        {
            title: "Mi Inspiración",
            message: "Eres mi musa, mi inspiración. Gracias a ti he descubierto que el amor verdadero sí existe."
        },
        {
            title: "Nuestro Futuro",
            message: "Sueño con un futuro a tu lado, construyendo juntos una historia de amor que trascienda el tiempo."
        },
        {
            title: "Tu Fortaleza",
            message: "Admiro tu fuerza, tu valentía, tu forma de enfrentar la vida. Eres una mujer increíble y me siento afortunado de tenerte."
        },
        {
            title: "Mi Gratitud",
            message: "Gracias por elegirme, por amarme, por ser parte de mi vida. Eres el mejor regalo que me ha dado el destino."
        },
        {
            title: "Tu Bondad",
            message: "Tu corazón es puro, lleno de amor y bondad. Cada día aprendo algo nuevo de ti y me enamoro más."
        },
        {
            title: "Nuestras Conversaciones",
            message: "Podría hablar contigo por horas y nunca me cansaría. Eres mi mejor amiga, mi confidente, mi todo."
        },
        {
            title: "Tu Apoyo",
            message: "En mis momentos más difíciles, siempre has estado ahí. Tu apoyo incondicional es mi mayor fortaleza."
        },
        {
            title: "Mi Promesa Eterna",
            message: "Te prometo amarte con la misma intensidad hoy, mañana y por toda la eternidad. Eres mi para siempre."
        },
        {
            title: "Tu Esencia",
            message: "Eres única, especial, irreemplazable. No existe nadie como tú en este mundo, y me siento bendecido de conocerte."
        },
        {
            title: "Mi Declaración Final",
            message: "Te amo con cada fibra de mi ser, con cada latido de mi corazón. Eres mi vida, mi amor, mi todo. Gracias por existir."
        }
    ];
    
    if (totalMessagesSpan) totalMessagesSpan.textContent = totalMessages;
    
    // Crear modal para mensajes
    createLoveMessageModal();
    
    // Generar corazones flotantes
    function generateFloatingHeart() {
        if (!heartsContainer || messagesFound >= totalMessages) return;
        
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '♥';
        
        // Posición aleatoria
        const containerRect = heartsContainer.getBoundingClientRect();
        const maxX = containerRect.width - 50;
        const maxY = containerRect.height - 50;
        
        heart.style.left = Math.random() * maxX + 'px';
        heart.style.top = Math.random() * maxY + 'px';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        // Evento de clic
        heart.addEventListener('click', function() {
            if (messagesFound < totalMessages) {
                heart.classList.add('clicked');
                showLoveMessage(loveMessages[messagesFound]);
                messagesFound++;
                updateMessageCounter();
                
                setTimeout(() => {
                    heart.remove();
                }, 800);
            }
        });
        
        heartsContainer.appendChild(heart);
        
        // Remover corazón después de 8 segundos si no se hace clic
        setTimeout(() => {
            if (heart.parentNode && !heart.classList.contains('clicked')) {
                heart.remove();
            }
        }, 8000);
    }
    
    function updateMessageCounter() {
        if (messagesFoundSpan) {
            messagesFoundSpan.textContent = messagesFound;
        }
        
        if (messagesFound >= totalMessages) {
            clearInterval(heartInterval);
            setTimeout(() => {
                showCompletionMessage();
            }, 2000);
        }
    }
    
    function showCompletionMessage() {
        const completionMessage = {
            title: "¡Felicidades!",
            message: "Has descubierto todos mis mensajes de amor. Cada palabra sale desde lo más profundo de mi corazón. Te amo infinitamente, mi amor. ♥♥♥"
        };
        showLoveMessage(completionMessage);
    }
    
    // Iniciar generación de corazones
    heartInterval = setInterval(generateFloatingHeart, 3000);
    generateFloatingHeart(); // Primer corazón inmediato
}

function createLoveMessageModal() {
    const modal = document.createElement('div');
    modal.className = 'love-message-modal';
    modal.id = 'loveMessageModal';
    
    modal.innerHTML = `
        <div class="love-message-content">
            <span class="love-message-close" id="loveMessageClose">&times;</span>
            <h3 class="love-message-title" id="loveMessageTitle"></h3>
            <p class="love-message-text" id="loveMessageText"></p>
            <div class="love-message-hearts">♥ ♥ ♥</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Eventos de cierre
    const closeBtn = modal.querySelector('#loveMessageClose');
    closeBtn.addEventListener('click', closeLoveMessage);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeLoveMessage();
        }
    });
}

function showLoveMessage(messageData) {
    const modal = document.getElementById('loveMessageModal');
    const title = document.getElementById('loveMessageTitle');
    const text = document.getElementById('loveMessageText');
    
    if (modal && title && text) {
        title.textContent = messageData.title;
        text.textContent = messageData.message;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeLoveMessage() {
    const modal = document.getElementById('loveMessageModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// ===== REPRODUCTOR SPOTIFY INTERACTIVO =====
function initializeSpotifyPlayer() {
    const vinylRecord = document.getElementById('vinylRecord');
    const showPlaylistBtn = document.getElementById('showPlaylist');
    const hidePlaylistBtn = document.getElementById('hidePlaylist');
    const spotifyContainer = document.getElementById('spotifyContainer');
    
    let isPlaying = false;
    
    // Evento para mostrar playlist
    if (showPlaylistBtn) {
        showPlaylistBtn.addEventListener('click', function() {
            showSpotifyPlaylist();
        });
    }
    
    // Evento para ocultar playlist
    if (hidePlaylistBtn) {
        hidePlaylistBtn.addEventListener('click', function() {
            hideSpotifyPlaylist();
        });
    }
    
    // Evento del disco de vinilo
    if (vinylRecord) {
        vinylRecord.addEventListener('click', function() {
            if (!isPlaying) {
                showSpotifyPlaylist();
            }
        });
    }
    
    function showSpotifyPlaylist() {
        if (spotifyContainer && vinylRecord && showPlaylistBtn && hidePlaylistBtn) {
            // Animar disco
            vinylRecord.classList.add('spinning');
            
            // Mostrar playlist con animación
            spotifyContainer.style.display = 'block';
            setTimeout(() => {
                spotifyContainer.classList.add('show');
            }, 100);
            
            // Cambiar botones
            showPlaylistBtn.style.display = 'none';
            hidePlaylistBtn.style.display = 'inline-block';
            
            isPlaying = true;
            
            // Scroll suave hacia la playlist
            setTimeout(() => {
                spotifyContainer.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 500);
        }
    }
    
    function hideSpotifyPlaylist() {
        if (spotifyContainer && vinylRecord && showPlaylistBtn && hidePlaylistBtn) {
            // Detener animación del disco
            vinylRecord.classList.remove('spinning');
            
            // Ocultar playlist con animación
            spotifyContainer.classList.remove('show');
            setTimeout(() => {
                spotifyContainer.style.display = 'none';
            }, 500);
            
            // Cambiar botones
            hidePlaylistBtn.style.display = 'none';
            showPlaylistBtn.style.display = 'inline-block';
            
            isPlaying = false;
        }
    }
    
    // Efecto de hover en el disco
    if (vinylRecord) {
        vinylRecord.addEventListener('mouseenter', function() {
            if (!isPlaying) {
                vinylRecord.style.transform = 'scale(1.05) rotate(10deg)';
            }
        });
        
        vinylRecord.addEventListener('mouseleave', function() {
            if (!isPlaying) {
                vinylRecord.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    }
}

console.log('🎵 Página de dedicatoria cargada con amor 💕');