const App = {
    // База звань ЗСУ (актуальні)
    ranks: {
        army: [
            "Рекрут", "Солдат", "Старший солдат", "Молодший сержант", 
            "Сержант", "Старший сержант", "Головний сержант", "Штаб-сержант", 
            "Майстер-сержант", "Старший майстер-сержант", "Головний майстер-сержант",
            "Молодший лейтенант", "Лейтенант", "Старший лейтенант", "Капітан", 
            "Майор", "Підполковник", "Полковник", "Бригадний генерал", 
            "Генерал-майор", "Генерал-лейтенант", "Генерал"
        ],
        navy: [
            "Рекрут", "Матрос", "Старший матрос", "Старшина 2 статті", 
            "Старшина 1 статті", "Головний старшина", "Головний корабельний старшина", 
            "Штаб-старшина", "Майстер-старшина", "Старший майстер-старшина", 
            "Головний майстер-старшина", "Молодший лейтенант", "Лейтенант", 
            "Старший лейтенант", "Капітан-лейтенант", "Капітан 3 рангу", 
            "Капітан 2 рангу", "Капітан 1 рангу", "Коммодор", 
            "Контр-адмірал", "Віце-адмірал", "Адмірал"
        ]
    },

    data: JSON.parse(localStorage.getItem('jura_final_db')) || {
        name: "Боєць", 
        start: new Date().toISOString().split('T')[0],
        salary: 20000, 
        watches: 0, 
        theme: 'dark',
        isNavy: false,
        rank: "Солдат",
        vac1: '', vac2: '', vacFam: '', vacCity: ''
    },

    init() {
        this.applyTheme();
        this.renderRanks(); // Заповнюємо список звань
        this.fillInputs();
        
        // Запуск головного циклу (щосекунди)
        setInterval(() => this.tick(), 1000);
        
        // Ініціалізація іконок
        lucide.createIcons();
    },

    tick() {
        const now = new Date();
        const start = new Date(this.data.start);
        
        // 1. Оновлення годинника
        document.getElementById('realtime-clock').innerText = now.toLocaleTimeString('uk-UA');

        // 2. Розрахунок грошей (Зарплата + Вахти по 4000)
        const totalMoney = parseInt(this.data.salary) + (parseInt(this.data.watches) * 4000);
        document.getElementById('money-display').innerText = totalMoney.toLocaleString() + " ₴";

        // 3. Детальний лічильник часу служби
        let diff = now - start;
        if (diff < 0) diff = 0;

        const totalSecs = Math.floor(diff / 1000);
        const days = Math.floor(totalSecs / 86400);
        
        // Розбивка для карток
        const years = Math.floor(days / 365);
        const months = Math.floor((days % 365) / 30);
        const remainingDays = days % 30;
        const hours = Math.floor((totalSecs % 86400) / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;

        // Вивід у HTML
        document.getElementById('main-days').innerText = days;
        document.getElementById('t-year').innerText = years;
        document.getElementById('t-month').innerText = months;
        document.getElementById('t-day').innerText = remainingDays;
        document.getElementById('t-hour').innerText = hours;
        document.getElementById('t-min').innerText = mins;
        document.getElementById('t-sec').innerText = secs;

        // 4. Оновлення прогрес-кільця (умовно 3 роки = 100%)
        const progress = Math.min(days / 1095, 1);
        const ring = document.getElementById('progress-ring');
        if (ring) ring.style.strokeDashoffset = 754 - (progress * 754);

        // 5. Оновлення статусів відпусток та звільнень
        this.updateEvents(now);
    },

    updateEvents(now) {
        const container = document.getElementById('events-tracker');
        container.innerHTML = '';
        
        const checkEvent = (dateStr, durationDays, label) => {
            if (!dateStr) return;
            const startDate = new Date(dateStr);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + durationDays);
            
            if (now >= startDate && now <= endDate) {
                const diffTime = endDate - now;
                const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                container.innerHTML += `
                    <div class="glass-panel p-3 rounded-xl border-l-4 border-green-500 animate-pulse mb-2">
                        <p class="text-[10px] font-bold uppercase text-green-500">${label} (АКТИВНО)</p>
                        <p class="text-sm font-black text-white">ПОВЕРНЕННЯ ЧЕРЕЗ: ${daysLeft} ДН.</p>
                    </div>`;
            } else if (startDate > now) {
                const daysTo = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));
                container.innerHTML += `
                    <div class="glass-panel p-3 rounded-xl opacity-60 mb-2">
                        <p class="text-[10px] font-bold uppercase tracking-widest text-yellow-500">${label} (ПЛАН)</p>
                        <p class="text-xs text-white">Початок через ${daysTo} дн.</p>
                    </div>`;
            }
        };

        // Перевірка всіх типів дат (15 днів + 2 дорога = 17)
        checkEvent(this.data.vac1, 17, "Відпустка 1");
        checkEvent(this.data.vac2, 17, "Відпустка 2");
        checkEvent(this.data.vacFam, 10, "Сімейні обставини");
        checkEvent(this.data.vacCity, 4, "Звільнення (4 дні)");
    },

    renderRanks() {
        const select = document.getElementById('input-rank') || document.createElement('select'); 
        // Якщо у вашому HTML id="input-rank", воно знайде його
        select.innerHTML = '';
        const currentList = this.data.isNavy ? this.ranks.navy : this.ranks.army;
        
        currentList.forEach(rank => {
            const opt = document.createElement('option');
            opt.value = rank;
            opt.innerText = rank;
            select.appendChild(opt);
        });
        select.value = this.data.rank;
    },

    toggleNavy() {
        this.data.isNavy = !this.data.isNavy;
        this.renderRanks(); // Перемальовуємо список під обраний рід військ
    },

    save() {
        // Збір даних з полів
        this.data.name = document.getElementById('in-name').value || "Боєць";
        this.data.start = document.getElementById('in-date').value;
        this.data.salary = document.getElementById('in-salary').value || 0;
        this.data.watches = document.getElementById('in-watches').value || 0;
        this.data.rank = document.getElementById('input-rank').value;
        
        this.data.vac1 = document.getElementById('vac-1').value;
        this.data.vac2 = document.getElementById('vac-2').value;
        this.data.vacFam = document.getElementById('vac-fam').value;
        this.data.vacCity = document.getElementById('vac-city').value;

        localStorage.setItem('jura_final_db', JSON.stringify(this.data));
        
        // Оновлення текстових елементів
        document.getElementById('user-name').innerText = this.data.name;
        document.getElementById('rank-badge').innerText = this.data.rank;
        
        UI.nav('timer'); // Повернення на головну
    },

    fillInputs() {
        document.getElementById('in-name').value = this.data.name;
        document.getElementById('in-date').value = this.data.start;
        document.getElementById('in-salary').value = this.data.salary;
        document.getElementById('in-watches').value = this.data.watches;
        document.getElementById('vac-1').value = this.data.vac1;
        document.getElementById('vac-2').value = this.data.vac2;
        document.getElementById('vac-fam').value = this.data.vacFam;
        document.getElementById('vac-city').value = this.data.vacCity;
        
        document.getElementById('user-name').innerText = this.data.name;
        document.getElementById('rank-badge').innerText = this.data.rank;
        
        const navyCheck = document.getElementById('check-navy');
        if (navyCheck) navyCheck.checked = this.data.isNavy;
    },

    toggleTheme() {
        this.data.theme = this.data.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
        localStorage.setItem('jura_final_db', JSON.stringify(this.data));
    },

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.data.theme);
        const ring = document.getElementById('progress-ring');
        if (ring) {
            ring.setAttribute('stroke', this.data.theme === 'dark' ? '#ca8a04' : '#4b512d');
        }
    }
};

// Запуск при завантаженні сторінки
window.onload = () => App.init();
