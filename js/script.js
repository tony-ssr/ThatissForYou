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
        initializeModals();
        initializeScrollEffects();
        
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
    const folders = ['nuestras conversaciones', 'cositas juntos', 'detallitos', 'ti preciosa', 'tu y yo'];
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

console.log('🎵 Página de dedicatoria cargada con amor 💕');