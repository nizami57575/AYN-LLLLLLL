// Ulduzları avtomatik yaradan kod
function createStars() {
    const bg = document.getElementById('starsBg');
    if(!bg) return;
    for (let i = 0; i < 40; i++) {
        const star = document.createElement('div');
        star.className = 'star-glow';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.animationDelay = Math.random() * 2 + 's';
        bg.appendChild(star);
    }
}
createStars();

// SIFIRDAN YAZILMIŞ ETIBARLI KONFETI (SALÜT) FUNKSİYASI
function customConfettiEffect() {
    const colors = ['#ff477e', '#8a2be2', '#00b4d8', '#ffbe0b', '#ffffff'];
    for (let i = 0; i < 100; i++) {
        const p = document.createElement('div');
        p.className = 'custom-confetti';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = (Math.random() * -20) + 'px';
        p.style.width = (Math.random() * 6 + 6) + 'px';
        p.style.height = p.style.width;
        p.style.animationDelay = (Math.random() * 1.5) + 's';
        p.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(p);
        
        setTimeout(() => { p.remove(); }, 3500);
    }
}

// "Sürprizi Başlat" klik triggeri
document.getElementById('startBtn').addEventListener('click', () => {
    const overlay = document.getElementById('welcomeOverlay');
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 500);

    // Səsin oxunması
    const myVoiceAudio = document.getElementById('myVoice');
    if (myVoiceAudio) {
        myVoiceAudio.play().catch(err => {
            console.log("Ses faylı hələ yüklənməyib, ehtiyat səsə keçilir.");
            playBackupTTS();
        });
    }

    // Musiqinin oxunması
    const music = document.getElementById('bgMusic');
    if (music) {
        music.play().catch(err => console.log("Musiqi başlamadı"));
    }

    startSpaceElements();
    customConfettiEffect();
});

document.getElementById('aiVoiceBtn').addEventListener('click', () => {
    const myVoiceAudio = document.getElementById('myVoice');
    if (myVoiceAudio) {
        myVoiceAudio.currentTime = 0;
        myVoiceAudio.play().catch(() => playBackupTTS());
    }
});

function playBackupTTS() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance("Bu da sənə Nizamidən kiçik bir sürpriz!");
        speech.lang = 'tr-TR';
        window.speechSynthesis.speak(speech);
    }
}

function startSpaceElements() {
    const bg = document.getElementById('bgAnimation');
    if(!bg) return;
    const spaceEmojis = ['🎈', '✨', '💖', '🔮', '🛸', '🌸'];
    
    setInterval(() => {
        const item = document.createElement('div');
        item.className = 'space-item';
        item.innerText = spaceEmojis[Math.floor(Math.random() * spaceEmojis.length)];
        item.style.left = Math.random() * 100 + 'vw';
        item.style.fontSize = (Math.random() * 1.2 + 1) + 'rem';
        item.style.animationDuration = (Math.random() * 3 + 5) + 's'; 
        bg.appendChild(item);
        setTimeout(() => { item.remove(); }, 8000);
    }, 600);
}

document.getElementById('celebrateBtn').addEventListener('click', () => {
    customConfettiEffect();
});

let blownOut = false;
document.getElementById('cakeIcon').addEventListener('click', function() {
    const f1 = document.getElementById('flame1');
    const f2 = document.getElementById('flame2');
    if (!blownOut) {
        this.innerText = '🍰';
        f1.style.display = 'none';
        f2.style.display = 'none';
        document.getElementById('candleStatus').innerText = 'Uraaa! Aynil 12 yaşın bütün şamlarını söndürdü! 🥳✨';
        blownOut = true;
        customConfettiEffect();
    } else {
        this.innerText = '🎂';
        f1.style.display = 'block';
        f2.style.display = 'block';
        document.getElementById('candleStatus').innerText = 'Şamlar yenidən yandırıldı! 🕯️';
        blownOut = false;
    }
});

const quizButtons = document.querySelectorAll('.quiz-btn');
quizButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const isCorrect = this.getAttribute('data-correct') === 'true';
        const feedback = document.getElementById('quizFeedback');
        if (isCorrect) {
            feedback.innerText = "Tamamilə Doğrudur! Aynilin artıq 12 yaşı tamam olur! 😍🎂";
            feedback.style.color = "#00b4d8";
            customConfettiEffect();
        } else {
            feedback.innerText = "Xeyr, düzgün deyil! Yaxşı düşün! 😉";
            feedback.style.color = "#ff477e";
        }
    });
});

const spaceWishes = [
    "Bu il sənə dərslərində ən yüksək zirvələri və uğurları gətirsin! 📚✨",
    "Ulduzlar qədər parlaq və şanslı bir gələcəyin olsun! 🌟🔮",
    "12-ci yaşında tutduğun bütün möhtəşəm arzuların çin olsun! 🎈🎀",
    "Ailənin və dostlarının fəxri, daim gülərüz və xoşbəxt olasan! 😊💕"
];

document.getElementById('wishBtn').addEventListener('click', () => {
    const randomWish = spaceWishes[Math.floor(Math.random() * spaceWishes.length)];
    document.getElementById('wishResult').innerText = randomWish;
});

let count = 0;
document.getElementById('sendHeartBtn').addEventListener('click', () => {
    count++;
    document.getElementById('heartCount').innerText = count;
    customConfettiEffect();
});

const bgMusic = document.getElementById('bgMusic');
document.getElementById('toggleMusicBtn').addEventListener('click', function() {
    if (bgMusic.paused) {
        bgMusic.play();
        this.innerText = '⏸️';
        document.getElementById('musicStatus').innerText = '🎵 Melodiya Aktivdir';
    } else {
        bgMusic.pause();
        this.innerText = '▶️';
        document.getElementById('musicStatus').innerText = '🔇 Melodiya Dayandırıldı';
    }
});

document.getElementById('readMoreBtn').addEventListener('click', function() {
    const text = document.getElementById('hiddenMessage');
    if (text.style.display === 'none' || text.style.display === '') {
        text.style.display = 'block';
        this.innerText = 'Qeydi Gizlə ✖️';
    } else {
        text.style.display = 'none';
        this.innerText = 'Nizamidən Özəl Mesaj 📝';
    }
});
