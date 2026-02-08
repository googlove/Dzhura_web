class DzhuraApp {
    constructor() {
        this.userData = {};
        this.staticData = {};
        this.weaponsData = [];
        this.init();
    }

    async init() {
        await this.loadData();
        this.setupListeners();
        this.renderUI();
        this.startTimers();
    }

    async loadData() {
        try {
            // Завантаження налаштувань та звань
            const resData = await fetch('data.json');
            this.staticData = await resData.json();

            // Завантаження зброї
            const resWeapons = await fetch('weapons.json');
            this.weaponsData = await resWeapons.json();

            // Завантаження користувача (або дефолт)
            const savedUser = localStorage.getItem('dzhura_user_RC1');
            this.userData = savedUser ? JSON.parse(savedUser) : this.staticData.defaultUser;

        } catch (e) {
            console.error("Помилка завантаження JSON. Запустіть через Live Server!", e);
            alert("Помилка: Відкрийте консоль браузера.");
        }
    }

    setupListeners() {
        // Навігація
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
                
                item.classList.add('active');
                document.getElementById(item.dataset.target).classList.add('active');
                
                // Закрити меню на мобільному
                document.getElementById('sidebar').classList.remove('open');
            });
        });

        // Мобільне меню
        document.getElementById('menu-toggle').addEventListener('click', () => {
            document.getElementById('sidebar').classList.toggle('open');
        });

        // Тема
        document.getElementById('theme-toggle').addEventListener('click', () => {
            document.body.classList.toggle('pixel-theme');
        });

        // Збереження форми налаштувань
        document.getElementById('settings-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSettings();
        });

        // Динамічна зміна списку звань при зміні роду військ
        document.getElementById('inp-branch').addEventListener('change', (e) => {
            this.populateRankSelect(e.target.value);
        });

        // Пошук зброї
        document.getElementById('weapon-search').addEventListener('input', (e) => {
            this.renderHandbook(e.target.value);
        });
    }

    renderUI() {
        // Заповнення полів налаштувань
        document.getElementById('inp-serviceType').value = this.userData.serviceType;
        document.getElementById('inp-branch').value = this.userData.branch || 'navy';
        document.getElementById('inp-callsign').value = this.userData.callsign;
        document.getElementById('inp-unit').value = this.userData.unit;
        document.getElementById('inp-start').value = this.userData.startDate;
        document.getElementById('inp-end').value = this.userData.endDate;
        document.getElementById('inp-salary').value = this.userData.salary;
        document.getElementById('inp-shifts').value = this.userData.shifts;

        // Заповнити селект звань (правильним списком)
        this.populateRankSelect(this.userData.branch || 'navy', this.userData.rank);

        // Головний екран
        document.getElementById('display-rank').innerText = this.userData.rank;
        document.getElementById('display-callsign').innerText = this.userData.callsign;
        document.getElementById('display-start').innerText = this.formatDate(this.userData.startDate);
        document.getElementById('display-end').innerText = this.userData.serviceType === 'contract' ? this.formatDate(this.userData.endDate) : '∞';

        this.renderFinance();
        this.renderEvents();
        this.renderHandbook(); // Завантажити весь список зброї
    }

    populateRankSelect(branch, currentRank = null) {
        const select = document.getElementById('inp-rank-select');
        select.innerHTML = ''; // Очистити
        
        const ranks = this.staticData.ranks[branch] || [];
        ranks.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r;
            opt.innerText = r;
            if (r === currentRank) opt.selected = true;
            select.appendChild(opt);
        });
    }

    saveSettings() {
        this.userData = {
            serviceType: document.getElementById('inp-serviceType').value,
            branch: document.getElementById('inp-branch').value,
            rank: document.getElementById('inp-rank-select').value,
            callsign: document.getElementById('inp-callsign').value,
            unit: document.getElementById('inp-unit').value,
            startDate: document.getElementById('inp-start').value,
            endDate: document.getElementById('inp-end').value,
            salary: Number(document.getElementById('inp-salary').value),
            shifts: Number(document.getElementById('inp-shifts').value)
        };
        localStorage.setItem('dzhura_user_RC1', JSON.stringify(this.userData));
        this.renderUI();
        this.updateTimers(); // Оновити таймер одразу
        alert('Дані збережено!');
    }

    // --- Handbook Logic ---
    renderHandbook(query = "") {
        const container = document.getElementById('weapons-container');
        container.innerHTML = "";
        const term = query.toLowerCase();

        this.weaponsData.forEach(cat => {
            const items = cat.items.filter(i => 
                i.name.toLowerCase().includes(term) || 
                cat.categoryName.toLowerCase().includes(term)
            );

            if (items.length > 0) {
                const catDiv = document.createElement('div');
                catDiv.className = 'weapon-category';
                
                const header = document.createElement('div');
                header.className = 'category-header';
                header.innerHTML = `<span><i class="fas ${cat.icon}"></i> ${cat.categoryName}</span> <i class="fas fa-chevron-down"></i>`;
                
                const content = document.createElement('div');
                content.className = 'category-content';
                if(term) content.classList.add('open'); // Розкрити при пошуку

                header.addEventListener('click', () => content.classList.toggle('open'));

                items.forEach(item => {
                    content.innerHTML += `
                        <div class="weapon-card">
                            <div class="weapon-name">${item.name}</div>
                            <div class="weapon-desc">
                                <b>${item.origin}</b><br>
                                ${item.desc}
                            </div>
                        </div>
                    `;
                });

                catDiv.append(header, content);
                container.append(catDiv);
            }
        });
    }

    // --- Timer & Utils ---
    startTimers() {
        this.updateTimers();
        setInterval(() => this.updateTimers(), 1000);
    }

    updateTimers() {
        const now = new Date();
        document.getElementById('header-date').innerText = now.toLocaleDateString('uk-UA', { weekday: 'short', day: 'numeric', month: 'long' });
        document.getElementById('clock-large').innerText = now.toLocaleTimeString('uk-UA');

        const start = new Date(this.userData.startDate);
        const end = new Date(this.userData.endDate);
        let diff, total, isCountdown;

        if (this.userData.serviceType === 'contract') {
            diff = end - now;
            total = end - start;
            isCountdown = true;
        } else {
            diff = now - start;
            isCountdown = false;
        }

        const days = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
        document.getElementById('days-counter').innerText = days;

        if (isCountdown) {
            if (diff <= 0) {
                document.getElementById('full-timer').innerText = "Дембель!";
                document.getElementById('progress-fill').style.width = "100%";
                return;
            }
            document.getElementById('full-timer').innerText = "Днів до наказу";
            const percent = Math.min(100, Math.max(0, ((now - start) / total) * 100));
            document.getElementById('progress-fill').style.width = percent + "%";
        } else {
            document.getElementById('full-timer').innerText = "Днів на службі";
            document.getElementById('progress-fill').style.width = "100%";
        }
    }

    renderFinance() {
        const base = this.userData.salary;
        const shifts = this.userData.shifts * 4000; // 4000 за вахту
        document.getElementById('stat-base').innerText = `${base} ₴`;
        document.getElementById('stat-shifts').innerText = `${shifts} ₴`;
        document.getElementById('stat-total').innerText = `${base + shifts} ₴`;
    }
    
    renderEvents() {
        const container = document.getElementById('events-container');
        const today = new Date();
        const m = String(today.getMonth()+1).padStart(2,'0');
        const d = String(today.getDate()).padStart(2,'0');
        const key = `${m}-${d}`;
        
        const ev = this.staticData.holidays.find(h => h.date === key);
        container.innerHTML = ev ? 
            `<div style="color:var(--accent); font-weight:bold;">🎉 ${ev.title}</div>` : 
            `<div style="opacity:0.7">Сьогодні без свят. Тримаємо стрій.</div>`;
    }

    formatDate(str) {
        if(!str) return "";
        return new Date(str).toLocaleDateString('uk-UA');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DzhuraApp();
    // Генеруємо риски прогресу
    const ticks = document.getElementById('progress-ticks');
    for(let i=0; i<10; i++) ticks.appendChild(document.createElement('div')).className='tick';
});
