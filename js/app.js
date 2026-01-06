// Українські форми множини
function plural(n, one, few, many) {
    if (n % 10 === 1 && n % 100 !== 11) return one;
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return few;
    return many;
}

const forms = {
    year: ['рік', 'роки', 'років'],
    month: ['місяць', 'місяці', 'місяців'],
    day: ['день', 'дні', 'днів'],
    hour: ['година', 'години', 'годин'],
    minute: ['хвилина', 'хвилини', 'хвилин'],
    second: ['секунда', 'секунди', 'секунд']
};

const ranks = {
    army: [
        'Рекрут', 'Солдат', 'Старший солдат',
        'Молодший сержант', 'Сержант', 'Старший сержант', 'Головний сержант',
        'Штаб-сержант', 'Майстер-сержант', 'Старший майстер-сержант', 'Головний майстер-сержант',
        'Молодший лейтенант', 'Лейтенант', 'Старший лейтенант', 'Капітан',
        'Майор', 'Підполковник', 'Полковник',
        'Бригадний генерал', 'Генерал-майор', 'Генерал-лейтенант', 'Генерал'
    ],
    navy: [
        'Рекрут', 'Матрос', 'Старший матрос',
        'Старшина 2 статті', 'Старшина 1 статті', 'Головний старшина', 'Головний корабельний старшина',
        'Штаб-старшина', 'Майстер-старшина', 'Старший майстер-старшина', 'Головний майстер-старшина',
        'Молодший лейтенант', 'Лейтенант', 'Старший лейтенант', 'Капітан-лейтенант',
        'Капітан 3 рангу', 'Капітан 2 рангу', 'Капітан 1 рангу',
        'Коммодор', 'Контр-адмірал', 'Віце-адмірал', 'Адмірал'
    ]
};

// Елементи
const els = {
    serviceType: document.getElementById('serviceType'),
    startDate: document.getElementById('startDate'),
    endDate: document.getElementById('endDate'),
    endDateContainer: document.getElementById('endDateContainer'),
    salary: document.getElementById('salary'),
    watches: document.getElementById('watches'),
    themeSelect: document.getElementById('themeSelect'),
    branch: document.getElementById('branch'),
    rank: document.getElementById('rank'),
    callsign: document.getElementById('callsign'),
    unit: document.getElementById('unit'),
    bigNumber: document.getElementById('bigNumber'),
    bigText: document.getElementById('bigText'),
    infinity: document.getElementById('infinity'),
    passedTime: document.getElementById('passedTime'),
    remainingTime: document.getElementById('remainingTime'),
    remainingCard: document.getElementById('remainingCard'),
    baseEarned: document.getElementById('baseEarned'),
    watchEarned: document.getElementById('watchEarned'),
    totalEarned: document.getElementById('totalEarned'),
    displayCallsign: document.getElementById('displayCallsign'),
    displayRank: document.getElementById('displayRank'),
    displayBranch: document.getElementById('displayBranch'),
    displayUnit: document.getElementById('displayUnit'),
    vacs: {
        vac1: document.getElementById('vac1'),
        vac2: document.getElementById('vac2'),
        vacCity: document.getElementById('vacCity'),
        vacFamily: document.getElementById('vacFamily'),
        toVac1: document.getElementById('toVac1'),
        toVac2: document.getElementById('toVac2'),
        toVacCity: document.getElementById('toVacCity'),
        toVacFamily: document.getElementById('toVacFamily')
    }
};

// Табы
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(btn.dataset.tab).classList.add('active');
    });
});

// Заповнення списку звань
function populateRanks() {
    const branch = els.branch.value;
    els.rank.innerHTML = '<option value="">Оберіть звання</option>';

    if (branch && ranks[branch]) {
        ranks[branch].forEach(r => {
            const opt = document.createElement('option');
            opt.value = r;
            opt.textContent = r;
            els.rank.appendChild(opt);
        });
    }

    // Відновлення збереженого звання, якщо підходить
    const savedRank = localStorage.getItem('rank');
    if (savedRank && ranks[branch]?.includes(savedRank)) {
        els.rank.value = savedRank;
    }
}

// Оновлення відображення особистої інформації
function updatePersonalInfo() {
    els.displayCallsign.textContent = localStorage.getItem('callsign') || 'Не вказано';
    els.displayUnit.textContent = localStorage.getItem('unit') || 'Не вказано';
    els.displayRank.textContent = localStorage.getItem('rank') || 'Не вказано';

    const branch = localStorage.getItem('branch');
    let branchName = 'Не вказано';
    if (branch === 'army') branchName = 'Сухопутні війська ЗСУ';
    if (branch === 'navy') branchName = 'Військово-морські сили ЗСУ';
    els.displayBranch.textContent = branchName;
}

// Збереження/завантаження
function save() {
    localStorage.setItem('serviceType', els.serviceType.value);
    localStorage.setItem('startDate', els.startDate.value);
    localStorage.setItem('endDate', els.endDate.value);
    localStorage.setItem('salary', els.salary.value);
    localStorage.setItem('watches', els.watches.value);
    localStorage.setItem('theme', document.documentElement.dataset.theme);
    localStorage.setItem('branch', els.branch.value);
    localStorage.setItem('rank', els.rank.value);
    localStorage.setItem('callsign', els.callsign.value);
    localStorage.setItem('unit', els.unit.value);
    ['vac1', 'vac2', 'vacCity', 'vacFamily'].forEach(id => {
        localStorage.setItem(id, els.vacs[id].value);
    });
}

