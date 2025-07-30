const cursorOrb = document.querySelector('.cursor-orb');
let mouseX = 0;
let mouseY = 0;
let orbX = 0;
let orbY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateOrb() {
    orbX += (mouseX - orbX) * 0.15;
    orbY += (mouseY - orbY) * 0.15;
    
    cursorOrb.style.left = orbX - 8 + 'px';
    cursorOrb.style.top = orbY - 8 + 'px';
    
    requestAnimationFrame(animateOrb);
}
animateOrb();

document.addEventListener('mousedown', () => {
    cursorOrb.classList.add('clicked');
});

document.addEventListener('mouseup', () => {
    cursorOrb.classList.remove('clicked');
});

const clickScreen = document.getElementById('clickScreen');
const mainContent = document.getElementById('mainContent');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicControl = document.querySelector('.music-control');
const musicIcon = document.querySelector('.music-icon');

let musicPlaying = false;

clickScreen.addEventListener('click', () => {
    clickScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    
    backgroundMusic.play().then(() => {
        musicPlaying = true;
        musicIcon.classList.remove('paused');
        musicIcon.classList.add('playing');
        musicControl.classList.remove('paused');
        musicControl.classList.add('playing');
    }).catch(e => {
        console.log('Audio autoplay prevented:', e);
    });
    
    generateStars();
});

musicControl.addEventListener('click', () => {
    if (musicPlaying) {
        backgroundMusic.pause();
        musicPlaying = false;
        musicIcon.classList.remove('playing');
        musicIcon.classList.add('paused');
        musicControl.classList.remove('playing');
        musicControl.classList.add('paused');
    } else {
        backgroundMusic.play().then(() => {
            musicPlaying = true;
            musicIcon.classList.remove('paused');
            musicIcon.classList.add('playing');
            musicControl.classList.remove('paused');
            musicControl.classList.add('playing');
        }).catch(e => {
            console.log('Audio play failed:', e);
        });
    }
});

function generateStars() {
    const starsContainer = document.querySelector('.stars-container');
    const numStars = 50;
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const clientButton = button.closest('.client-button');
            const downloadUrl = clientButton.getAttribute('data-download-url');
            const clientName = clientButton.querySelector('.client-name').textContent;
            
            if (downloadUrl) {
                window.open(downloadUrl, '_blank');
                button.textContent = 'Opening...';
                setTimeout(() => {
                    button.textContent = 'Download';
                }, 300);
            }
        });
    });
    
    const clientButtons = document.querySelectorAll('.client-button');
    
    clientButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (!e.target.classList.contains('download-btn')) {
                console.log('Client info clicked:', button.querySelector('.client-name').textContent);
                
                button.style.transform = 'translateY(-1px) scale(0.98)';
                setTimeout(() => {
                    button.style.transform = 'translateY(-1px) scale(1)';
                }, 150);
            }
        });
    });
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

backgroundMusic.addEventListener('error', () => {
    console.log('Music file not found - place music.mp3 in the same directory');
});