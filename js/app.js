// --- DATA BASE (JSON) ---
const DB = {
    ranks_army: [
        { id: 1, title: "Рекрут", days: 0 }, 
        { id: 2, title: "Солдат", days: 120 }, 
        { id: 3, title: "Старший солдат", days: 180 },
        { id: 4, title: "Молодший сержант", days: 360 }, 
        { id: 5, title: "Сержант", days: 730 }, 
        { id: 6, title: "Старший сержант", days: 1095 }, 
        { id: 7, title: "Головний сержант", days: 1460 }, 
        { id: 8, title: "Штаб-сержант", days: 1825 }, 
        { id: 9, title: "Майстер-сержант", days: 2190 },
        { id: 10, title: "Старший майстер-сержант", days: 2555 }, 
        { id: 11, title: "Головний майстер-сержант", days: 2920 },
        { id: 12, title: "Молодший лейтенант", days: 1460 }, 
        { id: 13, title: "Лейтенант", days: 1825 }, 
        { id: 14, title: "Старший лейтенант", days: 2190 }, 
        { id: 15, title: "Капітан", days: 2555 }, 
        { id: 16, title: "Майор", days: 2920 }, 
        { id: 17, title: "Підполковник", days: 3285 }, 
        { id: 18, title: "Полковник", days: 3650 }
    ],
    ranks_navy: [
        { id: 1, title: "Рекрут", days: 0 }, 
        { id: 2, title: "Матрос", days: 120 }, 
        { id: 3, title: "Старший матрос", days: 180 },
        { id: 4, title: "Старшина 2 статті", days: 360 }, 
        { id: 5, title: "Старшина 1 статті", days: 730 }, 
        { id: 6, title: "Головний старшина", days: 1095 }, 
        { id: 7, title: "Головний корабельний старшина", days: 1460 }, 
        { id: 8, title: "Штаб-старшина", days: 1825 }, 
        { id: 9, title: "Майстер-старшина", days: 2190 },
        { id: 10, title: "Старший майстер-старшина", days: 2555 }, 
        { id: 11, title: "Головний майстер-старшина", days: 2920 },
        { id: 12, title: "Молодший лейтенант", days: 1460 }, 
        { id: 13, title: "Лейтенант", days: 1825 }, 
        { id: 14, title: "Старший лейтенант", days: 2190 }, 
        { id: 15, title: "Капітан-лейтенант", days: 2555 },
        { id: 16, title: "Капітан 3 рангу", days: 2920 },
        { id: 17, title: "Капітан 2 рангу", days: 3285 },
        { id: 18, title: "Капітан 1 рангу", days: 3650 },
        { id: 19, title: "Коммодор", days: 4015 },
        { id: 20, title: "Контр-адмірал", days: 4380 },
        { id: 21, title: "Віце-адмірал", days: 4745 },
        { id: 22, title: "Адмірал", days: 5110 }
    ],
    skills: [
        { id: 'komendor', category: 'Бойові / палуба', icon: 'shield', title: 'Комендор', description: 'Оборона корабля, робота з озброєнням.' },
        { id: 'boatswain', category: 'Бойові / палуба', icon: 'anchor', title: 'Боцман', description: 'Такелаж, швартування, якірні операції.' },
        { id: 'marsovy', category: 'Бойові / палуба', icon: 'binoculars', title: 'Марсовий', description: 'Спостереження за горизонтом, сигнали.' },
        { id: 'helm_signalman', category: 'Місток і керування', icon: 'navigation', title: 'Рульовий-сигнальник', description: 'Керування кораблем, ведення курсу.' },
        { id: 'senior_helm', category: 'Місток і керування', icon: 'compass', title: 'Старший рульовий', description: 'Керування у складних умовах.' },
        { id: 'operator_kbu', category: 'Корабельні системи / зв’язок', icon: 'satellite', title: 'Оператор КБУ', description: 'Дрони, Starlink, робота з ПК.' },
        { id: 'senior_operator', category: 'Корабельні системи / зв’язок', icon: 'activity', title: 'Старший оператор', description: 'РЛС, комплекси зв’язку.' },
        { id: 'motorist', category: 'Машинна команда', icon: 'cog', title: 'Моторист', description: 'Обслуговування двигунів та систем.' },
        { id: 'senior_motorist', category: 'Машинна команда', icon: 'gauge', title: 'Старший моторист', description: 'Контроль силових агрегатів.' },
        { id: 'electrician', category: 'Машинна команда', icon: 'zap', title: 'Електрик', description: 'Електроживлення та навігація.' },
        { id: 'senior_electrician', category: 'Машинна команда', icon: 'plug', title: 'Старший електрик', description: 'Генератори та аварійні системи.' },
        { id: 'bataler', category: 'Забезпечення', icon: 'package', title: 'Баталер', description: 'Постачання та контроль запасів.' },
        { id: 'commander_operators', category: 'Командири відділень', icon: 'search', title: 'К-р відд. операторів', description: 'Керівництво операторами КБУ.' },
        { id: 'commander_helm', category: 'Командири відділень', icon: 'radar', title: 'К-р рульових', description: 'Організація вахт на містку.' },
        { id: 'commander_komendors', category: 'Командири відділень', icon: 'shield-alert', title: 'К-р комендорів', description: 'Координація корабельної охорони.' },
        { id: 'miles_helming', category: 'Досвід / статистика', icon: 'map', title: 'Морські милі', description: 'Реальний досвід керування.' },
        { id: 'watch_hours', category: 'Досвід / статистика', icon: 'clock', title: 'Години вахти', description: 'Відпрацьовано години на вахті.' },
        { id: 'machinery_hours', category: 'Досвід / статистика', icon: 'cpu', title: 'Машинні години', description: 'Робота в машинному відділенні.' },
        { id: 'docking_operations', category: 'Досвід / статистика', icon: 'anchor', title: 'Швартування', description: 'Участь у складних маневрах.' },
        { id: 'combat_alerts', category: 'Досвід / статистика', icon: 'alarm-clock', title: 'Бойові тривоги', description: 'Досвід реальних тривог.' },
        { id: 'repairs_done', category: 'Досвід / статистика', icon: 'wrench', title: 'Ремонтні роботи', description: 'Відновлення систем та механізмів.' }
    ]
};

