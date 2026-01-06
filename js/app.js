const App = {
    ranks: {
        army: ["Рекрут", "Солдат", "Старший солдат", "Молодший сержант", "Сержант", "Старший сержант", "Головний сержант", "Штаб-сержант", "Майстер-сержант", "Старший майстер-сержант", "Головний майстер-сержант", "Молодший лейтенант", "Лейтенант", "Старший лейтенант", "Капітан", "Майор", "Підполковник", "Полковник", "Бригадний генерал"],
        navy: ["Рекрут", "Матрос", "Старший матрос", "Старшина 2 статті", "Старшина 1 статті", "Головний старшина", "Головний корабельний старшина", "Штаб-старшина", "Майстер-старшина", "Старший майстер-старшина", "Головний майстер-старшина", "Молодший лейтенант", "Лейтенант", "Старший лейтенант", "Капітан-лейтенант", "Капітан 3 рангу", "Капітан 2 рангу", "Капітан 1 рангу", "Коммодор"]
    },

    data: JSON.parse(localStorage.getItem('jura_tactical_vFinal')) || {
        name: "Боєць", start: new Date().toISOString().split('T')[0],
        salary: 20000, watches: 0, isNavy: false, rank: "Солдат",
        vac1: '', vac2: '', vacFam: '', vacCity: ''
    },

    init() {
        this.renderRanks();
        this.fillInputs();
        setInterval(() => this.tick(), 1000);
        this.tick();
        lucide.createIcons();
    },

    tick() {
        const now = new Date();
        const start = new Date(this.data.start);
        document.getElementById('realtime-clock').innerText = now.toLocaleTimeString('uk-UA');

        // Фінанси
        const totalMoney = parseInt(this.data.salary || 0) + (parseInt(this.data.watches || 0) * 4000);
        document.getElementById('money-display').innerText = totalMoney.toLocaleString() + " ₴";

        // Час
        let diff = now - start;
        if (diff < 0) diff = 0;
        const s = Math.floor(diff / 1000);
        const d = Math.floor(s / 86400);
        
        document.getElementById('main-days-counter').innerText = d;
        document.getElementById('t-year').innerText = Math.floor(d / 365);
        document.getElementById('t-month').innerText = Math.floor((d % 365) / 30);
        document.getElementById('t-day').innerText = d % 30;
        document.getElementById('t-hour').innerText = Math.floor((s % 86400) / 3600);
        document.getElementById('t-min').innerText = Math.floor((s % 3600) / 60);
        document.getElementById('t-sec').innerText = s % 60;

        // Прогрес (на 3 роки)
        const progress = Math.min(d / 1095, 1);
        document.getElementById('progress-ring').style.strokeDashoffset = 754 - (progress * 754);
        
        this.updateEvents(now);
    },

    updateEvents(now) {
        const container = document.getElementById('events-tracker');
        container.innerHTML = '';
        const check = (dateStr, days, label) => {
            if (!dateStr) return;
            const s = new Date(dateStr);
            const e = new Date(s); e.setDate(s.getDate() + days);
            
            if (now >= s && now <= e) {
                const left = Math.ceil((e - now) / 86400000);
                container.innerHTML += `
                    <div class="event-card">
                        <p>${label}</p>
                        <p>ДО ПОВЕРНЕННЯ: ${left} ДН.</p>
                    </div>`;
            }
        };
        check(this.data.vac1, 17, "ВІДПУСТКА №1");
        check(this.data.vac2, 17, "ВІДПУСТКА №2");
        check(this.data.vacFam, 10, "СІМЕЙНІ ОБСТАВИНИ");
        check(this.data.vacCity, 4, "ЗВІЛЬНЕННЯ");
    },

    renderRanks() {
        const sel = document.getElementById('input-rank');
        sel.innerHTML = '';
        const list = this.data.isNavy ? this.ranks.navy : this.ranks.army;
        list.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r; opt.innerText = r;
            sel.appendChild(opt);
        });
        sel.value = this.data.rank;
    },

    toggleNavy() {
        this.data.isNavy = document.getElementById('check-navy').checked;
        this.renderRanks();
    },

    save() {
        this.data.name = document.getElementById('in-name').value;
        this.data.start = document.getElementById('in-date').value;
        this.data.salary = document.getElementById('in-salary').value;
        this.data.watches = document.getElementById('in-watches').value;
        this.data.rank = document.getElementById('input-rank').value;
        this.data.isNavy = document.getElementById('check-navy').checked;
        this.data.vac1 = document.getElementById('vac-1').value;
        this.data.vac2 = document.getElementById('vac-2').value;
        this.data.vacFam = document.getElementById('vac-fam').value;
        this.data.vacCity = document.getElementById('vac-city').value;
        
        localStorage.setItem('jura_tactical_vFinal', JSON.stringify(this.data));
        this.updateHeader();
        UI.nav('timer');
    },

    fillInputs() {
        const d = this.data;
        document.getElementById('in-name').value = d.name;
        document.getElementById('in-date').value = d.start;
        document.getElementById('in-salary').value = d.salary;
        document.getElementById('in-watches').value = d.watches;
        document.getElementById('check-navy').checked = d.isNavy;
        document.getElementById('vac-1').value = d.vac1;
        document.getElementById('vac-2').value = d.vac2;
        document.getElementById('vac-fam').value = d.vacFam;
        document.getElementById('vac-city').value = d.vacCity;
        this.updateHeader();
    },

    updateHeader() {
        document.getElementById('user-name-display').innerText = this.data.name;
        document.getElementById('rank-badge-display').innerText = this.data.rank;
    }
};

const UI = {
    nav(id) {
        document.querySelectorAll('.tab-view').forEach(v => v.classList.add('hidden'));
        document.getElementById('view-' + id).classList.remove('hidden');
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('nav-' + id).classList.add('active');
    }
};

window.addEventListener('DOMContentLoaded', () => App.init(document.body.style.background = "none";
));
