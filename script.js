// SEHRlİ ARXA FONDA ULDUZLARI YARADAN AVTOMATİK SİSTEM
function createStars() {
    const bg = document.getElementById('starsBg');
    for (let i = 0; i < 60; i++) {
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

// SÜRPRİZİ BAŞLAT DÜYMƏSİNƏ KLİKLƏDİKDƏ
document.getElementById('startBtn').addEventListener('click', () => {
    // 1. Giriş pəncərəsini bağla
    const overlay = document.getElementById('welcomeOverlay');
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 600);

    // 2. ÖZ SƏSİNİ OKUTMA SİSTEMİ (Sənin yüklədiyin ses.mp3 burda işə düşür)
    const myVoiceAudio = document.getElementById('myVoice');
    myVoiceAudio.play().catch(err => {
        console.log("Səs faylı tapılmadı və ya brauzer blokladı, sistem avtomatik TTS-ə keçir.");
        // Əgər ses.mp3 hələ yükləməmisənsə, sistem xəta verməsin deyə avtomatik robot səs danışacaq:
        playBackupTTS();
    });

    // 3. Arxa fon musiqisini başlat
    const music = document.getElementById('bgMusic');
    music.play().catch(err => console.log("Musiqi başlamadı: ", err));

    // 4. Kosmik elementlər və şarları uçurtmağa başla
    startSpaceElements();

    // 5. İlk giriş anında möhtəşəm konfeti partlayışı
    triggerMegaConfetti();
});

// Səsi yenidən dinləmə düyməsi
document.getElementById('aiVoiceBtn').addEventListener('click', () => {
    const myVoiceAudio = document.getElementById('myVoice');
    myVoiceAudio.currentTime = 0;
    myVoiceAudio.play().catch(() => playBackupTTS());
});

// Əgər ses.mp3 yüklənməyibsə işləyəcək ehtiyat səs mühərriki
function playBackupTTS() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance("Bu da sənə Nizamidən kiçik bir sürpriz!");
        speech.lang = 'tr-TR';
        speech.pitch = 1.1;
        speech.rate = 0.9;
        window.speechSynthesis.speak(speech);
    }
}

// Arxa planda uçan şarlar, planetlər və kosmik ürəklər
function startSpaceElements() {
    const bg = document.getElementById('bgAnimation');
    const spaceEmojis = ['🎈', '✨', '💖', '🔮', '🛸', '🌸', '💕'];
    
    setInterval(() => {
        const item = document.createElement('div');
        item.className = 'space-item';
        item.innerText = spaceEmojis[Math.floor(Math.random() * spaceEmojis.length)];
        item.style.left = Math.random() * 100 + 'vw';
        item.style.fontSize = (Math.random() * 1.5 + 1.2) + 'rem';
        item.style.animationDuration = (Math.random() * 4 + 5) + 's'; 
        bg.appendChild(item);

        setTimeout(() => { item.remove(); }, 9000);
    }, 450);
}

// Konfeti Partlayışı
function triggerMegaConfetti() {
    confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 }, colors: ['#ff477e', '#8a2be2', '#00b4d8', '#ffffff'] });
}

document.getElementById('celebrateBtn').addEventListener('click', () => {
    triggerMegaConfetti();
    setTimeout(() => { confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0 } }); }, 150);
    setTimeout(() => { confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1 } }); }, 300);
});

// Tort və Şam Söndürmə Effekti
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
        confetti({ particleCount: 50, spread: 60 });
    } else {
        this.innerText = '🎂';
        f1.style.display = 'block';
        f2.style.display = 'block';
        document.getElementById('candleStatus').innerText = 'Şamlar yenidən yandırıldı! 🕯️';
        blownOut = false;
    }
});

// 12 Yaş Dostluq Oyunu Mexanizmi
const quizButtons = document.querySelectorAll('.quiz-btn');
quizButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const isCorrect = this.getAttribute('data-correct') === 'true';
        const feedback = document.getElementById('quizFeedback');
        if (isCorrect) {
            feedback.innerText = "Tamamilə Doğrudur! Aynilin artıq 12 yaşı tamam olur! 😍🎂";
            feedback.style.color = "#00b4d8";
            confetti({ particleCount: 40, spread: 40 });
        } else {
            feedback.innerText = "Xeyr, düzgün deyil! Sürətli dərslər fəsli gəlir, yaxşı düşün! 😉";
            feedback.style.color = "#ff477e";
        }
    });
});

// Sehrli Kosmik Arzu Çarxı
const spaceWishes = [
    "Bu il sənə dərslərində, məktəbdə ən böyük zirvələri və uğurları gətirsin! 📚✨",
    "Ulduzlar qədər parlaq və şanslı bir gələcəyin olsun! 🌟🔮",
    "12-ci yaşında tutduğun bütün möhtəşəm arzuların çin olsun! 🎈🎀",
    "Ailənin və dostlarının fəxri, daim gülərüz və xoşbəxt olasan! 😊💕",
    "Həyat sənə hər zaman ən şirin sürprizlərini bəxş etsin! 🍰🛸"
];

document.getElementById('wishBtn').addEventListener('click', () => {
    const randomWish = spaceWishes[Math.floor(Math.random() * spaceWishes.length)];
    document.getElementById('wishResult').innerText = randomWish;
});

// Ürək Sayğacı
let count = 0;
document.getElementById('sendHeartBtn').addEventListener('click', () => {
    count++;
    document.getElementById('heartCount').innerText = count;
    confetti({ particleCount: 15, angle: 90, spread: 35, origin: { y: 0.85 }, colors: ['#ff70a6', '#8a2be2'] });
});

// Musiqini dayandırıb-başlatmaq düyməsi
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

// Nizamidən gizli qeyd
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

