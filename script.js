// Replace the placeholder links (Messenger, Instagram) with real ones.
const LINKS = {
  messenger: 'https://m.me/', // TODO: use the TBunny page username, e.g. https://m.me/<page>
  noon: 'https://www.noon.com/egypt-en/tbunny-kids-shampoo-3-in-1-tear-free-sulfate-free-shampoo-conditioner-and-shower-gel-400ml/Z27B190BBF1A944F401A0Z/p/?o=ce8063a225ae7c9a',
  instagram: 'https://instagram.com/',
};

document.querySelectorAll('[data-buy]').forEach(a => { a.href = LINKS[a.dataset.buy]; });
document.getElementById('yr').textContent = new Date().getFullYear();

// Language toggle: English text is the default; Arabic lives in data-ar.
const nodes = [...document.querySelectorAll('[data-ar]')];
nodes.forEach(n => { n.dataset.en = n.textContent; });
const btn = document.getElementById('lang');
function setLang(lang) {
  const ar = lang === 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir = ar ? 'rtl' : 'ltr';
  nodes.forEach(n => { n.textContent = ar ? n.dataset.ar : n.dataset.en; });
  btn.textContent = ar ? 'English' : 'عربي';
  localStorage.setItem('tbunny-lang', lang);
}
btn.addEventListener('click', () => setLang(document.documentElement.lang === 'ar' ? 'en' : 'ar'));
if (localStorage.getItem('tbunny-lang') === 'ar') setLang('ar');

// Reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Show the sticky buy bar after the hero, hide it at the Buy section
const bar = document.getElementById('sticky');
const hero = document.querySelector('.hero'), buy = document.getElementById('buy');
const vis = { hero: true, buy: false };
const barIO = new IntersectionObserver(es => {
  es.forEach(e => { vis[e.target === hero ? 'hero' : 'buy'] = e.isIntersecting; });
  bar.classList.toggle('show', !vis.hero && !vis.buy);
});
barIO.observe(hero); barIO.observe(buy);
