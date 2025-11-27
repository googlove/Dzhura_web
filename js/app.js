// --- DATA BASE (JSON) ---
const DB = {
    ranks_army: [
        { id: 1, title: "Рекрут", days: 0 }, 
        { id: 2, title: "Солдат", days: 120 }, { id: 3, title: "Старший солдат", days: 180 },
        { id: 4, title: "Молодший сержант", days: 360 }, { id: 5, title: "Сержант", days: 730 }, 
        { id: 6, title: "Старший сержант", days: 1095 }, { id: 7, title: "Головний сержант", days: 1460 }, 
        { id: 8, title: "Штаб-сержант", days: 1825 }, { id: 9, title: "Майстер-сержант", days: 2190 },
        { id: 10, title: "Старший майстер-сержант", days: 2555 }, { id: 11, title: "Головний майстер-сержант", days: 2920 },
        { id: 12, title: "Молодший лейтенант", days: 1460 }, { id: 13, title: "Лейтенант", days: 1825 }, 
        { id: 14, title: "Старший лейтенант", days: 2190 }, { id: 15, title: "Капітан", days: 2555 }, 
        { id: 16, title: "Майор", days: 2920 }, { id: 17, title: "Підполковник", days: 3285 }, { id: 18, title: "Полковник", days: 3650 }
    ],
    ranks_navy: [
        { id: 1, title: "Рекрут", days: 0 }, 
        { id: 2, title: "Матрос", days: 120 }, { id: 3, title: "Старший матрос", days: 180 },
        { id: 4, title: "Старшина 2 статті", days: 360 }, { id: 5, title: "Старшина 1 статті", days: 730 }, 
        { id: 6, title: "Головний старшина", days: 1095 }, { id: 7, title: "Головний корабельний старшина", days: 1460 }, 
        { id: 8, title: "Штаб-старшина", days: 1825 }, { id: 9, title: "Майстер-старшина", days: 2190 },
        { id: 10, title: "Старший майстер-старшина", days: 2555 }, { id: 11, title: "Головний майстер-старшина", days: 2920 },
        { id: 12, title: "Молодший лейтенант", days: 1460 }, { id: 13, title: "Лейтенант", days: 1825 }, 
        { id: 14, title: "Старший лейтенант", days: 2190 }, { id: 15, title: "Капітан", days: 2555 }, 
        { id: 16, title: "Майор", days: 2920 }, { id: 17, title: "Підполковник", days: 3285 }, { id: 18, title: "Капітан 1 рангу", days: 3650 }
    ],
    skills: [
        { id: 'medic', title: 'Бойовий медик', description: 'Надання першої допомоги та евакуація.' },
        { id: 'drone', title: 'Оператор БПЛА', description: 'Розвідка та коригування вогню.' },
        { id: 'engineer', title: 'Сапер/Інженер', description: 'Зведення укріплень, розмінування.' },
        { id: 'rpg', title: 'Оператор ПТРК/РПГ', description: 'Знищення бронетехніки.' },
        { id: 'sniper', title: 'Снайпер/Стрілець', description: 'Влучна стрільба на великі дистанції.' },
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

const STATUS_DAYS = 365; // умовна тривалість для відображення прогресу при мобілізації

// --- VIEW / NAVIGATION ---

function toggleView(viewId) {
    const views = document.querySelectorAll('.tab-content');
    views.forEach(view => view.classList.remove('active'));

    const activeView = document.getElementById(`view-${viewId}`);
    if (activeView) activeView.classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('nav-active'));
    const activeNavBtn = document.getElementById(`nav-${viewId}`);
    if (activeNavBtn) activeNavBtn.classList.add('nav-active');

    if (viewId === 'status') {
        renderSkills();
        calculateKKD();
        updateAchievement();
    }

    if (viewId === 'stats') {
        renderMonthlyStats();
    }

    localStorage.setItem('DzhuraLastView', viewId);
}

function toggleTheme() {
    let themes = ['dark', 'light', 'oled'];
    let currentThemeIndex = themes.indexOf(AppData.theme);
    let nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    AppData.theme = themes[nextThemeIndex];
    
    document.body.className = `theme-${AppData.theme} min-h-screen w-full relative`;
    document.getElementById('theme-icon').setAttribute(
        'data-lucide',
        AppData.theme === 'light' ? 'sun' : AppData.theme === 'oled' ? 'circle' : 'moon'
    );
    
    if (window.lucide) {
        lucide.createIcons();
    }
    saveData(false);
    updateDisplay(); 
}

// --- SAVE / LOAD ---

function saveData(update = true) {
    AppData.name = document.getElementById('input-name').value || 'Джура';

    const dateInputValue = document.getElementById('input-date').value;
    const now = new Date();

    if (dateInputValue) {
        const parsed = new Date(dateInputValue);
        if (!isNaN(parsed)) {
            // не дозволяємо дату в майбутньому
            AppData.startDate = parsed > now ? now : parsed;
        } else if (!AppData.startDate || isNaN(new Date(AppData.startDate))) {
            AppData.startDate = now;
        }
    } else if (!AppData.startDate || isNaN(new Date(AppData.startDate))) {
        AppData.startDate = now;
    }

    AppData.currentRankId = parseInt(document.getElementById('input-rank').value) || 1;
    AppData.isNavy = document.getElementById('is-navy').checked;
    
    if (AppData.serviceType === 'mobilized') {
        AppData.contractYears = 0;
    }

    localStorage.setItem('DzhuraAppData', JSON.stringify(AppData));
    
    document.getElementById('user-name-display').textContent = AppData.name;
    updateRankDisplay();
    if (update) {
        updateDisplay();
        alert('Дані збережено!');
    }
}

function loadData() {
    const savedData = localStorage.getItem('DzhuraAppData');
    if (savedData) {
        AppData = JSON.parse(savedData);
        AppData.startDate = new Date(AppData.startDate);
    }

    document.getElementById('input-name').value = AppData.name;
    document.getElementById('input-date').valueAsDate = AppData.startDate;
    document.getElementById('is-navy').checked = AppData.isNavy;
    
    document.body.className = `theme-${AppData.theme} min-h-screen w-full relative`;
    document.getElementById('theme-icon').setAttribute(
        'data-lucide',
        AppData.theme === 'light' ? 'sun' : AppData.theme === 'oled' ? 'circle' : 'moon'
    );
    
    if (window.lucide) {
        lucide.createIcons();
    }

    generateRankOptions(AppData.isNavy);
    document.getElementById('input-rank').value = AppData.currentRankId;

    setServiceType(AppData.serviceType, false);
    if (AppData.serviceType === 'contract') {
        setContractYears(AppData.contractYears, false);
    }
    
    renderSkills();
    updateDisplay();
    
    const lastView = localStorage.getItem('DzhuraLastView') || 'timer';
    toggleView(lastView); 
}

// --- SERVICE TYPE LOGIC ---

function setServiceType(type, save = true) {
    AppData.serviceType = type;
    const mobilizedBtn = document.getElementById('btn-mobilized');
    const contractBtn = document.getElementById('btn-contract');
    const contractBlock = document.getElementById('contract-duration-block');

    mobilizedBtn.classList.remove('bg-blue-600', 'text-white');
    contractBtn.classList.remove('bg-blue-600', 'text-white');
    mobilizedBtn.classList.add('bg-black/20', 'text-white/70');
    contractBtn.classList.add('bg-black/20', 'text-white/70');
    
    if (type === 'mobilized') {
        mobilizedBtn.classList.add('bg-blue-600', 'text-white');
        mobilizedBtn.classList.remove('bg-black/20', 'text-white/70');
        contractBlock.classList.add('hidden');
        AppData.contractYears = 0;
        document.getElementById('days-left-label').textContent = 'Днів до кінця ВС';
    } else {
        contractBtn.classList.add('bg-blue-600', 'text-white');
        contractBtn.classList.remove('bg-black/20', 'text-white/70');
        contractBlock.classList.remove('hidden');
        document.getElementById('days-left-label').textContent = 'Днів до кінця контракту';
    }

    if (save) saveData(false);
    updateDisplay();
}

function setContractYears(years, save = true) {
    AppData.contractYears = years;
    document.querySelectorAll('.contract-year-btn').forEach(btn => {
        btn.classList.remove('bg-blue-500', 'bg-blue-600', 'text-white');
        btn.classList.add('bg-black/30');
        if (parseInt(btn.dataset.year, 10) === years) {
            btn.classList.add('bg-blue-500', 'text-white');
            btn.classList.remove('bg-black/30');
        }
    });
    if (save) saveData(false);
    updateDisplay();
}

// --- RANK LOGIC ---

function generateRankOptions(isNavy) {
    const rankSelect = document.getElementById('input-rank');
    rankSelect.innerHTML = '';
    const ranks = isNavy ? DB.ranks_navy : DB.ranks_army;
    
    ranks.forEach(rank => {
        const option = document.createElement('option');
        option.value = rank.id;
        option.textContent = rank.title;
        rankSelect.appendChild(option);
    });

    rankSelect.value = AppData.currentRankId;
}

function toggleNavyRanks(isChecked) {
    AppData.isNavy = isChecked;
    generateRankOptions(isChecked);
    saveData(false);
    updateDisplay();
}

function updateRankDisplay() {
    const ranks = AppData.isNavy ? DB.ranks_navy : DB.ranks_army;
    const currentRank = ranks.find(r => r.id === AppData.currentRankId);
    document.getElementById('rank-display').textContent = currentRank ? currentRank.title.toUpperCase() : 'РЕКРУТ';
}

// --- DISPLAY & TIMER LOGIC ---

function updateDisplay() {
    updateRankDisplay();
    const now = new Date();
    const start = AppData.startDate;

    let end;
    if (AppData.serviceType === 'mobilized') {
        end = new Date(start.getFullYear() + STATUS_DAYS / 365, start.getMonth(), start.getDate());
        document.getElementById('days-left-label').textContent = 'Днів до річниці/Кінця ВС';
    } else {
        end = new Date(start.getFullYear() + AppData.contractYears, start.getMonth(), start.getDate());
        document.getElementById('days-left-label').textContent = 'Днів до кінця контракту';
    }

    const totalDurationMs = end - start;
    const totalDays = Math.ceil(totalDurationMs / (1000 * 60 * 60 * 24));
    const passedDurationMs = now - start;
    const remainingDurationMs = end - now;

    // Якщо служба ще не почалась
    if (now < start) {
        document.getElementById('percent-display').innerHTML =
            `0<span class="text-2xl text-blue-500">%</span>`;
        document.getElementById('days-left').textContent = totalDays;
        document.getElementById('days-ratio').textContent = `0 / ${totalDays} днів`;
        document.getElementById('counter-years').textContent = 0;
        document.getElementById('counter-months').textContent = 0;
        document.getElementById('counter-days').textContent = 0;
        generateRiceMarks(0);
        setTimeout(updateDisplay, 1000);
        return;
    }

    let passedDays = Math.floor(passedDurationMs / (1000 * 60 * 60 * 24));
    let remainingDays = Math.ceil(remainingDurationMs / (1000 * 60 * 60 * 24));

    if (remainingDurationMs <= 0) {
        // Дембель
        passedDays = totalDays;
        remainingDays = 0;
        document.getElementById('percent-display').innerHTML = `100<span class="text-2xl text-green-500">%</span>`;
        document.getElementById('days-left').textContent = '0';
        document.getElementById('progress-label').textContent = 'ДЕМБЕЛЬ!';
        document.getElementById('days-ratio').textContent = `${passedDays} / ${totalDays} днів`;
        document.getElementById('counter-years').textContent = Math.floor(totalDays / 365);
        document.getElementById('counter-months').textContent = (Math.floor(totalDays / 30) % 12);
        document.getElementById('counter-days').textContent = (totalDays % 30);
        generateRiceMarks(100);
        return;
    }

    const percentage = Math.min(100, Math.floor((passedDurationMs / totalDurationMs) * 100));
    document.getElementById('percent-display').innerHTML =
        `${percentage}<span class="text-2xl text-blue-500">%</span>`;
    document.getElementById('days-left').textContent = remainingDays;
    document.getElementById('days-ratio').textContent = `${passedDays} / ${totalDays} днів`;

    // Розбиваємо на роки/місяці/дні
    let tempDate = new Date(start.getTime());
    
    let years = 0;
    while (new Date(tempDate.getFullYear() + 1, tempDate.getMonth(), tempDate.getDate()) <= now) {
        tempDate.setFullYear(tempDate.getFullYear() + 1);
        years++;
    }
    
    let months = 0;
    while (new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, tempDate.getDate()) <= now) {
        tempDate.setMonth(tempDate.getMonth() + 1);
        months++;
    }
    
    const daysInMonth = Math.floor((now - tempDate) / (1000 * 60 * 60 * 24));
    
    document.getElementById('counter-years').textContent = years;
    document.getElementById('counter-months').textContent = months;
    document.getElementById('counter-days').textContent = daysInMonth;

    generateRiceMarks(percentage);
    setTimeout(updateDisplay, 1000);
}