let AppData = {
    name: 'Джура',
    startDate: new Date().toISOString().split('T')[0],
    serviceType: 'mobilized',
    contractYears: 3,
    currentRankId: 1,
    isNavy: false,
    theme: 'dark'
};

const MEDALS = [
    { id: 'first_day',   title: 'Перший день', desc: 'Початок шляху.', check: ({ days }) => days >= 1 },
    { id: 'week',        title: 'Тиждень', desc: '7 днів служби.', check: ({ days }) => days >= 7 },
    { id: 'month',       title: 'Місяць', desc: '30 днів у строю.', check: ({ days }) => days >= 30 },
    { id: 'hundred',     title: 'Сотня', desc: '100 днів служби.', check: ({ days }) => days >= 100 },
    { id: 'half_year',   title: 'Пів року', desc: '180 днів.', check: ({ days }) => days >= 180 },
    { id: 'year',        title: 'Рік', desc: '365 днів служби.', check: ({ days }) => days >= 365 },
    { id: 'skills_3',    title: 'Фахівець', desc: '3+ бойові навички.', check: ({ skills }) => skills >= 3 },
    { id: 'full_kkd',    title: 'Еліта', desc: '100% бойового ККД.', check: ({ kkd }) => kkd >= 100 }
];

// --- CORE FUNCTIONS ---
function toggleView(viewId) {
    document.querySelectorAll('.tab-content').forEach(v => v.classList.remove('active'));
    document.getElementById(`view-${viewId}`).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(`nav-${viewId}`).classList.add('active');

    if (viewId === 'status') { renderSkills(); calculateKKD(); updateAchievement(); renderMedals(); }
    if (viewId === 'stats') { renderStats(); }

    localStorage.setItem('DzhuraLastView', viewId);
}

