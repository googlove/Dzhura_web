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
    startDate: new Date(),
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
    if (viewId === 'stats') { renderMonthlyStats(); }
    localStorage.setItem('DzhuraLastView', viewId);
}

function calculateKKD() {
    const savedSkills = JSON.parse(localStorage.getItem('DzhuraSkills') || '[]');
    const ranks = AppData.isNavy ? DB.ranks_navy : DB.ranks_army;
    let kkd = 10 + (AppData.currentRankId - 1) * 4 + savedSkills.length * 16;
    kkd = Math.min(100, kkd);

    const bar = document.getElementById('kkd-bar');
    const val = document.getElementById('kkd-value');
    const mini = document.getElementById('kkd-mini-display');
    if (bar) bar.style.width = kkd + '%';
    if (val) val.textContent = kkd + '%';
    if (mini) mini.textContent = kkd + '%';
    return kkd;
}

function updateAchievement() {
    const kkd = calculateKKD();
    const t = document.getElementById('achieve-title');
    const d = document.getElementById('achieve-desc');
    if (kkd < 30) { t.innerText = "Новобранець"; d.innerText = "Шлях тільки починається."; }
    else if (kkd < 70) { t.innerText = "Досвідчений"; d.innerText = "Ви впевнено тримаєте стрій."; }
    else { t.innerText = "Морський вовк"; d.innerText = "Легенда підрозділу."; }
}

function renderSkills() {
    const list = document.getElementById('skills-list');
    if (!list) return;
    list.innerHTML = '';
    const saved = JSON.parse(localStorage.getItem('DzhuraSkills') || '[]');

    DB.skills.forEach(skill => {
        const active = saved.includes(skill.id);
        const div = document.createElement('div');
        div.className = 'profile-card mb-2';
        div.innerHTML = `
            <div class="flex items-center gap-3">
                <i data-lucide="${skill.icon}" class="w-5 h-5 ${active ? 'text-blue-500' : 'opacity-30'}"></i>
                <div><p class="text-sm font-bold">${skill.title}</p><p class="text-[10px] opacity-50">${skill.description}</p></div>
            </div>
            <input type="checkbox" onchange="toggleSkill('${skill.id}')" ${active ? 'checked' : ''} class="w-5 h-5 rounded-lg accent-blue-500">
        `;
        list.appendChild(div);
    });
    lucide.createIcons();
}

function toggleSkill(id) {
    let saved = JSON.parse(localStorage.getItem('DzhuraSkills') || '[]');
    saved = saved.includes(id) ? saved.filter(i => i !== id) : [...saved, id];
    localStorage.setItem('DzhuraSkills', JSON.stringify(saved));
    calculateKKD();
}

function renderMedals() {
    const list = document.getElementById('medals-list');
    if (!list) return;
    list.innerHTML = '';
    const stats = { days: getTotalServiceDays(), skills: JSON.parse(localStorage.getItem('DzhuraSkills') || '[]').length, kkd: calculateKKD() };

    MEDALS.forEach(m => {
        const ok = m.check(stats);
        list.innerHTML += `
            <div class="glass-card p-3 rounded-2xl flex flex-col items-center opacity-${ok ? '100' : '20'}">
                <i data-lucide="medal" class="w-8 h-8 ${ok ? 'text-yellow-500' : ''}"></i>
                <p class="text-[10px] font-bold mt-1">${m.title}</p>
            </div>`;
    });
    lucide.createIcons();
}

function updateDisplay() {
    const days = getTotalServiceDays();
    const total = AppData.serviceType === 'contract' ? AppData.contractYears * 365 : 540;
    const perc = Math.min(100, (days / total) * 100).toFixed(2);

    document.getElementById('percent-display').innerHTML = `${Math.floor(perc)}<span class="text-2xl text-blue-500">%</span>`;
    document.getElementById('days-ratio').innerText = `${days} / ${total} днів`;
    document.getElementById('days-left').innerText = Math.max(0, total - days);
    
    document.getElementById('counter-years').innerText = Math.floor(days / 365);
    document.getElementById('counter-months').innerText = Math.floor((days % 365) / 30);
    document.getElementById('counter-days').innerText = days % 30;

    drawRiceCircle(perc);
    updateRankDisplay();
}

