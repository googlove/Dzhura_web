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
        // Рядовий склад
        { id: 1, title: "Рекрут", days: 0 }, 
        { id: 2, title: "Матрос", days: 120 }, 
        { id: 3, title: "Старший матрос", days: 180 },
        
        // Молодший старшинський склад
        { id: 4, title: "Старшина 2 статті", days: 360 }, 
        { id: 5, title: "Старшина 1 статті", days: 730 }, 
        { id: 6, title: "Головний старшина", days: 1095 }, 
        
        // Старший старшинський склад
        { id: 7, title: "Головний корабельний старшина", days: 1460 }, 
        { id: 8, title: "Штаб-старшина", days: 1825 }, 
        
        // Вищий старшинський склад (майстер-старшини)
        { id: 9, title: "Майстер-старшина", days: 2190 },
        { id: 10, title: "Старший майстер-старшина", days: 2555 }, 
        { id: 11, title: "Головний майстер-старшина", days: 2920 },
        
        // Молодший офіцерський склад
        { id: 12, title: "Молодший лейтенант", days: 1460 }, 
        { id: 13, title: "Лейтенант", days: 1825 }, 
        { id: 14, title: "Старший лейтенант", days: 2190 }, 
        { id: 15, title: "Капітан-лейтенант", days: 2555 },
        
        // Старший офіцерський склад
        { id: 16, title: "Капітан 3 рангу", days: 2920 },
        { id: 17, title: "Капітан 2 рангу", days: 3285 },
        { id: 18, title: "Капітан 1 рангу", days: 3650 },

        // Вищий офіцерський склад
        { id: 19, title: "Коммодор", days: 4015 },
        { id: 20, title: "Контр-адмірал", days: 4380 },
        { id: 21, title: "Віце-адмірал", days: 4745 },
        { id: 22, title: "Адмірал", days: 5110 }
    ],
    skills: [
        // ⚓ Бойові / палубні спеціальності
        {
            id: 'komendor',
            category: 'Бойові / палуба',
            icon: 'shield',
            title: 'Комендор',
            description: 'Оборона корабля, робота з озброєнням, порядок та безпека екіпажу.'
        },
        {
            id: 'boatswain',
            category: 'Бойові / палуба',
            icon: 'anchor',
            title: 'Боцман',
            description: 'Такелаж, швартування, якірні операції, контроль палубного спорядження.'
        },
        {
            id: 'marsovy',
            category: 'Бойові / палуба',
            icon: 'binoculars',
            title: 'Марсовий',
            description: 'Спостереження за горизонтом, виявлення загроз, сигнальні прилади.'
        },

        // 🧭 Місток і керування кораблем
        {
            id: 'helm_signalman',
            category: 'Місток і керування',
            icon: 'navigation',
            title: 'Рульовий-сигнальник',
            description: 'Керування кораблем, ведення курсу, сигнали і вахтове управління.'
        },
        {
            id: 'senior_helm',
            category: 'Місток і керування',
            icon: 'compass',
            title: 'Старший рульовий-сигнальник',
            description: 'Керування у складних умовах, навчання молодшого складу, штурманська допомога.'
        },

        // 🛰 Корабельні системи, звʼязок, КБУ
        {
            id: 'operator_kbu',
            category: 'Корабельні системи / зв’язок',
            icon: 'satellite',
            title: 'Оператор КБУ',
            description: 'Дрони, зв’язок, Starlink, робота з ПК, налаштування систем керування та спостереження.'
        },
        {
            id: 'senior_operator',
            category: 'Корабельні системи / зв’язок',
            icon: 'activity',
            title: 'Старший оператор',
            description: 'РЛС, комплекси зв’язку, спостереження, контроль інформаційних систем.'
        },

        // ⚙️ Машинна команда
        {
            id: 'motorist',
            category: 'Машинна команда',
            icon: 'cog',
            title: 'Моторист',
            description: 'Пуск, контроль і обслуговування двигунів, насосів, компресорів та систем енергоживлення.'
        },
        {
            id: 'senior_motorist',
            category: 'Машинна команда',
            icon: 'gauge',
            title: 'Старший моторист',
            description: 'Обслуговування ГЕУ, ведення журналів, контроль роботи силових агрегатів.'
        },
        {
            id: 'electrician',
            category: 'Машинна команда',
            icon: 'zap',
            title: 'Електрик',
            description: 'Обслуговування освітлення, навігаційного обладнання та систем електроживлення.'
        },
        {
            id: 'senior_electrician',
            category: 'Машинна команда',
            icon: 'plug',
            title: 'Старший електрик',
            description: 'Електромережі корабля, генератори, аварійні системи, діагностика та ремонт.'
        },

        // 📦 Забезпечення
        {
            id: 'bataler',
            category: 'Забезпечення',
            icon: 'package',
            title: 'Баталер',
            description: 'Постачання продуктів, інвентарю, видача спорядження та контроль запасів на борту.'
        },

        // 🧭 Командири відділень
        {
            id: 'commander_operators',
            category: 'Командири відділень',
            icon: 'search',
            title: 'Командир відділення операторів',
            description: 'Керівництво операторами КБУ, розподіл завдань, контроль виконання та техніки.'
        },
        {
            id: 'commander_helm',
            category: 'Командири відділень',
            icon: 'radar',
            title: 'Командир рульових-сигнальників',
            description: 'Організація вахт, підготовка штурманських постів, контроль точності курсу.'
        },
        {
            id: 'commander_komendors',
            category: 'Командири відділень',
            icon: 'shield-alert',
            title: 'Командир комендорів',
            description: 'Координація корабельної охорони, безпека, організація чергувань та дій у разі тривоги.'
        },

        // 📊 Досвід / статистика
        {
            id: 'miles_helming',
            category: 'Досвід / статистика',
            icon: 'map',
            title: 'Пройдені морські милі',
            description: 'Мав реальний досвід керування кораблем на маршрутах.'
        },
        {
            id: 'watch_hours',
            category: 'Досвід / статистика',
            icon: 'clock',
            title: 'Години вахти',
            description: 'Відпрацьовано багато годин на вахті (місток / палуба / машинне).'
        },
        {
            id: 'machinery_hours',
            category: 'Досвід / статистика',
            icon: 'cpu',
            title: 'Машинні години',
            description: 'Працював у машинному відділенні, мав досвід з ГЕУ та механізмами.'
        },
        {
            id: 'docking_operations',
            category: 'Досвід / статистика',
            icon: 'anchor',
            title: 'Швартові операції',
            description: 'Брав участь у швартуванні, якірних операціях, маневруванні біля причалу.'
        },
        {
            id: 'combat_alerts',
            category: 'Досвід / статистика',
            icon: 'alarm-clock',
            title: 'Бойові тривоги',
            description: 'Має досвід відпрацювання бойових тривог на кораблі.'
        },
        {
            id: 'repairs_done',
            category: 'Досвід / статистика',
            icon: 'wrench',
            title: 'Ремонтні роботи',
            description: 'Участь у ремонтах, відновленні систем та механізмів.'
        }
    ]
}; // кінець DB
    
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