function updateProgressCircle(percent) {
    const circle = document.getElementById('progress-stroke');
    if (!circle) return;
    const circumference = 817;
    const offset = circumference - (circumference * (percent / 100));
    circle.style.strokeDashoffset = offset;
}

function getTotalServiceDays() {
    const diff = new Date() - new Date(AppData.startDate);
    return diff > 0 ? Math.floor(diff / 86400000) : 0;
}

function autoPromote() {
    const days = getTotalServiceDays();
    const ranks = AppData.isNavy ? DB.ranks_navy : DB.ranks_army;
    const promotedRank = ranks.reduce((acc, rank) => (rank.days <= days ? rank : acc), ranks[0]);
    if (promotedRank.id > AppData.currentRankId) {
        AppData.currentRankId = promotedRank.id;
    }
}

function updateDisplay() {
    const days = getTotalServiceDays();
    autoPromote();

    let perc = 0;
    const ranks = AppData.isNavy ? DB.ranks_navy : DB.ranks_army;
    const maxDaysInRanks = ranks[ranks.length - 1].days;

    if (AppData.serviceType === 'mobilized') {
        document.getElementById('days-left').textContent = '∞';
        document.getElementById('days-ratio').textContent = `${days} днів у строю`;
        perc = days > 0 ? Math.min(100, Math.round((days / maxDaysInRanks) * 100)) : 0;
    } else {
        const total = AppData.contractYears * 365;
        perc = Math.min(100, Math.round((days / total) * 100));
        document.getElementById('days-ratio').textContent = `${days} / ${total} днів`;
        document.getElementById('days-left').textContent = days >= total ? 'Дембель!' : (total - days);
    }

    document.getElementById('percent-number').textContent = Math.floor(perc);
    updateProgressCircle(perc);

    document.getElementById('counter-years').textContent = Math.floor(days / 365);
    document.getElementById('counter-months').textContent = Math.floor((days % 365) / 30);
    document.getElementById('counter-days').textContent = days % 30;

    document.getElementById('user-name-display').textContent = AppData.name;
    updateRankDisplay();
    calculateKKD(); // оновлюємо міні-KKD
}

function calculateKKD() {
    const savedSkills = JSON.parse(localStorage.getItem('DzhuraSkills') || '[]');
    let kkd = 10 + (AppData.currentRankId - 1) * 4 + savedSkills.length * 16;
    kkd = Math.min(100, kkd);

    document.getElementById('kkd-bar')?.style = `width: ${kkd}%;`;
    document.getElementById('kkd-value')?.textContent = `${kkd}%`;
    document.getElementById('kkd-mini-display')?.textContent = `${kkd}%`;
    return kkd;
}

function updateAchievement() {
    const kkd = calculateKKD();
    const t = document.getElementById('achieve-title');
    const d = document.getElementById('achieve-desc');
    if (kkd < 30) { t.textContent = "Новобранець"; d.textContent = "Шлях тільки починається."; }
    else if (kkd < 70) { t.textContent = "Досвідчений"; d.textContent = "Ви впевнено тримаєте стрій."; }
    else { t.textContent = "Морський вовк"; d.textContent = "Легенда підрозділу."; }
}

function updateRankDisplay() {
    const ranks = AppData.isNavy ? DB.ranks_navy : DB.ranks_army;
    const rank = ranks.find(r => r.id === AppData.currentRankId);
    document.getElementById('rank-display').textContent = rank ? rank.title.toUpperCase() : 'РЕКРУТ';
}

