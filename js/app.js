// --- КОНСТАНТИ ТА ДАНІ ---
const DB = {
    ranks_army: [
        { id: 1, title: "Рекрут", days: 0 }, { id: 2, title: "Солдат", days: 100 },
        { id: 18, title: "Полковник", days: 3650 }
    ],
    // ... ваші звання тут ...
    
    holidays: [
        { date: '05-23', title: 'День Морської піхоти' },
        { date: '07-04', title: 'День ВМС ЗСУ' },
        { date: '10-01', title: 'День захисників України' },
        { date: '12-06', title: 'День ЗСУ' },
        { date: '12-12', title: 'День Сухопутних військ' }
    ],
    patches: [
        { id: 'zsu', name: 'ЗСУ', icon: 'shield' },
        { id: 'vms', name: 'ВМС', icon: 'anchor' },
        { id: 'dshv', name: 'ДШВ', icon: 'zap' },
        { id: 'ngu', name: 'НГУ', icon: 'flame' }
    ]
};

let AppData = {
    user: {
        name: 'Мій Таймер',
        startDate: new Date().toISOString().split('T')[0],
        rankId: 1,
        isNavy: false,
        patchId: 'zsu'
    },
    buddies: [], // Масив інших військових
    activeProfileId: 'user', // 'user' або index в buddies
    theme: 'dark'
};

// --- ТАЙМЕР ДО СЕКУНД ---
function updateMasterTimer() {
    const profile = AppData.activeProfileId === 'user' ? AppData.user : AppData.buddies[AppData.activeProfileId];
    if (!profile) return;

    const start = new Date(profile.startDate);
    const now = new Date();
    
    // Припустимо дембель через 18 місяців (умовно для прикладу)
    const end = new Date(start);
    end.setMonth(start.getMonth() + 18); 

    const totalDiff = end - start;
    const passedDiff = now - start;
    const remainingDiff = end - now;

    if (remainingDiff <= 0) {
        document.getElementById('percent-display').innerHTML = "100%";
        return;
    }

    // Відсотки
    const percent = Math.min(100, (passedDiff / totalDiff) * 100).toFixed(2);
    document.getElementById('percent-display').innerHTML = `${Math.floor(percent)}<span class="text-2xl text-blue-500">%</span>`;

    // Розширений час
    const diff = remainingDiff;
    const secs = Math.floor(diff / 1000) % 60;
    const mins = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(daysTotal / 365);
    const months = Math.floor((daysTotal % 365) / 30);
    const weeks = Math.floor(((daysTotal % 365) % 30) / 7);
    const days = ((daysTotal % 365) % 30) % 7;

    // Оновлення UI
    updateEl('t-years', years);
    updateEl('t-months', months);
    updateEl('t-weeks', weeks);
    updateEl('t-days', days);
    updateEl('t-hours', hours.toString().padStart(2, '0'));
    updateEl('t-mins', mins.toString().padStart(2, '0'));
    updateEl('detailed-timer-seconds', secs.toString().padStart(2, '0'));

    // Сповіщення кожні 100 днів
    const passedDays = Math.floor(passedDiff / (1000 * 60 * 60 * 24));
    if (passedDays > 0 && passedDays % 100 === 0) {
        sendNotification(`Вітаємо! Вже ${passedDays} днів служби пройдено!`);
    }

    generateRiceMarks(Math.floor(percent));
}

// --- ФУНКЦІЇ ВІЙСЬКА (ПРОФІЛІ) ---
function renderArmy() {
    const list = document.getElementById('army-list');
    list.innerHTML = '';

    // Спершу додаємо себе як кнопку перемикання
    list.innerHTML += createProfileCard('Я (Мій Таймер)', AppData.user.startDate, 'user');

    // Додаємо побратимів
    AppData.buddies.forEach((buddy, index) => {
        list.innerHTML += createProfileCard(buddy.name, buddy.startDate, index);
    });
}

function createProfileCard(name, date, id) {
    const activeClass = AppData.activeProfileId === id ? 'border-blue-500 bg-blue-500/10' : 'border-white/5';
    return `
        <div onclick="switchProfile('${id}')" class="glass-card p-4 rounded-2xl border-2 ${activeClass} flex justify-between items-center transition-all">
            <div>
                <p class="font-bold text-sm">${name}</p>
                <p class="text-[10px] opacity-50">З: ${date}</p>
            </div>
            <i data-lucide="chevron-right" class="w-4 h-4 opacity-30"></i>
        </div>
    `;
}

function switchProfile(id) {
    AppData.activeProfileId = id;
    renderArmy();
    toggleView('timer');
}

// --- API ТРИВОГ ТА ГЕО ---
function initGeoAndAlarms() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            // Тут можна зробити fetch до API тривог по координатах
            document.getElementById('geo-location').innerText = "Київська обл.";
        });
    }
}

// --- СЛУЖБОВІ ФУНКЦІЇ ---
function updateEl(id, val) {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
}

function toggleView(viewId) {
    document.querySelectorAll('.tab-content').forEach(v => v.classList.remove('active'));
    document.getElementById(`view-${viewId}`).classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(`nav-${viewId}`).classList.add('active');
    
    if (viewId === 'army') renderArmy();
    if (viewId === 'calendar') renderHolidays();
    lucide.createIcons();
}

function renderHolidays() {
    const list = document.getElementById('holidays-list');
    list.innerHTML = DB.holidays.map(h => `
        <div class="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
            <div class="text-blue-400 font-bold text-xs">${h.date.split('-').reverse().join('.')}</div>
            <div class="text-sm font-medium">${h.title}</div>
        </div>
    `).join('');
}

// Повідомлення
function sendNotification(text) {
    if (Notification.permission === "granted") {
        new Notification("Джура ∞", { body: text });
    }
}

// Ініціалізація
setInterval(updateMasterTimer, 1000);
window.onload = () => {
    initGeoAndAlarms();
    renderArmy();
    lucide.createIcons();
    if ("Notification" in window) Notification.requestPermission();
};
