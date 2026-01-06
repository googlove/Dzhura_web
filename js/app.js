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

// Елементи
const els = {
    serviceType: document.getElementById('serviceType'),
    startDate: document.getElementById('startDate'),
    endDate: document.getElementById('endDate'),
    endDateContainer: document.getElementById('endDateContainer'),
    salary: document.getElementById('salary'),
    bigNumber: document.getElementById('bigNumber'),
    bigText: document.getElementById('bigText'),
    infinity: document.getElementById('infinity'),
    passedTime: document.getElementById('passedTime'),
    remainingTime: document.getElementById('remainingTime'),
    remainingCard: document.getElementById('remainingCard'),
    earned: document.getElementById('earned'),
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

// Збереження/завантаження з localStorage
function save() {
    localStorage.setItem('serviceType', els.serviceType.value);
    localStorage.setItem('startDate', els.startDate.value);
    localStorage.setItem('endDate', els.endDate.value);
    localStorage.setItem('salary', els.salary.value);
    ['vac1', 'vac2', 'vacCity', 'vacFamily'].forEach(id => {
        localStorage.setItem(id, els.vacs[id].value);
    });
}

function load() {
    els.serviceType.value = localStorage.getItem('serviceType') || 'mobilized';
    els.startDate.value = localStorage.getItem('startDate') || '';
    els.endDate.value = localStorage.getItem('endDate') || '';
    els.salary.value = localStorage.getItem('salary') || '';
    ['vac1', 'vac2', 'vacCity', 'vacFamily'].forEach(id => {
        els.vacs[id].value = localStorage.getItem(id) || '';
    });
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

    // Пройшло часу
    els.passedTime.textContent = formatTime(passedMs);

    // Зарплата
    const monthly = parseFloat(els.salary.value) || 0;
    const passedDays = Math.floor(passedMs / 86400000);
    const earnedApprox = Math.round(monthly * (passedDays / 30));
    els.earned.textContent = earnedApprox.toLocaleString('uk-UA');

    // Головний лічильник та ∞
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
        const passedDays = Math.floor(passedMs / 86400000);
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
}

// Показ/приховування поля дати дембеля
function toggleEndDate() {
    els.endDateContainer.style.display = els.serviceType.value === 'contract' ? 'block' : 'none';
    update();
}

// Події
load();
toggleEndDate();

els.serviceType.addEventListener('change', () => { toggleEndDate(); save(); });
els.startDate.addEventListener('change', () => { save(); update(); });
els.endDate.addEventListener('change', () => { save(); update(); });
els.salary.addEventListener('input', () => { save(); update(); });
Object.keys(els.vacs).filter(k => k.startsWith('vac') && k.length === 4).forEach(id => {
    els.vacs[id].addEventListener('change', () => { save(); update(); });
});

// Оновлення кожну секунду
setInterval(update, 1000);
update();