function renderSkills() {
    const list = document.getElementById('skills-list');
    if (!list) return;
    list.innerHTML = '';
    const saved = JSON.parse(localStorage.getItem('DzhuraSkills') || '[]');

    DB.skills.forEach(skill => {
        const active = saved.includes(skill.id);
        const div = document.createElement('div');
        div.className = 'glass-card p-4 rounded-3xl flex items-center justify-between mb-3 transition-all';
        div.innerHTML = `
            <div class="flex items-center gap-4">
                <i data-lucide="${skill.icon}" class="w-8 h-8 ${active ? 'text-blue-500' : 'opacity-30'}"></i>
                <div>
                    <p class="font-bold">${skill.title}</p>
                    <p class="text-xs opacity-50">${skill.description}</p>
                </div>
            </div>
            <input type="checkbox" onchange="toggleSkill('${skill.id}')" ${active ? 'checked' : ''} class="w-6 h-6 rounded-lg accent-blue-500">
        `;
        list.appendChild(div);
    });
    lucide.createIcons();
}

function toggleSkill(id) {
    let saved = JSON.parse(localStorage.getItem('DzhuraSkills') || '[]');
    if (saved.includes(id)) {
        saved = saved.filter(i => i !== id);
    } else {
        saved.push(id);
    }
    localStorage.setItem('DzhuraSkills', JSON.stringify(saved));
    calculateKKD();
    updateAchievement();
}

function renderMedals() {
    const list = document.getElementById('medals-list');
    if (!list) return;
    list.innerHTML = '';
    const days = getTotalServiceDays();
    const skillsCount = JSON.parse(localStorage.getItem('DzhuraSkills') || '[]').length;
    const kkd = calculateKKD();

    MEDALS.forEach(m => {
        const achieved = m.check({ days, skills: skillsCount, kkd });
        const div = document.createElement('div');
        div.className = `glass-card p-4 rounded-2xl flex flex-col items-center ${achieved ? '' : 'opacity-30'}`;
        div.innerHTML = `
            <i data-lucide="medal" class="w-12 h-12 ${achieved ? 'text-yellow-500' : 'text-gray-500'}"></i>
            <p class="text-xs font-bold mt-2">${m.title}</p>
        `;
        list.appendChild(div);
    });
    lucide.createIcons();
}

function renderStats() {
    const list = document.getElementById('stats-list');
    if (!list) return;
    list.innerHTML = '';
    const days = getTotalServiceDays();
    const skillsCount = JSON.parse(localStorage.getItem('DzhuraSkills') || '[]').length;
    const kkd = calculateKKD();

    const stats = [
        { icon: 'calendar-days', title: 'Днів служби', value: days },
        { icon: 'clock', title: 'Років / Місяців / Днів', value: `${Math.floor(days / 365)} / ${Math.floor((days % 365) / 30)} / ${days % 30}` },
        { icon: 'trending-up', title: 'Бойовий ККД', value: `${kkd}%` },
        { icon: 'zap', title: 'Навичок освоєно', value: skillsCount },
        { icon: 'shield', title: 'Поточне звання', value: document.getElementById('rank-display').textContent }
    ];

    stats.forEach(item => {
        const div = document.createElement('div');
        div.className = 'glass-card p-5 rounded-3xl flex items-center gap-5';
        div.innerHTML = `
            <i data-lucide="${item.icon}" class="w-10 h-10 text-blue-400"></i>
            <div>
                <p class="text-sm opacity-60">${item.title}</p>
                <p class="text-2xl font-bold">${item.value}</p>
            </div>
        `;
        list.appendChild(div);
    });
    lucide.createIcons();
}

function generateRankOptions() {
    const sel = document.getElementById('input-rank');
    if (!sel) return;
    sel.innerHTML = '';
    const ranks = AppData.isNavy ? DB.ranks_navy : DB.ranks_army;
    ranks.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r.id;
        opt.textContent = r.title;
        sel.appendChild(opt);
    });
    sel.value = AppData.currentRankId;
}

