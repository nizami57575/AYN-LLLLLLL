// SAYTA GİRƏN KİMİ SƏSLƏNƏCƏK SÜNİ İNTELLƏKT SƏS FUNKSİYASI
function playBirthdayGreeting() {
    const text = "Bu da sənə Nizamidən kiçik bir sürpriz!";
    
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Əgər köhnə səs qalıbsa sıfırla

        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'tr-TR'; // Azərbaycan dilinə ən yaxın səs mühərriki
        speech.pitch = 1.1; // Səs tonu (şirin və gənc səs)
        speech.rate = 0.9; // Aydın oxunması üçün sürət parametrləri

        window.speechSynthesis.speak(speech);
    } else {
        console.log("Brauzeriniz SpeechSynthesis dəstəkləmir.");
    }
}

// "SÜRPRİZİ BAŞLAT" düyməsinə kliklədikdə işə düşən böyük trigger
document.getElementById('startBtn').addEventListener('click', () => {
    // 1. Giriş ekranını animasiya ilə bağla
    const overlay = document.getElementById('welcomeOverlay');
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 600);

    // 2. SƏSİ dərhal səsləndir (İstifadəçi kliklədiyi üçün brauzer bloklamır!)
    playBirthdayGreeting();

    // 3. Fon musiqisini başlat
    const music = document.getElementById('bgMusic');
    music.play().catch(err => console.log("Musiqi avtomatik başlamadı: ", err));

    // 4. Çəhrayı ürəklərin uçma animasiyasını aktivləşdir
    startHeartRain();

    // 5. Giriş anında möhtəşəm konfeti partlayışı
    triggerMegaConfetti();
});

// AI Səsini yenidən dinləmək üçün mikrofon düyməsi
document.getElementById('aiVoiceBtn').addEventListener('click', () => {
    playBirthdayGreeting();
});

// Arxa fonda uçan çəhrayı ürəklər animasiyası
function startHeartRain() {
    const bg = document.getElementById('bgAnimation');
    const heartEmojis = ['💖', '💗', '🌸', '✨', '💕', '🎀'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart-pop';
        heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 1.5 + 1.2) + 'rem';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's'; 
        bg.appendChild(heart);

        setTimeout(() => { heart.remove(); }, 8000);
    }, 400);
}

// Böyük Konfeti Atəşfəşanlığı
function triggerMegaConfetti() {
    confetti({ particleCount: 180, spread: 100, origin: { y: 0.6 }, colors: ['#ff477e', '#ff85a2', '#ffccd5', '#ffffff'] });
}

document.getElementById('celebrateBtn').addEventListener('click', () => {
    triggerMegaConfetti();
    // Sağ və sol künclərdən çarpaz animasiyalar
    setTimeout(() => { confetti({ particleCount: 50, angle: 60, spread: 60, origin: { x: 0 }, colors: ['#ff477e'] }); }, 150);
    setTimeout(() => { confetti({ particleCount: 50, angle: 120, spread: 60, origin: { x: 1 }, colors: ['#ff85a2'] }); }, 300);
});

// İnteraktiv Tort - Çoxlu Şam Üfürmə Effekti
let blownOut = false;
document.getElementById('cakeIcon').addEventListener('click', function() {
    const f1 = document.getElementById('flame1');
    const f2 = document.getElementById('flame2');
    
    if (!blownOut) {
        this.innerText = '🍰';
        f1.style.display = 'none';
        f2.style.display = 'none';
        document.getElementById('candleStatus').innerText = 'Uraaa! Bütün şamlar söndü və arzun göylərə uçdu! 🌟💖';
        blownOut = true;
        confetti({ particleCount: 40, spread: 50, colors: ['#ffccd5'] });
    } else {
        this.innerText = '🎂';
        f1.style.display = 'block';
        f2.style.display = 'block';
        document.getElementById('candleStatus').innerText = 'Şamlar yenidən yandı! 🕯️';
        blownOut = false;
    }
});

// Mini Oyun / Dostluq Testi Mexanizmi
const quizButtons = document.querySelectorAll('.quiz-btn');
quizButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const isCorrect = this.getAttribute('data-correct') === 'true';
        const feedback = document.getElementById('quizFeedback');
        if (isCorrect) {
            feedback.innerText = "Düzdür! Aynilin ən şirin və uğurlu yaşıdır! 😍✨";
            feedback.style.color = "#2b9348";
            confetti({ particleCount: 30, spread: 30 });
        } else {
            feedback.innerText = "Yaxın gəldin, amma düzgün seçim bu deyil! 😉";
            feedback.style.color = "#ff477e";
        }
    });
});

// Günün Arzu Çarxı
const pinkWishes = [
    "Bu il sənə həyatının ən böyük uğurlarını və dərslərində '5' lər gətirsin! 📚💖",
    "Dünyanın ən xoşbəxt, ən şənd və ən şanslı qızı sən olasan! 🍀🌸",
    "Ürəyində tutduğun bütün gizli arzular bu il gerçəyə çevrilsin! ✨🎀",
    "Ətrafındakı hər kəsə daim belə gözəl enerji və sevinc bəxş edəsən! 😊💕",
    "Həyat sənə hər zaman şirin sürprizlər və möhkəm can sağlığı versin! 🍰👑"
];

document.getElementById('wishBtn').addEventListener('click', () => {
    const randomWish = pinkWishes[Math.floor(Math.random() * pinkWishes.length)];
    document.getElementById('wishResult').innerText = randomWish;
});

// Ürək Göndərmə Düyməsi (Kliklədikcə ekrana ürək fırladır)
let count = 0;
document.getElementById('sendHeartBtn').addEventListener('click', () => {
    count++;
    document.getElementById('heartCount').innerText = count;
    confetti({ particleCount: 15, angle: 90, spread: 40, origin: { y: 0.8 }, colors: ['#ff477e', '#ffccd5'] });
});

// Musiqini dayandırıb-başlatmaq imkanı
const bgMusic = document.getElementById('bgMusic');
document.getElementById('toggleMusicBtn').addEventListener('click', function() {
    if (bgMusic.paused) {
        bgMusic.play();
        this.innerText = '⏸️';
        document.getElementById('musicStatus').innerText = '🎵 Musiqi Aktivdir';
    } else {
        bgMusic.pause();
        this.innerText = '▶️';
        document.getElementById('musicStatus').innerText = '🔇 Musiqi Dayandırıldı';
    }
});

// Nizamidən özəl qeyd açılışı
document.getElementById('readMoreBtn').addEventListener('click', function() {
    const text = document.getElementById('hiddenMessage');
    if (text.style.display === 'none' || text.style.display === '') {
        text.style.display = 'block';
        this.innerText = 'Qeydi Gizlə ✖️';
    } else {
        text.style.display = 'none';
        this.innerText = 'Nizamidən Özəl Qeyd 📝';
    }
});