function generateRiceMarks(percentage) {
    const totalMarks = 360;
    const maxVisibleMarks = Math.floor(totalMarks * (percentage / 100));
    const riceCircle = document.getElementById('rice-circle');
    riceCircle.innerHTML = '';
    
    for (let i = 0; i < totalMarks; i++) {
        const isPassed = i < maxVisibleMarks;
        const angle = i * (360 / totalMarks);
        
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute('x1', '150');
        line.setAttribute('y1', '10');
        line.setAttribute('x2', '150');
        line.setAttribute('y2', isPassed ? '30' : '20');
        line.setAttribute('transform', `rotate(${angle}, 150, 150)`);
        line.setAttribute('stroke-width', isPassed ? '2' : '1');
        line.setAttribute('stroke-linecap', 'round');
        line.classList.add(isPassed ? 'rice-mark-active' : 'rice-mark-inactive');
        
        if (!isPassed) {
            line.style.opacity = '0.7';
        }

        riceCircle.appendChild(line);
    }
}

// --- STATUS: KKD, Skills, Achievements ---

function calculateKKD() {
    let kkd = 10;
    
    const ranks = AppData.isNavy ? DB.ranks_navy : DB.ranks_army;
    const currentRank = ranks.find(r => r.id === AppData.currentRankId);
    if (currentRank) {
        kkd += (currentRank.id - 1) * 4;
    }

    const selectedSkills = document.querySelectorAll('#skills-list input:checked').length;
    kkd += selectedSkills * 16; 
    kkd = Math.min(100, kkd);

    const kkdValue = document.getElementById('kkd-value');
    const kkdBar = document.getElementById('kkd-bar');
    const kkdMiniDisplay = document.getElementById('kkd-mini-display');

    kkdValue.textContent = `${kkd}%`;
    kkdBar.style.width = `${kkd}%`;
    kkdMiniDisplay.textContent = `${kkd}%`;
}

