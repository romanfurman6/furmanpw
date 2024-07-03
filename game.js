let clickCount = 0;
let timeLeft = 30;
let gameInterval;
let catEmojiClicks = 0;

console.log("Game script loaded");

// on Dom loaded
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cat-emoji').addEventListener('click', () => {
        clickCount++;
      });
      
    // Easter egg trigger
    let catLovers = '';
    document.addEventListener('keydown', (event) => {
        catLovers += event.key;
        if (catLovers.includes('catlovers')) {
            startGame();
            catLovers = '';
        }
    });
    document.getElementById('cat-emoji').addEventListener('click', handleCatEmojiClick);
});

function handleCatEmojiClick(event) {
    event.preventDefault();
    catEmojiClicks++;
    console.log('Cat emoji clicked');
    
    const catEmoji = document.getElementById('cat-emoji');
    catEmoji.classList.add('flying');
    
    // Make the emoji bigger
    catEmoji.style.fontSize = '3em';
    
    flyEmoji(catEmoji);

    if (catEmojiClicks >= 3) {

        setTimeout(() => {
            startGame();
        }, 500);
        catEmojiClicks = 0; // Reset for next time
    }
}

function flyEmoji(emoji) {
    const maxX = window.innerWidth - emoji.offsetWidth;
    const maxY = window.innerHeight - emoji.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    emoji.style.left = `${randomX}px`;
    emoji.style.top = `${randomY}px`;

    // Add a random rotation for fun
    const rotation = Math.random() * 360;
    emoji.style.transform = `rotate(${rotation}deg)`;
}

function startGame() {
    document.getElementById('cat-emoji').addEventListener('click', handleGameClick);
}

function handleGameClick() {
    clickCount++;
    flyEmoji(this);
}

function endGame() {
    clearInterval(gameInterval);
    const catEmoji = document.getElementById('cat-emoji');
    catEmoji.removeEventListener('click', handleGameClick);
    catEmoji.classList.remove('flying');
    catEmoji.style.fontSize = '';
    catEmoji.style.transform = 'none';
    catEmoji.style.position = 'static';
    alert(`Game over! You clicked the cat emoji ${clickCount} times.`);
    resetGame();
}

function resetGame() {
    clickCount = 0;
    timeLeft = 30;
    document.getElementById('time-left').textContent = timeLeft;
    document.getElementById('cat-game').classList.add('hidden');
}
