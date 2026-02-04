// ===================================
// CONSTANTS & STATE
// ===================================
const cuteMessages = [
    "Are you sure? 🥺",
    "Think about all the fun we'll have! 🎉",
    "But... but... pretty please? 🙏",
    "You might regret this! 💔",
    "Give me another chance? 😊",
    "I promise to make you smile every day! 😄",
    "What if I told you I care about you a lot? 💕",
    "Just one more click... on YES! 😉",
    "My heart is breaking... 💔",
    "Don't you want to be loved? 💖",
    "I'll be the best Valentine ever! ⭐",
    "Come on, you know you want to! 😏",
];

let noClickCount = 0;
let yesButtonScale = 1;

// ===================================
// DOM ELEMENTS
// ===================================
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const cuteMessageEl = document.getElementById('cuteMessage');
const subtitleEl = document.getElementById('subtitle');
const mainContainer = document.getElementById('mainContainer');
const celebrationScreen = document.getElementById('celebrationScreen');
const confettiContainer = document.getElementById('confettiContainer');
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
const countdownTimer = document.getElementById('countdownTimer');

// ===================================
// COUNTDOWN TO VALENTINE'S DAY
// ===================================
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Valentine's Day is February 14
    let valentinesDay = new Date(currentYear, 1, 14); // Month is 0-indexed (1 = February)

    // If Valentine's Day has passed this year, show next year's
    if (now > valentinesDay) {
        valentinesDay = new Date(currentYear + 1, 1, 14);
    }

    const timeDiff = valentinesDay - now;

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    countdownTimer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// ===================================
// NO BUTTON BEHAVIOR
// ===================================
function moveNoButton() {
    const container = mainContainer;
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate safe boundaries (keeping button within container)
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;

    // Generate random position
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Apply position
    noBtn.style.position = 'fixed';
    noBtn.style.left = (containerRect.left + randomX) + 'px';
    noBtn.style.top = (containerRect.top + randomY) + 'px';
    noBtn.style.transition = 'all 0.3s ease';
}

function handleNoClick() {
    noClickCount++;

    // Show cute message
    const randomMessage = cuteMessages[Math.floor(Math.random() * cuteMessages.length)];
    cuteMessageEl.textContent = randomMessage;

    // Move the button
    moveNoButton();

    // Make Yes button bigger and more appealing
    yesButtonScale += 0.1;
    yesBtn.style.transform = `scale(${yesButtonScale})`;

    // Update subtitle
    if (noClickCount === 3) {
        subtitleEl.textContent = "You're making this harder than it needs to be! 😅";
    } else if (noClickCount === 5) {
        subtitleEl.textContent = "I'm not giving up on us! 💪";
    } else if (noClickCount === 8) {
        subtitleEl.textContent = "Please? I really mean it! 🥰";
    }

    // Add shake animation to No button
    noBtn.style.animation = 'shake 0.5s';
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 500);
}

// Shake animation (add to button on click)
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
}
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = shakeKeyframes;
document.head.appendChild(styleSheet);

// ===================================
// YES BUTTON BEHAVIOR
// ===================================
function handleYesClick() {
    // Hide main container
    mainContainer.style.display = 'none';

    // Show celebration screen
    celebrationScreen.classList.add('active');

    // Create confetti
    createConfetti();

    // Play celebration sound (if you add audio)
    // Note: Audio requires user interaction to play
}

// ===================================
// CONFETTI ANIMATION
// ===================================
function createConfetti() {
    const colors = ['#ff6b9d', '#ffc2d1', '#c94277', '#ff4458', '#e0b0ff', '#ffd700', '#00ffff'];
    const confettiCount = 150;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = (Math.random() * 0.5) + 's';

            // Random shapes
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }

            confettiContainer.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 20);
    }

    // Create continuous confetti for effect
    setInterval(() => {
        if (celebrationScreen.classList.contains('active')) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';

            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }

            confettiContainer.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }, 200);
}

// ===================================
// MUSIC FUNCTIONALITY
// ===================================
function handleMusicClick() {
    if (bgMusic.paused) {
        // Note: Since we don't have an actual audio file, this won't play
        // Users can add their own romantic song URL in the HTML
        bgMusic.play().catch(err => {
            console.log('Audio play failed:', err);
            alert('🎵 Add your favorite romantic song URL to the audio element in index.html to play music!');
        });
        musicBtn.textContent = '⏸️ Pause Music';
    } else {
        bgMusic.pause();
        musicBtn.textContent = '🎵 Play Our Song';
    }
}

// ===================================
// EVENT LISTENERS
// ===================================
yesBtn.addEventListener('click', handleYesClick);
noBtn.addEventListener('click', handleNoClick);
musicBtn.addEventListener('click', handleMusicClick);

// Mobile-friendly: Also trigger on hover/mouseenter for desktop
noBtn.addEventListener('mouseenter', () => {
    // Small chance to move even on hover
    if (Math.random() > 0.7) {
        moveNoButton();
    }
});

// ===================================
// TOUCH EVENTS FOR MOBILE
// ===================================
let touchStartX = 0;
let touchStartY = 0;

noBtn.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

noBtn.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    // If user tries to touch the button, move it away
    if (Math.abs(touchX - touchStartX) < 50 && Math.abs(touchY - touchStartY) < 50) {
        moveNoButton();
    }
});

// ===================================
// EASTER EGGS & SPECIAL EFFECTS
// ===================================

// Add sparkle effect to Yes button
yesBtn.addEventListener('mousemove', (e) => {
    const rect = yesBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = '#fff';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkleAnim 0.6s ease-out forwards';

    yesBtn.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 600);
});

// Sparkle animation
const sparkleKeyframes = `
@keyframes sparkleAnim {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(1) translateY(-20px);
        opacity: 0;
    }
}
`;
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = sparkleKeyframes;
document.head.appendChild(sparkleStyle);

// ===================================
// RANDOM ROMANTIC QUOTES (subtitles)
// ===================================
const romanticQuotes = [
    "I've been thinking about this for a while... 💭",
    "You make my heart skip a beat! 💓",
    "Every love story is beautiful, but ours could be my favorite! 📖",
    "You're the reason I believe in love! ✨",
    "Life is better when we're together! 🌟"
];

setInterval(() => {
    if (mainContainer.style.display !== 'none' && noClickCount < 3) {
        const randomQuote = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
        subtitleEl.textContent = randomQuote;
    }
}, 8000);

// ===================================
// CONSOLE EASTER EGG
// ===================================
console.log('%c💕 Made with Love 💕', 'font-size: 24px; color: #ff6b9d; font-weight: bold;');
console.log('%cIf you can see this, you\'re probably curious! Hope you say YES! 😊', 'font-size: 14px; color: #764ba2;');