function updateAchievement() {
    const ranks = AppData.isNavy ? DB.ranks_navy : DB.ranks_army;
    const currentRank = ranks.find(r => r.id === AppData.currentRankId) || ranks[0];
    
    let title, desc;
    
    if (currentRank.id === 1) {
        title = "Новобранець"; desc = "Шлях тільки починається. Вчися і слухай.";
    } else if (currentRank.id >= 2 && currentRank.id <= 3) {
        title = "Боєць-початківець"; desc = "Завершено первинну підготовку. Базові навички засвоєно.";
    } else if (currentRank.id >= 4 && currentRank.id <= 7) {
        title = "Молодший Командир"; desc = "Керуєш малими підрозділами. Відповідальність зростає.";
    } else if (currentRank.id >= 8 && currentRank.id <= 11) {
        title = "Майстер-сержант"; desc = "Основа війська. Досвід, знання та стійкість.";
    } else if (currentRank.id >= 12 && currentRank.id <= 15) {
        title = "Тактик"; desc = "Успішне планування та виконання завдань на низовому рівні.";
    } else if (currentRank.id >= 16) {
        title = "Стратег"; desc = "Високий рівень управління та прийняття рішень.";
    } else {
        title = "Невідомий статус"; desc = "Оновіть ваше звання в налаштуваннях.";
    }
    
    document.getElementById('achieve-title').textContent = title;
    document.getElementById('achieve-desc').textContent = desc;
}

