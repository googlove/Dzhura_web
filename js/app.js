// --- DATABASE ---
const DB = {
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
    holidays: [
        { date: '01-01', title: 'Хвилина мовчання', time: '09:00' },
        { date: '05-23', title: 'День Морської піхоти' },
        { date: '07-04', title: 'День ВМС ЗСУ' },
        { date: '12-06', title: 'День ЗСУ' }
    ],
    patches: [
        { id: 'vms', img: 'https://i.imgur.com/8QzQf7g.png' }, // Замініть на реальні лінки
        { id: 'marines', img: 'https://i.imgur.com/...png' }
    ]
};

let AppData = {
    activeProfileIndex: 0,
    profiles: [
        { name: 'Джура', startDate: new Date().toISOString(), rankId: 1, isNavy: true, patch: 'vms' }
    ],
    theme: 'dark'
};

// --- CORE FUNCTIONS ---

function updateTimer() {
    const p = AppData.profiles[AppData.activeProfileIndex];
    const start = new Date(p.startDate);
    const now = new Date();
    
    // Умовна тривалість 1.5 роки (548 днів)
    const end = new Date(start.getTime() + (548 * 24 * 60 * 60 * 1000));
    
    const diff = end - now;
    const passed = now - start;

    if (diff > 0) {
        const total = end - start;
        const percent = Math.floor((passed / total) * 100);
        
        document.getElementById('percent-display').innerHTML = `${percent}<span class="text-2xl text-blue-500">%</span>`;
        
        // Розрахунок детальних одиниць
        const secs = Math.floor(diff / 1000);
        const mins = Math.floor(secs / 60);
        const hours = Math.floor(mins / 60);
        const days = Math.floor(hours / 24);
        
        const y = Math.floor(days / 365);
        const m = Math.floor((days % 365) / 30);
        const w = Math.floor(((days % 365) % 30) / 7);
        const d = ((days % 365) % 30) % 7;

        document.getElementById('t-years').innerText = y;
        document.getElementById('t-months').innerText = m;
        document.getElementById('t-weeks').innerText = w;
        document.getElementById('t-days').innerText = d;
        document.getElementById('t-hours').innerText = (hours % 24).toString().padStart(2, '0');
        document.getElementById('t-mins').innerText = (mins % 60).toString().padStart(2, '0');
        document.getElementById('t-secs').innerText = (secs % 60).toString().padStart(2, '0');

        generateRiceMarks(percent);
    }
    
    requestAnimationFrame(updateTimer); // Плавність до секунд
}

// API Тривог (Приклад інтеграції)
async function fetchAlarms() {
    try {
        // Використовуйте реальний токен та API (наприклад alerts.in.ua)
        const status = "Немає тривог"; 
        document.getElementById('alarm-status').innerText = status;
        document.getElementById('alarm-dot').className = "w-2 h-2 rounded-full bg-emerald-500";
    } catch (e) {
        console.log("Alarm API Error");
    }
}

// Ініціалізація
window.onload = () => {
    // Завантаження даних...
    updateTimer();
    setInterval(fetchAlarms, 60000); // Оновлення тривог раз на хвилину
    lucide.createIcons();
};
