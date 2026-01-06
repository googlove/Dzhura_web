// --- DATA BASE ---
const DB = {
    ranks_army: [
        { id: 1, title: "Рекрут" }, { id: 2, title: "Солдат" }, { id: 3, title: "Ст. Солдат" },
        { id: 4, title: "Мол. Сержант" }, { id: 5, title: "Сержант" }, { id: 6, title: "Ст. Сержант" },
        { id: 7, title: "Голов. Сержант" }, { id: 8, title: "Штаб-сержант" }, { id: 9, title: "Майстер-сержант" },
        { id: 10, title: "Ст. М-сержант" }, { id: 11, title: "Голов. М-сержант" }, { id: 12, title: "Мол. Лейтенант" },
        { id: 13, title: "Лейтенант" }, { id: 14, title: "Ст. Лейтенант" }, { id: 15, title: "Капітан" },
        { id: 16, title: "Майор" }, { id: 17, title: "Підполковник" }, { id: 18, title: "Полковник" }
    ],
    ranks_navy: [
        { id: 1, title: "Рекрут" }, { id: 2, title: "Матрос" }, { id: 3, title: "Ст. Матрос" },
        { id: 4, title: "Старшина 2 ст." }, { id: 5, title: "Старшина 1 ст." }, { id: 6, title: "Голов. Старшина" },
        { id: 7, title: "Голов. Кор. Старшина" }, { id: 8, title: "Штаб-старшина" }, { id: 9, title: "Майстер-старшина" },
        { id: 10, title: "Ст. М-старшина" }, { id: 11, title: "Голов. М-старшина" }, { id: 12, title: "Мол. Лейтенант" },
        { id: 13, title: "Лейтенант" }, { id: 14, title: "Ст. Лейтенант" }, { id: 15, title: "Кап-лейтенант" },
        { id: 16, title: "Капітан 3 р." }, { id: 17, title: "Капітан 2 р." }, { id: 18, title: "Капітан 1 р." },
        { id: 19, title: "Коммодор" }, { id: 20, title: "Контр-адмірал" }
    ]
};

const App = {
    state: {
        user: JSON.parse(localStorage.getItem('jura_mil_user')) || { 
            name: 'Боєць', 
            date: new Date().toISOString().split('T')[0], 
            rank: 1, 
            navy: false,
            type: 'mobilized' 
        },
        buddies: JSON.parse(localStorage.getItem('jura_mil_buddies')) || [],
        activeId: 'user'
    },

    init() {
        this.fillRanks();
        this.syncUI();
        UI.renderArmy();
        
        // Запуск циклів
        setInterval(() => this.tickTimer(), 1000); // Таймер служби
        setInterval(() => this.tickClock(), 1000); // Годинник реального часу
        
        this.tickTimer(); 
        this.tickClock();
        lucide.createIcons();
    },

    // Головний таймер служби
    tickTimer() {
        const profile = this.state.activeId === 'user' ? this.state.user : this.state.buddies[this.state.activeId];
        if (!profile) return;

        UI.updateHeader(profile);

        const start = new Date(profile.date);
        const now = new Date();
        const diff = now - start;

        // Встановлюємо "вічний" термін (нескінченність)
        // Для візуалізації прогресу беремо умовні 18 міс (548 днів), але текст буде ∞
        const totalRef = 548 * 24 * 60 * 60 * 1000; 
        const percent = Math.min(100, (diff / totalRef) * 100);

        document.getElementById('percent-display').innerText = `${percent.toFixed(0)}%`;
        
        // Детальний час
        const s = Math.floor(diff / 1000);
        const y = Math.floor(s / 31536000);
        const mo = Math.floor((s % 31536000) / 2592000);
        const w = Math.floor((s % 2592000) / 604800);
        const d = Math.floor((s % 604800) / 86400);

        document.getElementById('t-years').innerText = y;
        document.getElementById('t-months').innerText = mo;
        document.getElementById('t-weeks').innerText = w;
        document.getElementById('t-days').innerText = d;

        UI.drawRice(percent);
    },

    // Годинник "Судного дня" (реальний час)
    tickClock() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('uk-UA', { hour12: false });
        document.getElementById('doomsday-clock').innerText = timeStr;
    },

    saveUser() {
        this.state.user.name = document.getElementById('set-name').value || 'Боєць';
        this.state.user.date = document.getElementById('set-date').value;
        this.state.user.rank = document.getElementById('input-rank').value;
        localStorage.setItem('jura_mil_user', JSON.stringify(this.state.user));
        alert('Дані оновлено');
        UI.switchTab('timer');
    },

    setService(type) {
        this.state.user.type = type;
        this.syncUI();
    },

    toggleNavy(checked) {
        this.state.user.navy = checked;
        this.fillRanks();
    },

    fillRanks() {
        const select = document.getElementById('input-rank');
        select.innerHTML = '';
        const list = this.state.user.navy ? DB.ranks_navy : DB.ranks_army;
        list.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r.id;
            opt.innerText = r.title;
            select.appendChild(opt);
        });
        select.value = this.state.user.rank;
    },

    addBuddy() {
        const name = document.getElementById('buddy-name').value;
        const date = document.getElementById('buddy-date').value;
        if(name && date) {
            this.state.buddies.push({name, date, rank: 1, navy: false});
            localStorage.setItem('jura_mil_buddies', JSON.stringify(this.state.buddies));
            UI.closeModal();
            UI.renderArmy();
        }
    },

    syncUI() {
        const u = this.state.user;
        document.getElementById('set-name').value = u.name;
        document.getElementById('set-date').value = u.date;
        document.getElementById('is-navy').checked = u.navy;
        
        // Кнопки типу служби
        const btnM = document.getElementById('btn-mobilized');
        const btnC = document.getElementById('btn-contract');
        
        if(u.type === 'mobilized') {
            btnM.className = 'p-3 rounded-xl bg-yellow-600 text-black text-xs font-bold uppercase';
            btnC.className = 'p-3 rounded-xl border border-white/10 text-xs font-bold uppercase opacity-50';
        } else {
            btnC.className = 'p-3 rounded-xl bg-yellow-600 text-black text-xs font-bold uppercase';
            btnM.className = 'p-3 rounded-xl border border-white/10 text-xs font-bold uppercase opacity-50';
        }
    }
};