function setServiceType(type, save = true) {
    AppData.serviceType = type;
    const mobilizedBtn = document.getElementById('btn-mobilized');
    const contractBtn = document.getElementById('btn-contract');
    mobilizedBtn.className = type === 'mobilized' ? 'p-3 rounded-xl bg-blue-600 text-white text-sm font-bold transition-smooth' : 'p-3 rounded-xl border border-white/10 text-sm font-bold opacity-60 transition-smooth';
    contractBtn.className = type === 'contract' ? 'p-3 rounded-xl bg-blue-600 text-white text-sm font-bold transition-smooth' : 'p-3 rounded-xl border border-white/10 text-sm font-bold opacity-60 transition-smooth';
    document.getElementById('contract-duration-block').classList.toggle('hidden', type !== 'contract');

    // Виділення активного терміну контракту
    document.querySelectorAll('.contract-year-btn').forEach(btn => {
        btn.classList.toggle('bg-blue-600 text-white', btn.dataset.year == AppData.contractYears);
        btn.classList.toggle('bg-black/30', btn.dataset.year != AppData.contractYears);
    });

    if (save) saveData(false);
    updateDisplay();
}

function setContractYears(y) {
    AppData.contractYears = Number(y);
    document.querySelectorAll('.contract-year-btn').forEach(btn => {
        btn.classList.toggle('bg-blue-600 text-white', btn.dataset.year == y);
        btn.classList.toggle('bg-black/30', btn.dataset.year != y);
    });
    updateDisplay();
    saveData(false);
}

function toggleNavyRanks(checked) {
    AppData.isNavy = checked;
    generateRankOptions();
    autoPromote(); // перерахунок при зміні ВМС/ЗСУ
    updateRankDisplay();
    updateDisplay();
    saveData(false);
}

function toggleTheme() {
    const themes = ['dark', 'light', 'oled'];
    const icons = { dark: 'moon', light: 'sun', oled: 'moon' };
    const index = themes.indexOf(AppData.theme);
    AppData.theme = themes[(index + 1) % themes.length];

    document.body.className = `theme-${AppData.theme} min-h-screen w-full relative font-inter`;
    const icon = document.querySelector('#theme-icon');
    if (icon) icon.setAttribute('data-lucide', icons[AppData.theme]);
    lucide.createIcons();
    saveData(false);
}

function saveData(alertMe = true) {
    AppData.name = document.getElementById('input-name').value.trim() || 'Джура';
    AppData.startDate = document.getElementById('input-date').value;
    AppData.currentRankId = Number(document.getElementById('input-rank').value);

    localStorage.setItem('DzhuraAppData', JSON.stringify(AppData));
    updateDisplay();
    if (alertMe) alert('Дані збережено!');
}

function loadData() {
    const saved = localStorage.getItem('DzhuraAppData');
    if (saved) {
        AppData = { ...AppData, ...JSON.parse(saved) };
    }

    document.getElementById('input-name').value = AppData.name;
    document.getElementById('input-date').value = AppData.startDate;
    document.getElementById('is-navy').checked = AppData.isNavy;

    document.body.className = `theme-${AppData.theme} min-h-screen w-full relative font-inter`;
    const icon = document.querySelector('#theme-icon');
    if (icon) icon.setAttribute('data-lucide', AppData.theme === 'light' ? 'sun' : 'moon');

    generateRankOptions();
    setServiceType(AppData.serviceType, false);

    updateDisplay();
    toggleView(localStorage.getItem('DzhuraLastView') || 'timer');
    lucide.createIcons({
    attrs: { 'pointer-events': 'none' } // глобально для всіх іконок
});

// Оновлення кожну хвилину (для точності при зміні дати)
setInterval(updateDisplay, 60000);

window.addEventListener('load', () => {
    loadData();
    updateDisplay();
});