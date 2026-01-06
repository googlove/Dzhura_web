const App = {
    ranks: {
        army: ["Рекрут", "Солдат", "Старший солдат", "Молодший сержант", "Сержант", "Старший сержант", "Головний сержант", "Штаб-сержант", "Майстер-сержант", "Старший майстер-сержант", "Головний майстер-сержант", "Молодший лейтенант", "Лейтенант", "Старший лейтенант", "Капітан", "Майор", "Підполковник", "Полковник", "Бригадний генерал"],
        navy: ["Рекрут", "Матрос", "Старший матрос", "Старшина 2 статті", "Старшина 1 статті", "Головний старшина", "Головний корабельний старшина", "Штаб-старшина", "Майстер-старшина", "Старший майстер-старшина", "Головний майстер-старшина", "Молодший лейтенант", "Лейтенант", "Старший лейтенант", "Капітан-лейтенант", "Капітан 3 рангу", "Капітан 2 рангу", "Капітан 1 рангу", "Коммодор"]
    },

    data: JSON.parse(localStorage.getItem('jura_tactical_v5')) || {
        name: "БОЄЦЬ", start: "2024-01-01", theme: 'pixel',
        isNavy: false, rank: "Солдат", salary: 20000
    },

    init() {
        this.renderRanks();
        this.fillInputs();
        UI.setTheme(this.data.theme);
        setInterval(() => this.tick(), 1000);
        this.tick();
        lucide.createIcons();
    },

    tick() {
        const start = new Date(this.data.start);
        const now = new Date();
        const diff = Math.max(0, now - start);
        const d = Math.floor(diff / 86400000);
        
        document.getElementById('main-days-counter').innerText = d;
        document.getElementById('t-year').innerText = Math.floor(d / 365);
        document.getElementById('t-month').innerText = Math.floor((d % 365) / 30);
        document.getElementById('t-day').innerText = d % 30;

        // Прогрес за 3 роки (1095 днів)
        const offset = 754 - (Math.min(d / 1095, 1) * 754);
        document.getElementById('progress-ring').style.strokeDashoffset = offset;
        
        document.getElementById('money-display').innerText = parseInt(this.data.salary).toLocaleString() + " ₴";
    },

    toggleNavy() {
        this.data.isNavy = document.getElementById('check-navy').checked;
        this.renderRanks();
    },

    renderRanks() {
        const sel = document.getElementById('input-rank');
        const list = this.data.isNavy ? this.ranks.navy : this.ranks.army;
        sel.innerHTML = list.map(r => `<option value="${r}">${r.toUpperCase()}</option>`).join('');
        sel.value = this.data.rank;
        document.getElementById('display-rank').innerText = this.data.rank;
    },

    save() {
        this.data.name = document.getElementById('in-name').value.toUpperCase();
        this.data.start = document.getElementById('in-date').value;
        this.data.rank = document.getElementById('input-rank').value;
        this.data.isNavy = document.getElementById('check-navy').checked;
        
        localStorage.setItem('jura_tactical_v5', JSON.stringify(this.data));
        document.getElementById('display-rank').innerText = this.data.rank;
        UI.nav('timer');
    },

    fillInputs() {
        document.getElementById('in-name').value = this.data.name;
        document.getElementById('in-date').value = this.data.start;
        document.getElementById('check-navy').checked = this.data.isNavy;
    }
};

const UI = {
    nav(id) {
        document.querySelectorAll('.tab-view').forEach(v => v.classList.add('hidden'));
        document.getElementById('view-' + id).classList.remove('hidden');
        document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
        document.getElementById('nav-' + id).classList.add('active');
    },
    setTheme(name) {
        document.getElementById('body-root').className = `theme-${name} min-h-screen relative font-['Exo_2']`;
        App.data.theme = name;
        localStorage.setItem('jura_tactical_v5', JSON.stringify(App.data));
    }
};

App.init();