function renderSkills() {
    const skillsList = document.getElementById('skills-list');
    if (!skillsList) return;
    skillsList.innerHTML = '';

    let savedSkills = JSON.parse(localStorage.getItem('DzhuraSkills') || '[]');
    
    DB.skills.forEach(skill => {
        const isChecked = savedSkills.includes(skill.id);
        const skillItem = document.createElement('div');
        skillItem.className = 'flex items-center justify-between p-3 bg-white/5 rounded-xl';
        skillItem.innerHTML = `
            <div class="flex items-start gap-3">
                <i data-lucide="shield-check" class="w-5 h-5 text-green-400 mt-0.5"></i>
                <div>
                    <p class="font-medium">${skill.title}</p>
                    <p class="text-xs opacity-50">${skill.description}</p>
                </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" data-skill-id="${skill.id}" ${isChecked ? 'checked' : ''} class="sr-only custom-checkbox">
                <div class="w-10 h-6 bg-gray-600 rounded-full transition-all duration-300 flex items-center justify-center">
                    <i data-lucide="check" class="w-4 h-4 text-white ${isChecked ? 'opacity-100' : 'opacity-0'} transition-opacity"></i>
                </div>
            </label>
        `;
        skillsList.appendChild(skillItem);
    });

    if (window.lucide) {
        lucide.createIcons();
    }

    // навішуємо обробники після вставки
    document.querySelectorAll('#skills-list input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => toggleSkill(cb));
    });
}

