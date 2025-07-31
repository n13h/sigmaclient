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

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('clientSearch');
    const clientButtons = document.querySelectorAll('.client-button');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            clientButtons.forEach(button => {
                const clientName = button.querySelector('.client-name').textContent.toLowerCase();
                
                const matches = clientName.includes(searchTerm);
                
                if (matches || searchTerm === '') {
                    button.style.display = 'block';
                    button.style.opacity = '1';
                    button.style.transform = 'scale(1)';
                } else {
                    button.style.opacity = '0';
                    button.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        if (!button.style.opacity || button.style.opacity === '0') {
                            button.style.display = 'none';
                        }
                    }, 200);
                }
            });
        });
        
        // Clear search on escape key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.blur();
            }
        });
    }
});

// Credits page functionality
document.addEventListener('DOMContentLoaded', () => {
    const creditsBtn = document.getElementById('creditsBtn');
    const backBtn = document.getElementById('backBtn');
    const clientsContainer = document.getElementById('clientsContainer');
    const creditsContainer = document.getElementById('creditsContainer');
    
    if (creditsBtn && backBtn && clientsContainer && creditsContainer) {
        creditsBtn.addEventListener('click', () => {
            clientsContainer.classList.add('hidden');
            creditsContainer.classList.remove('hidden');
        });
        
        backBtn.addEventListener('click', () => {
            creditsContainer.classList.add('hidden');
            clientsContainer.classList.remove('hidden');
        });
        
        // Add touch-friendly active states for credits elements
        creditsBtn.addEventListener('mousedown', () => {
            creditsBtn.style.transform = 'translateY(1px)';
        });
        
        creditsBtn.addEventListener('mouseup', () => {
            creditsBtn.style.transform = 'translateY(-1px)';
        });
        
        backBtn.addEventListener('mousedown', () => {
            backBtn.style.transform = 'translateX(-4px)';
        });
        
        backBtn.addEventListener('mouseup', () => {
            backBtn.style.transform = 'translateX(-2px)';
        });
    }
});

// YouTube Integration - Real API Implementation
document.addEventListener('DOMContentLoaded', () => {
    const YOUTUBE_CONFIG = {
        apiKey: 'AIzaSyBZpL3OQ9IL_2yad5EnuIpvylT8tQQ_nB0',
        channelHandle: '@missingjava',
        channelName: 'missingjava'
    };

    const youtubeBox = document.getElementById('youtubeBox');
    
    if (youtubeBox) {
        setTimeout(() => {
            fetchLatestVideo();
        }, 1000);
    }

    async function fetchLatestVideo() {
        try {
            // Step 1: Get channel ID from handle
            const channelId = await getChannelId();
            
            // Step 2: Get uploads playlist ID
            const uploadsPlaylistId = await getUploadsPlaylistId(channelId);
            
            // Step 3: Get latest video from uploads playlist
            const latestVideo = await getLatestVideoFromPlaylist(uploadsPlaylistId);
            
            displayVideo(latestVideo);
            
        } catch (error) {
            console.error('Error fetching YouTube video:', error);
            showYouTubeError();
        }
    }

    async function getChannelId() {
        // First try to search for the channel by name
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${YOUTUBE_CONFIG.channelName}&key=${YOUTUBE_CONFIG.apiKey}`;
        
        const response = await fetch(searchUrl);
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            return data.items[0].snippet.channelId;
        }
        
        throw new Error('Channel not found');
    }

    async function getUploadsPlaylistId(channelId) {
        const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${YOUTUBE_CONFIG.apiKey}`;
        
        const response = await fetch(channelUrl);
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            return data.items[0].contentDetails.relatedPlaylists.uploads;
        }
        
        throw new Error('Uploads playlist not found');
    }

    async function getLatestVideoFromPlaylist(playlistId) {
        const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=1&order=date&key=${YOUTUBE_CONFIG.apiKey}`;
        
        const response = await fetch(playlistUrl);
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            const video = data.items[0].snippet;
            return {
                title: video.title,
                videoId: video.resourceId.videoId,
                thumbnail: video.thumbnails.medium?.url || video.thumbnails.default.url,
                channelName: video.channelTitle,
                publishedAt: video.publishedAt
            };
        }
        
        throw new Error('No videos found in playlist');
    }

    function displayVideo(videoData) {
        const videoUrl = `https://www.youtube.com/watch?v=${videoData.videoId}`;
        const publishDate = new Date(videoData.publishedAt).toLocaleDateString();
        
        const content = `
            <div class="youtube-content">
                <div class="youtube-header">Check out ${videoData.channelName}'s newest video!</div>
                <img src="${videoData.thumbnail}" 
                     alt="${videoData.title}" 
                     class="youtube-thumbnail"
                     onerror="this.src='https://via.placeholder.com/120x68/333/fff?text=Video'">
                <div class="youtube-title">${truncateTitle(videoData.title)}</div>
                <div class="youtube-channel">@missingjava • ${publishDate}</div>
                <button class="youtube-watch-btn" onclick="window.open('${videoUrl}', '_blank')">
                    Watch Now
                </button>
            </div>
        `;
        
        youtubeBox.innerHTML = content;
        
        // Add click handler to the entire box
        youtubeBox.addEventListener('click', (e) => {
            if (!e.target.classList.contains('youtube-watch-btn')) {
                window.open(videoUrl, '_blank');
            }
        });
    }

    function truncateTitle(title) {
        if (title.length > 40) {
            return title.substring(0, 37) + '...';
        }
        return title;
    }

    function showYouTubeError() {
        youtubeBox.innerHTML = `
            <div class="youtube-loading">
                <div class="youtube-icon">⚠</div>
                <div class="youtube-error">Unable to load latest video</div>
                <div class="youtube-fallback">
                    <button class="youtube-watch-btn" onclick="window.open('https://youtube.com/@missingjava', '_blank')" style="margin-top: 10px;">
                        Visit Channel
                    </button>
                </div>
            </div>
        `;
    }

    // Debug function to test API
    window.testYouTubeAPI = async function() {
        try {
            const channelId = await getChannelId();
            console.log('Channel ID:', channelId);
            
            const uploadsPlaylistId = await getUploadsPlaylistId(channelId);
            console.log('Uploads Playlist ID:', uploadsPlaylistId);
            
            const latestVideo = await getLatestVideoFromPlaylist(uploadsPlaylistId);
            console.log('Latest Video:', latestVideo);
            
            return latestVideo;
        } catch (error) {
            console.error('API Test Error:', error);
        }
    };
});