const UI = {
    switchTab(id) {
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
        document.getElementById(`view-${id}`).classList.add('active');
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        document.getElementById(`nav-${id}`).classList.add('active');
    },

    updateHeader(p) {
        document.getElementById('header-name').innerText = p.name;
        const list = (p.navy || App.state.user.navy) ? DB.ranks_navy : DB.ranks_army;
        const r = list.find(x => x.id == (p.rank || App.state.user.rank));
        document.getElementById('header-rank').innerText = r ? r.title : 'Рекрут';
    },

    drawRice(percent) {
        const svg = document.getElementById('rice-circle-svg');
        svg.innerHTML = '';
        const total = 60;
        const active = Math.floor((percent / 100) * total);
        
        for(let i=0; i<total; i++) {
            const angle = (i * 6) * (Math.PI / 180);
            const x1 = 150 + 125 * Math.cos(angle);
            const y1 = 150 + 125 * Math.sin(angle);
            const x2 = 150 + 140 * Math.cos(angle);
            const y2 = 150 + 140 * Math.sin(angle);
            
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x1); line.setAttribute("y1", y1);
            line.setAttribute("x2", x2); line.setAttribute("y2", y2);
            line.setAttribute("stroke", i < active ? "#ca8a04" : "rgba(255,255,255,0.1)");
            line.setAttribute("stroke-width", "3");
            line.setAttribute("stroke-linecap", "round");
            svg.appendChild(line);
        }
    },

    renderArmy() {
        const list = document.getElementById('army-list');
        list.innerHTML = '';
        
        // Картка користувача
        list.innerHTML += this.createCard(App.state.user.name, 'Я', 'user');
        
        // Побратими
        App.state.buddies.forEach((b, idx) => {
            list.innerHTML += this.createCard(b.name, 'Побратим', idx);
        });
        lucide.createIcons();
    },

    createCard(name, role, id) {
        const isActive = App.state.activeId === id;
        const borderClass = isActive ? 'border-yellow-600 bg-yellow-600/10' : 'border-white/5';
        const iconColor = isActive ? 'text-yellow-500' : 'text-white/30';
        
        return `
        <div onclick="App.state.activeId = '${id}'; UI.renderArmy(); App.tickTimer()" 
             class="glass-card p-4 rounded-xl flex justify-between items-center cursor-pointer transition-all active:scale-95 border ${borderClass}">
            <div class="flex items-center gap-4">
                <div class="p-2 rounded-lg bg-black/30 ${iconColor}">
                    <i data-lucide="user" class="w-5 h-5"></i>
                </div>
                <div>
                    <p class="font-bold text-sm text-white leading-none">${name}</p>
                    <p class="text-[10px] uppercase opacity-40 font-bold mt-1 tracking-wider">${role}</p>
                </div>
            </div>
            ${isActive ? '<div class="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_10px_#ca8a04]"></div>' : ''}
        </div>`;
    },

    openModal() { document.getElementById('modal').style.display = 'flex'; },
    closeModal() { document.getElementById('modal').style.display = 'none'; }
};

// Start
App.init();