function toggleSkill(checkbox) {
    const skillId = checkbox.dataset.skillId;
    let savedSkills = JSON.parse(localStorage.getItem('DzhuraSkills') || '[]');
    
    if (checkbox.checked) {
        if (!savedSkills.includes(skillId)) {
            savedSkills.push(skillId);
        }
    } else {
        savedSkills = savedSkills.filter(id => id !== skillId);
    }
    
    localStorage.setItem('DzhuraSkills', JSON.stringify(savedSkills));
    calculateKKD();
}

// --- MONTHLY STATS ---

/**
 * Рахує скільки днів служби у кожному місяці від початку до сьогодні.
 * Повертає масив: [{ label: 'січ. 2025', days: 10 }, ...]
 */
function computeMonthlyStats(startDate, endDate) {
    const stats = [];
    const msPerDay = 1000 * 60 * 60 * 24;

    if (endDate <= startDate) return stats;

    // Починаємо з 1-го числа місяця початку служби
    let current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const last = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

    while (current <= last && stats.length < 24) { // до 24 місяців
        const monthStart = new Date(current);
        const monthEnd = new Date(current.getFullYear(), current.getMonth() + 1, 1);

        const effectiveStart = monthStart < startDate ? startDate : monthStart;
        const effectiveEnd = monthEnd > endDate ? endDate : monthEnd;

        let days = 0;
        if (effectiveEnd > effectiveStart) {
            days = Math.ceil((effectiveEnd - effectiveStart) / msPerDay);
        }

        const label = monthStart.toLocaleString('uk-UA', { month: 'short', year: 'numeric' });

        stats.push({ label, days });

        current.setMonth(current.getMonth() + 1);
    }

    return stats;
}

function renderMonthlyStats() {
    const statsList = document.getElementById('stats-list');
    const statsSummary = document.getElementById('stats-summary');
    if (!statsList || !statsSummary) return;

    const now = new Date();
    const start = AppData.startDate;
    const stats = computeMonthlyStats(start, now);

    statsList.innerHTML = '';
    
    if (!stats.length) {
        statsSummary.textContent = 'Служба ще не почалась або дані некоректні.';
        return;
    }

    const totalDays = stats.reduce((sum, s) => sum + s.days, 0);
    const maxDays = stats.reduce((max, s) => Math.max(max, s.days), 0);

    statsSummary.textContent = `Місяців у розрахунку: ${stats.length}. Загалом днів служби: ${totalDays}.`;

    stats.forEach(item => {
        const row = document.createElement('div');
        row.className = 'stats-row';

        const widthPercent = maxDays > 0 ? (item.days / maxDays) * 100 : 0;

        row.innerHTML = `
            <div class="stats-month-label">${item.label}</div>
            <div class="stats-bar-wrapper">
                <div class="stats-bar" style="width: ${widthPercent}%;"></div>
            </div>
            <div class="stats-days-label">${item.days}</div>
        `;

        statsList.appendChild(row);
    });
}

// --- INITIALIZATION ---

window.onload = function () {
    loadData();
    // для надійності активуємо таймер-вкладку
    const navTimer = document.getElementById('nav-timer');
    if (navTimer) navTimer.click();
};
