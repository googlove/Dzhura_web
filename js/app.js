// --- DATABASE ---
const DB_RANKS = {
    army: [
        {id:1, t:"Рекрут"}, {id:2, t:"Солдат"}, {id:3, t:"Ст. Солдат"},
        {id:4, t:"Мол. Сержант"}, {id:5, t:"Сержант"}, {id:6, t:"Ст. Сержант"},
        {id:7, t:"Голов. Сержант"}, {id:8, t:"Штаб-сержант"}, {id:9, t:"Майстер-сержант"},
        {id:10, t:"Ст. Майстер-сержант"}, {id:11, t:"Гол. Майстер-сержант"},
        {id:12, t:"Мол. Лейтенант"}, {id:13, t:"Лейтенант"}, {id:14, t:"Ст. Лейтенант"},
        {id:15, t:"Капітан"}, {id:16, t:"Майор"}, {id:17, t:"Підполковник"}, {id:18, t:"Полковник"}
    ],
    navy: [
        {id:1, t:"Рекрут"}, {id:2, t:"Матрос"}, {id:3, t:"Ст. Матрос"},
        {id:4, t:"Старшина 2 ст."}, {id:5, t:"Старшина 1 ст."}, {id:6, t:"Голов. Старшина"},
        {id:7, t:"Гол. Кор. Старшина"}, {id:8, t:"Штаб-старшина"}, {id:9, t:"Майстер-старшина"},
        {id:10, t:"Ст. Майстер-старшина"}, {id:11, t:"Гол. Майстер-старшина"},
        {id:12, t:"Мол. Лейтенант"}, {id:13, t:"Лейтенант"}, {id:14, t:"Ст. Лейтенант"},
        {id:15, t:"Кап-лейтенант"}, {id:16, t:"Капітан 3 рангу"}, {id:17, t:"Капітан 2 рангу"}, {id:18, t:"Капітан 1 рангу"}
    ]
};

// --- APP LOGIC ---
const App = {
    data: {
        name: "Боєць",
        start: new Date().toISOString().split('T')[0],
        rank: 1,
        isNavy: false
    },

    init() {
        this.load();
        this.renderRanks();
        this.updateUI();
        
        // Запуск таймерів
        setInterval(() => this.tick(), 1000);
        this.tick(); // Перший запуск одразу
        
        lucide.createIcons();
    },

    tick() {
        // 1. Годинник реального часу
        const now = new Date();
        document.getElementById('realtime-clock').innerText = now.toLocaleTimeString('uk-UA');

        // 2. Таймер служби (рахуємо скільки пройшло)
        const start = new Date(this.data.start);
        const diff = now - start; // мілісекунди

        if (diff < 0) {
            // Якщо дата в майбутньому
            document.getElementById('total-days-counter').innerText = "0";
            return;
        }

        // Обчислення
        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const years = Math.floor(days / 365);
        const months = Math.floor((days % 365) / 30);
        const weeks = Math.floor((days % 365) / 7);

        // Оновлення HTML
        document.getElementById('total-days-counter').innerText = days;
        document.getElementById('stat-years').innerText = years;
        document.getElementById('stat-months').innerText = months;
        document.getElementById('stat-weeks').innerText = weeks;
        
        // Живі секунди (форматовані з пробілами, наприклад 1 200 500)
        document.getElementById('stat-seconds-total').innerText = totalSeconds.toLocaleString('uk-UA');

        // 3. Круговий прогрес (візуальний ефект)
        // Робимо вигляд, що коло заповнюється, але повільно (наприклад, 3 роки це повне коло для візуалізації)
        // 1095 днів = 3 роки.
        const maxRef = 1095; 
        const progress = Math.min(days / maxRef, 1);
        const circle = document.getElementById('progress-ring');
        const circumference = 2 * Math.PI * 120; // r=120 -> ~754
        const offset = circumference - (progress * circumference);
        circle.style.strokeDashoffset = offset;
    },

    saveData() {
        this.data.name = document.getElementById('input-name').value || "Боєць";
        this.data.start = document.getElementById('input-date').value;
        this.data.rank = parseInt(document.getElementById('input-rank').value);
        this.data.isNavy = document.getElementById('check-navy').checked;
        
        localStorage.setItem('dzhura_mm14_data', JSON.stringify(this.data));
        
        this.updateUI();
        UI.nav('timer'); // Повернутись на головну
    },

    load() {
        const saved = localStorage.getItem('dzhura_mm14_data');
        if (saved) {
            this.data = JSON.parse(saved);
        }
        
        // Заповнити інпути
        document.getElementById('input-name').value = this.data.name;
        document.getElementById('input-date').value = this.data.start;
        document.getElementById('check-navy').checked = this.data.isNavy;
    },

    renderRanks() {
        const sel = document.getElementById('input-rank');
        sel.innerHTML = '';
        const list = this.data.isNavy ? DB_RANKS.navy : DB_RANKS.army;
        list.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r.id;
            opt.innerText = r.t;
            sel.appendChild(opt);
        });
        sel.value = this.data.rank;
    },

    toggleNavy() {
        this.data.isNavy = document.getElementById('check-navy').checked;
        this.renderRanks();
    },

    updateUI() {
        document.getElementById('user-name').innerText = this.data.name;
        
        const list = this.data.isNavy ? DB_RANKS.navy : DB_RANKS.army;
        const rankObj = list.find(r => r.id == this.data.rank);
        document.getElementById('rank-badge').innerText = rankObj ? rankObj.t : "Рекрут";
    }
};

const UI = {
    nav(viewId) {
        // Ховаємо всі секції
        document.querySelectorAll('.tab-view').forEach(el => el.classList.add('hidden'));
        // Показуємо потрібну
        document.getElementById(`view-${viewId}`).classList.remove('hidden');
        
        // Кнопки
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active', 'text-yellow-500'));
        const activeBtn = document.getElementById(`btn-${viewId}`);
        if(activeBtn) {
            activeBtn.classList.add('active', 'text-yellow-500');
            activeBtn.classList.remove('text-white/30');
        }
    }
};

// Start
window.onload = () => App.init();