function load() {
    els.serviceType.value = localStorage.getItem('serviceType') || 'mobilized';
    els.startDate.value = localStorage.getItem('startDate') || '';
    els.endDate.value = localStorage.getItem('endDate') || '';
    els.salary.value = localStorage.getItem('salary') || '';
    els.watches.value = localStorage.getItem('watches') || '0';
    els.branch.value = localStorage.getItem('branch') || 'army';
    els.callsign.value = localStorage.getItem('callsign') || '';
    els.unit.value = localStorage.getItem('unit') || '';
    ['vac1', 'vac2', 'vacCity', 'vacFamily'].forEach(id => {
        els.vacs[id].value = localStorage.getItem(id) || '';
    });

    const savedTheme = localStorage.getItem('theme') || 'pixel';
    setTheme(savedTheme);
}

// Тема
function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    els.themeSelect.value = theme;
}

// Форматування часу
function formatTime(diffMs) {
    if (diffMs <= 0) return '0 секунд';

    const diff = diffMs / 1000;
    const s = Math.floor(diff % 60);
    const m = Math.floor((diff / 60) % 60);
    const h = Math.floor((diff / 3600) % 24);
    const d = Math.floor(diff / 86400);

    const years = Math.floor(d / 365);
    const months = Math.floor((d % 365) / 30);
    const days = d % 30;

    let str = '';
    if (years > 0) str += `${years} ${plural(years, ...forms.year)} `;
    if (months > 0) str += `${months} ${plural(months, ...forms.month)} `;
    if (days > 0 || years + months === 0) str += `${days} ${plural(days, ...forms.day)} `;
    str += `${h} ${plural(h, ...forms.hour)} `;
    str += `${m} ${plural(m, ...forms.minute)} `;
    str += `${s} ${plural(s, ...forms.second)}`;

    return str.trim();
}

function formatCountdown(diffMs) {
    if (diffMs <= 0) return 'Минуло';
    const d = Math.floor(diffMs / 86400000);
    const h = Math.floor((diffMs % 86400000) / 3600000);
    if (d > 0) return `${d} ${plural(d, 'день', 'дні', 'днів')} ${h} год`;
    return `${h} ${plural(h, 'година', 'години', 'годин')}`;
}

// Основне оновлення
function update() {
    const startStr = els.startDate.value;
    if (!startStr) {
        els.passedTime.textContent = 'Введіть дату початку служби';
        return;
    }

    const start = new Date(startStr);
    const now = new Date();
    const passedMs = now - start;
    const passedDays = Math.floor(passedMs / 86400000);

    // Пройшло часу
    els.passedTime.textContent = formatTime(passedMs);

    // Зарплата
    const monthly = parseFloat(els.salary.value) || 0;
    const baseEarned = Math.round(monthly * (passedDays / 30.42));
    const watches = parseInt(els.watches.value) || 0;
    const watchEarned = watches * 4000;
    const total = baseEarned + watchEarned;

    els.baseEarned.textContent = baseEarned.toLocaleString('uk-UA');
    els.watchEarned.textContent = watchEarned.toLocaleString('uk-UA');
    els.totalEarned.textContent = total.toLocaleString('uk-UA');

    // Головний лічильник
    const type = els.serviceType.value;
    if (type === 'contract' && els.endDate.value) {
        const end = new Date(els.endDate.value);
        const remainingMs = end - now;
        const remainingDays = Math.floor(remainingMs / 86400000);

        els.bigNumber.textContent = remainingDays > 0 ? remainingDays : 0;
        els.bigText.textContent = 'ДНІВ ЗАЛИШИЛОСЯ ДО ДЕМБЕЛЯ';
        els.infinity.style.display = 'none';
        els.remainingCard.style.display = 'block';
        els.remainingTime.textContent = formatTime(remainingMs);
    } else {
        els.bigNumber.textContent = passedDays;
        els.bigText.textContent = 'ДНІВ ПРОЙШЛО';
        els.infinity.style.display = type === 'mobilized' ? 'block' : 'none';
        els.remainingCard.style.display = 'none';
    }

    // Відпустки
    ['vac1', 'vac2', 'vacCity', 'vacFamily'].forEach(key => {
        const dateStr = els.vacs[key].value;
        if (dateStr) {
            const target = new Date(dateStr);
            const diff = target - now;
            els.vacs['to' + key.charAt(0).toUpperCase() + key.slice(1)].textContent = formatCountdown(diff);
        } else {
            els.vacs['to' + key.charAt(0).toUpperCase() + key.slice(1)].textContent = 'Не вказано';
        }
    });

    // Оновлення особистої інформації
    updatePersonalInfo();
}

function toggleEndDate() {
    els.endDateContainer.style.display = els.serviceType.value === 'contract' ? 'block' : 'none';
    update();
}

// Події
load();
toggleEndDate();
populateRanks();
updatePersonalInfo();
update();

els.serviceType.addEventListener('change', () => { toggleEndDate(); save(); });
els.startDate.addEventListener('change', () => { save(); update(); });
els.endDate.addEventListener('change', () => { save(); update(); });
els.salary.addEventListener('input', () => { save(); update(); });
els.watches.addEventListener('input', () => { save(); update(); });
els.themeSelect.addEventListener('change', () => {
    setTheme(els.themeSelect.value);
    save();
});
els.branch.addEventListener('change', () => { populateRanks(); save(); updatePersonalInfo(); });
els.rank.addEventListener('change', () => { save(); updatePersonalInfo(); });
els.callsign.addEventListener('input', () => { save(); updatePersonalInfo(); });
els.unit.addEventListener('input', () => { save(); updatePersonalInfo(); });
Object.keys(els.vacs).filter(k => k.length === 4 && k.startsWith('vac')).forEach(id => {
    els.vacs[id].addEventListener('change', () => { save(); update(); });
});

setInterval(update, 1000);