function drawRiceCircle(percent) {
    const svg = document.getElementById('rice-circle');
    if (!svg) return;
    svg.innerHTML = '';
    for (let i = 0; i < 60; i++) {
        const angle = (i * 6 - 90) * (Math.PI / 180);
        const x1 = 150 + 120 * Math.cos(angle), y1 = 150 + 120 * Math.sin(angle);
        const x2 = 150 + 135 * Math.cos(angle), y2 = 150 + 135 * Math.sin(angle);
        svg.innerHTML += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${i < (percent * 0.6) ? '#3b82f6' : 'rgba(255,255,255,0.1)'}" stroke-width="3" stroke-linecap="round" />`;
    }
}

function getTotalServiceDays() {
    const diff = new Date() - new Date(AppData.startDate);
    return diff > 0 ? Math.floor(diff / 86400000) : 0;
}

function updateRankDisplay() {
    const ranks = AppData.isNavy ? DB.ranks_navy : DB.ranks_army;
    const rank = ranks.find(r => r.id == AppData.currentRankId);
    document.getElementById('rank-display').textContent = rank ? rank.title.toUpperCase() : 'РЕКРУТ';
}

function generateRankOptions() {
    const sel = document.getElementById('input-rank');
    if (!sel) return;
    sel.innerHTML = '';
    (AppData.isNavy ? DB.ranks_navy : DB.ranks_army).forEach(r => {
        sel.innerHTML += `<option value="${r.id}">${r.title}</option>`;
    });
    sel.value = AppData.currentRankId;
}

function setServiceType(type, save = true) {
    AppData.serviceType = type;
    document.getElementById('btn-mobilized').className = type === 'mobilized' ? 'p-3 rounded-xl bg-blue-600 text-white text-sm font-bold' : 'p-3 rounded-xl border border-white/10 text-sm font-bold opacity-50';
    document.getElementById('btn-contract').className = type === 'contract' ? 'p-3 rounded-xl bg-blue-600 text-white text-sm font-bold' : 'p-3 rounded-xl border border-white/10 text-sm font-bold opacity-50';
    document.getElementById('contract-duration-block').classList.toggle('hidden', type !== 'contract');
    if (save) saveData(false);
}

function setContractYears(y) { AppData.contractYears = y; saveData(false); updateDisplay(); }

function toggleNavyRanks(v) { AppData.isNavy = v; generateRankOptions(); saveData(false); updateRankDisplay(); }

function toggleTheme() {
    const t = ['dark', 'light', 'oled'];
    AppData.theme = t[(t.indexOf(AppData.theme) + 1) % 3];
    document.body.className = `theme-${AppData.theme} min-h-screen w-full relative`;
    saveData(false);
}

function saveData(alertMe = true) {
    AppData.name = document.getElementById('input-name').value;
    AppData.startDate = document.getElementById('input-date').value;
    AppData.currentRankId = document.getElementById('input-rank').value;
    localStorage.setItem('DzhuraAppData', JSON.stringify(AppData));
    updateDisplay();
    if (alertMe) alert('Дані збережено');
}

function loadData() {
    const saved = localStorage.getItem('DzhuraAppData');
    if (saved) AppData = JSON.parse(saved);
    document.getElementById('input-name').value = AppData.name;
    document.getElementById('input-date').value = new Date(AppData.startDate).toISOString().split('T')[0];
    document.getElementById('is-navy').checked = AppData.isNavy;
    document.body.className = `theme-${AppData.theme} min-h-screen w-full relative`;
    generateRankOptions();
    setServiceType(AppData.serviceType, false);
    updateDisplay();
    toggleView(localStorage.getItem('DzhuraLastView') || 'timer');
}

window.onload = loadData;
