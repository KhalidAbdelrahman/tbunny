// Replace these placeholders with real links.
const LINKS = {
  whatsapp: 'https://wa.me/',
  store: '#buy',
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
