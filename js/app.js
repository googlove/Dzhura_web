const App = {
  data: JSON.parse(localStorage.getItem('jura')) || {
    name: 'Боєць',
    start: new Date().toISOString().split('T')[0],
    rank: 'Рекрут',
    isNavy: false,
    theme: 'light'
  },

  const App = {
ranks: {
army: ["Рекрут", "Солдат", "Старший солдат", "Молодший сержант", "Сержант", "Старший сержант", "Головний сержант", "Штаб-сержант", "Майстер-сержант", "Старший майстер-сержант", "Головний майстер-сержант", "Молодший лейтенант", "Лейтенант", "Старший лейтенант", "Капітан", "Майор", "Підполковник", "Полковник", "Бригадний генерал"],
navy: ["Рекрут", "Матрос", "Старший матрос", "Старшина 2 статті", "Старшина 1 статті", "Головний старшина", "Головний корабельний старшина", "Штаб-старшина", "Майстер-старшина", "Старший майстер-старшина", "Головний майстер-старшина", "Молодший лейтенант", "Лейтенант", "Старший лейтенант", "Капітан-лейтенант", "Капітан 3 рангу", "Капітан 2 рангу", "Капітан 1 рангу", "Коммодор"]
},
  init() {
    this.renderRanks();
    this.fill();
    this.tick();
    setInterval(()=>this.tick(),1000);
    lucide.createIcons();
  },

  tick() {
    const now = new Date();
    document.getElementById('realtime-clock').innerText =
      now.toLocaleTimeString('uk-UA');

    const start = new Date(this.data.start);
    const days = Math.max(0, Math.floor((now-start)/86400000));
    document.getElementById('main-days-counter').innerText = days;
  },

  renderRanks() {
    const sel = document.getElementById('input-rank');
    sel.innerHTML = '';
    (this.data.isNavy ? this.ranks.navy : this.ranks.army)
      .forEach(r => sel.add(new Option(r,r)));
    sel.value = this.data.rank;
  },

  toggleNavy() {
    this.data.isNavy = document.getElementById('check-navy').checked;
    this.renderRanks();
  },

  save() {
    this.data.name = in-name.value;
    this.data.start = in-date.value;
    this.data.rank = input-rank.value;
    localStorage.setItem('jura', JSON.stringify(this.data));
    UI.nav('timer');
  },

  fill() {
    in-name.value = this.data.name;
    in-date.value = this.data.start;
    check-navy.checked = this.data.isNavy;
    this.renderRanks();
  }
};

const UI = {
  nav(id) {
    document.querySelectorAll('.tab-view').forEach(v=>v.classList.add('hidden'));
    document.getElementById('view-'+id).classList.remove('hidden');
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    document.getElementById('nav-'+id).classList.add('active');
  }
};

window.onload = ()=>App.init();