
// Build grid, filters, modal, fab, smooth scroll
const demoCards = [
  {title:'Product Showcase', tags:['ecom','short'], thumb:'assets/thumbnails/product_ad.jpg', video:'assets/videos/video1.mp4', badge:'Short-Form'},
  {title:'Gaming Highlights', tags:['gaming','short'], thumb:'assets/thumbnails/clutch.jpg', video:'assets/videos/video2.mp4', badge:'Gaming'},
  {title:'Urban Stories', tags:['doc','long'], thumb:'assets/thumbnails/documentary.jpg', video:'', badge:'Documentary'},
  {title:'Ecommerce Ad', tags:['ecom','ads'], thumb:'assets/thumbnails/ecommerce.jpg', video:'', badge:'Ads'},
  {title:'Color Grade Reel', tags:['grade'], thumb:'assets/thumbnails/color_grade.jpg', video:'', badge:'Grade'}
];

function buildGrid(){
  const grid = document.getElementById('grid');
  grid.innerHTML='';
  demoCards.forEach(c=>{
    const el = document.createElement('article');
    el.className='card';
    el.dataset.tags = c.tags.join(' ');
    el.innerHTML = `
      <div class="thumb"><img src="${c.thumb}" alt="${c.title}"></div>
      <div class="card-body">
        <h3>${c.title}</h3>
        <p class="muted">A short showcase to highlight our style and edits.</p>
        <div class="badge">${c.badge}</div>
      </div>
    `;
    el.addEventListener('click', ()=> openModal(c));
    grid.appendChild(el);
  });
}

function openModal(card){
  if(card.video){
    const w = window.open('', '_blank');
    w.document.write(`<title>${card.title}</title><body style="margin:0;background:#000;display:flex;align-items:center;justify-content:center;height:100vh"><video src="${card.video}" controls autoplay style="max-width:90%;max-height:90%"></video></body>`);
  } else {
    alert('No video attached. Replace demo assets/videos/*.mp4 with your videos to preview.');
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  buildGrid();
  document.querySelectorAll('.chip').forEach(ch=> ch.addEventListener('click', ()=>{
    document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    ch.classList.add('active');
    const f = ch.dataset.filter;
    document.querySelectorAll('.card').forEach(card=>{
      const tags = card.dataset.tags.split(' ');
      card.style.display = (f==='all' || tags.includes(f)) ? '' : 'none';
    });
  }));
  document.getElementById('search').addEventListener('input', e=>{
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.card').forEach(card=>{
      const t = card.querySelector('h3').innerText.toLowerCase();
      card.style.display = t.includes(q) ? '' : 'none';
    });
  });
  const fab = document.getElementById('fab');
  fab.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));
  document.querySelectorAll('.nav a').forEach(a=> a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
  }));
});
function submitForm(e){ e.preventDefault(); alert('Thank you! This demo uses mailto fallback.'); }
