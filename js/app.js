// --- КОНСТАНТИ ТА ДАНІ ---
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
        { id: 18, title: "Капітан 1 рангу", days: 3650 }
    ],
    skills: [
        { id: 'komendor', category: 'Бойові / палуба', icon: 'shield', title: 'Комендор', description: 'Оборона корабля.' },
        { id: 'motorist', category: 'Машинна команда', icon: 'cog', title: 'Моторист', description: 'Обслуговування двигунів.' }
        // ... інші скіли можна додати сюди
    ],
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
        isNavy: true, // Вмикаємо за замовчуванням для тесту
        patchId: 'vms'
    },
    buddies: [], 
    activeProfileId: 'user', 
    theme: 'dark'
};

// --- ФУНКЦІЇ ТАЙМЕРА ---
function updateMasterTimer() {
    const profile = AppData.activeProfileId === 'user' ? AppData.user : AppData.buddies[AppData.activeProfileId];
    if (!profile) return;

    const start = new Date(profile.startDate);
    const now = new Date();
    
    // Дембель: 18 місяців
    const end = new Date(start);
    end.setMonth(start.getMonth() + 18); 

    const totalDiff = end - start;
    const passedDiff = now - start;
    const remainingDiff = end - now;

    if (remainingDiff <= 0) {
        if(document.getElementById('percent-display')) document.getElementById('percent-display').innerHTML = "100%";
        return;
    }

    // Відсотки
    const percent = Math.min(100, (passedDiff / totalDiff) * 100).toFixed(2);
    const percentDisplay = document.getElementById('percent-display');
    if (percentDisplay) {
        percentDisplay.innerHTML = `${Math.floor(percent)}<span class="text-2xl text-blue-500">%</span>`;
    }

    // Розрахунок часу
    const diff = remainingDiff;
    const secs = Math.floor(diff / 1000) % 60;
    const mins = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(daysTotal / 365);
    const months = Math.floor((daysTotal % 365) / 30);
    const weeks = Math.floor(((daysTotal % 365) % 30) / 7);
    const days = ((daysTotal % 365) % 30) % 7;

    // Оновлення UI елементів
    updateEl('counter-years', years);
    updateEl('counter-months', months);
    updateEl('counter-days', daysTotal); // Показуємо загальну кількість днів у центральному блоці
    
    updateEl('t-years', years);
    updateEl('t-months', months);
    updateEl('t-weeks', weeks);
    updateEl('t-days', days);
    updateEl('t-hours', hours.toString().padStart(2, '0'));
    updateEl('t-mins', mins.toString().padStart(2, '0'));
    updateEl('detailed-timer-seconds', secs.toString().padStart(2, '0'));
    
    // Оновлення днів до дембеля (нижня картка)
    updateEl('days-left', daysTotal);
}

// --- УТИЛІТИ ---
function updateEl(id, val) {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
}

function toggleView(viewId) {
    document.querySelectorAll('.tab-content').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(`view-${viewId}`);
    if (target) target.classList.add('active');
    
    // Активна кнопка в навігації
    document.querySelectorAll('.nav-btn, .nav-item').forEach(n => n.classList.remove('active'));
    const navBtn = document.getElementById(`nav-${viewId}`);
    if (navBtn) navBtn.classList.add('active');

    if (viewId === 'army') renderArmy();
    if (viewId === 'calendar') renderHolidays();
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderArmy() {
    const list = document.getElementById('army-list');
    if (!list) return;
    list.innerHTML = '';
    list.innerHTML += createProfileCard('Я (Мій Таймер)', AppData.user.startDate, 'user');
    AppData.buddies.forEach((buddy, index) => {
        list.innerHTML += createProfileCard(buddy.name, buddy.startDate, index);
    });
}

function createProfileCard(name, date, id) {
    const activeClass = AppData.activeProfileId === id ? 'border-blue-500 bg-blue-500/10' : 'border-white/5';
    return `
        <div onclick="switchProfile('${id}')" class="glass-card p-4 rounded-2xl border-2 ${activeClass} flex justify-between items-center mb-3">
            <div>
                <p class="font-bold text-sm">${name}</p>
                <p class="text-[10px] opacity-50">Служить з: ${date}</p>
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

function renderHolidays() {
    const list = document.getElementById('holidays-list');
    if (!list) return;
    list.innerHTML = DB.holidays.map(h => `
        <div class="flex items-center gap-3 p-3 bg-white/5 rounded-xl mb-2">
            <div class="text-blue-400 font-bold text-xs">${h.date.split('-').reverse().join('.')}</div>
            <div class="text-sm font-medium text-white">${h.title}</div>
        </div>
    `).join('');
}

// --- ЗАПУСК ---
window.onload = () => {
    // Встановлюємо початкові дані в UI
    document.getElementById('user-name-display').innerText = AppData.user.name;
    
    // Запуск таймера
    setInterval(updateMasterTimer, 1000);
    updateMasterTimer();

    if (typeof lucide !== 'undefined') lucide.createIcons();
};

function generateRiceMarks(percent) {
    const svg = document.getElementById('rice-circle');
    if (!svg) return;
    svg.innerHTML = '';
    const radius = 140;
    const cx = 150, cy = 150;
    const totalMarks = 60;
    
    for (let i = 0; i < totalMarks; i++) {
        const angle = (i * 360 / totalMarks) * (Math.PI / 180);
        const x1 = cx + (radius - 10) * Math.cos(angle);
        const y1 = cy + (radius - 10) * Math.sin(angle);
        const x2 = cx + radius * Math.cos(angle);
        const y2 = cy + radius * Math.sin(angle);
        
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        
        const markPercent = (i / totalMarks) * 100;
        line.setAttribute("stroke", markPercent <= percent ? "#3b82f6" : "rgba(255,255,255,0.1)");
        line.setAttribute("stroke-width", "2");
        line.setAttribute("stroke-linecap", "round");
        svg.appendChild(line);
    }
}
