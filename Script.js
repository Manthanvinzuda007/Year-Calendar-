<script>
/* ============================================================
   DATA
============================================================ */
const festivals = {
  /* ── JANUARY ── */
  "1-1":  { name:"Happy New Year 2026",        theme:"newyear",      emoji:"🎆", desc:"Nava Varsh ni shubhkaamnao! Nav umango, nav sapna, nav sankalpo sathe 2026 nu swagat karo." },
  "1-14": { name:"Uttarayan / Makar Sankranti", theme:"uttarayan",   emoji:"🪁", desc:"Kai Po Che! Aakash ma rang-berangi patangoni urmilo. Tilgud ghya god ghya — meet maano ne mithi vaato karo." },
  "1-26": { name:"Republic Day",               theme:"republic",     emoji:"🇮🇳", desc:"Bharatiya Sanvidhan no Gaurav Divas. Lal Qila par Tirango laherate, desh-bhakti nu maahol, sena ni parade." },
  /* ── FEBRUARY ── */
  "2-2":  { name:"Vasant Panchami",            theme:"spring",       emoji:"🌼", desc:"Maa Saraswatini puja, vidhya ane kala no utsav. Peela rang dharan karo, new beginnings sharu karo." },
  "2-14": { name:"Valentine's Day",            theme:"valentine",    emoji:"💕", desc:"Prem no din! Premio ek-beejane pyaar ane care jatave chhe. Roses, chocolates ane dil bhari vaato." },
  "2-15": { name:"Mahashivratri",              theme:"shivratri",    emoji:"🕉️", desc:"Om Namah Shivay. Ratri ma Bhagwan Mahaadev ni ardh-ratri puja. Bilvapatr, dhatura, ane Gangajal no abhishek." },
  /* ── MARCH ── */
  "3-3":  { name:"Holika Dahan",               theme:"holika",       emoji:"🔥", desc:"Burai par bhalaai no vijay. Holika dahan sathe asatya no naash. Agni ni pavitri jyot pragatay che." },
  "3-4":  { name:"Holi — Rang Panchami",       theme:"holi",         emoji:"🎨", desc:"Rango no mahamahostsav! Gulal, abir ane pichkari sathe premno rang chadhavo. Braj ki Holi jai ho!" },
  "3-20": { name:"Navroz — Parsi New Year",    theme:"navroz",       emoji:"🌸", desc:"Parsi samudayano navu varsh. Suraj, phool ane khushboo sathe navi shuruaat. Navroz Mubarak!" },
  "3-23": { name:"Shaheed Diwas",              theme:"shaheed",      emoji:"🕯️", desc:"Shaheed-e-Aazam Bhagat Singh, Sukhdev ane Rajguru ne koti koti naman. Unki shahadat ko hum salaam karte hain." },
  "3-31": { name:"Eid ul-Fitr",                theme:"eid",          emoji:"☪️", desc:"Ramzan maheena baad Eid ni khushi! Chaand raat, seviyan, ibadat ane bhaichara. Eid Mubarak!" },
  /* ── APRIL ── */
  "4-6":  { name:"Ram Navami",                 theme:"ramnavami",    emoji:"🏹", desc:"Maryada Purushottam Shri Ram no pragatya utsav. Jai Shri Ram! Bhakti, kirtan ane prasad no divas." },
  "4-13": { name:"Baisakhi",                   theme:"baisakhi",     emoji:"🌾", desc:"Punjabi navu varsh ane Khalsa Panth no sthapna divas. Bhangra, gidda ane sarso na kheto ni lehraan!" },
  "4-14": { name:"Ambedkar Jayanti",           theme:"ambedkar",     emoji:"⚖️", desc:"Bharatiya Sanvidhan na rachayita Dr. Babasaheb Ambedkar ni 135mi Jayanti. Samanta, bandhutvanu aadarsh." },
  /* ── MAY ── */
  "5-12": { name:"Buddha Purnima",             theme:"buddha",       emoji:"☸️", desc:"Mahatma Gautam Buddha no janma, gyaan ane mahaparinirvan divas. Shanti, karuna ane ahimsa no sandesh." },
  "5-13": { name:"Hanuman Jayanti",            theme:"hanuman",      emoji:"🙏", desc:"Bajrangbali Hanuman ji no janma utsav. Jai Hanuman! Shakti, bhakti ane seva no avsar." },
  "5-31": { name:"Eid ul-Adha (Bakri Eid)",   theme:"eid",          emoji:"🌙", desc:"Ibrahim nu balidan ane Allah ni bhakti. Qurbani, namaz ane logone badhane share karo. Eid Mubarak!" },
  /* ── JUNE ── */
  "6-21": { name:"International Yoga Day",     theme:"yoga",         emoji:"🧘", desc:"Vishwana sabhi logon ke liye yog ane swasthya no utsav. India ni dulari prakriya — Surya Namaskar!" },
  /* ── JULY ── */
  "7-6":  { name:"Muharram",                   theme:"shaheed",      emoji:"🕌", desc:"Islamic navu varsh ane Karbala ni yaad. Shanti ane ibaadat sathe aaj no divas manavo." },
  "7-10": { name:"Guru Purnima",               theme:"gurupurnima",  emoji:"🪷", desc:"Guru Brahma Guru Vishnu! Aapna guru prati aabhar ane shraddha vyakt karvo. Gyaan no divas." },
  /* ── AUGUST ── */
  "8-3":  { name:"Raksha Bandhan",             theme:"rakshabandhan",emoji:"🎀", desc:"Bhen-bhai no pavitra bandhan. Raakhdi bandho, mishri khao ane jeevanbhar ni raksha ni pratigya lo!" },
  "8-12": { name:"Janmashtami",                theme:"janmashtami",  emoji:"🦚", desc:"Shri Krishna janma utsav! Mathura-Vrindavan ma Dahi Handi, Raas-Leela ane bhajano no rangin maahol." },
  "8-15": { name:"Independence Day",           theme:"independence", emoji:"🇮🇳", desc:"Azadi ka Amrit Mahotsav. 78 varsh ni swatantrata. Har Ghar Tiranga — Jai Hind, Jai Bharat!" },
  "8-27": { name:"Ganesh Chaturthi",           theme:"ganesh",       emoji:"🐘", desc:"Ganpati Bappa Morya! 10 divas no visarjan mahotsav. Modak, aarti ane Bappa no swagat." },
  /* ── SEPTEMBER ── */
  "9-5":  { name:"Teachers' Day",              theme:"ambedkar",     emoji:"📚", desc:"Dr. Sarvepalli Radhakrishnan ni jayanti. Aapna shikshakone naman karo — woh hamari zindagi ke nirmaata hain." },
  /* ── OCTOBER ── */
  "10-2": { name:"Gandhi Jayanti",             theme:"gandhi",       emoji:"🕊️", desc:"Rashtrapitta Mahatma Gandhi ni 157mi Jayanti. Satya ane Ahimsa no sandesh aaj pan utarko che." },
  "10-13":{ name:"Navratri Begin",             theme:"navratri",     emoji:"🪘", desc:"Maa Durga na 9 swaroopni puja. Garba, dandiya ane aarti — Gujarat ni shaan 9 raat manade!" },
  "10-21":{ name:"Dussehra / Vijayadashami",  theme:"dussehra",     emoji:"🏹", desc:"Ravan dahan! Asatya par satya no vijay. Shri Ram ni vijay ane Maa Durga na shashtra puja." },
  /* ── NOVEMBER ── */
  "11-5": { name:"Dhanteras",                  theme:"diwali",       emoji:"🪙", desc:"Diwali na 2 divas pahela Dhanteras. Sona-chandi ane nava vaasanon ni kharidari karo, Laxmi nu swagat." },
  "11-7": { name:"Naraka Chaturdashi (Kali Chaudas)", theme:"holika", emoji:"🪔", desc:"Choti Diwali! Bhoot-pishach bhagado, diya jalao. Abhyanga snan ane Naraka par Krishna no vijay." },
  "11-8": { name:"Diwali — Deepotsav",         theme:"diwali",       emoji:"🪔", desc:"Prakash no parv! Ghar-ghar ma diya jalao, Lakshmi Maata nu swagat karo. Rangoli, mithai, patakha ane anand." },
  "11-9": { name:"Govardhan Puja",             theme:"ramnavami",    emoji:"🏔️", desc:"Krishna e Indra par vijay meli. Annakut utsav, 56 bhog ane Go-puja sathe Govardhan ni parikrama." },
  "11-10":{ name:"Bhai Dooj",                  theme:"rakshabandhan",emoji:"🎀", desc:"Bhai-bhen no prem! Bhen tilak kare, bhai raksha aape. Yama ane Yami no prasang yaad karo." },
  "11-24":{ name:"Guru Nanak Jayanti",         theme:"gurunanak",    emoji:"🙏", desc:"Sikhism na sansthapak Guru Nanak Dev ji no 557mo Prakaash Utsav. Waheguru! Sewa, simran ane sangat." },
  /* ── DECEMBER ── */
  "12-25":{ name:"Christmas",                  theme:"christmas",    emoji:"🎄", desc:"Isa Masih no janma utsav. Gifts, carols ane family sathe khushi manavo. Merry Christmas!" },
  "12-31":{ name:"New Year's Eve",             theme:"newyear",      emoji:"🥂", desc:"2026 nu antim divas! Countdown sharu, fireworks ready. 2027 ni taiyaari sathe ek nayo adhyay aave che." }
};

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let viewMonth = 0;
let selectedDate = new Date(2026,0,1);
let bgIntervals = [];

/* ============================================================
   INIT & RENDER
============================================================ */
function init() {
  const now = new Date();
  if (now.getFullYear() === 2026) {
    viewMonth = now.getMonth();
    selectedDate = new Date(2026, viewMonth, now.getDate());
  }
  render();
  updateBackground(selectedDate);
}

function render() {
  const grid   = document.getElementById('days-grid');
  const label  = document.getElementById('month-label');
  const feed   = document.getElementById('fest-feed');
  grid.innerHTML  = '';
  label.innerText = months[viewMonth] + ' ▾';

  const startDay    = new Date(2026, viewMonth, 1).getDay();
  const daysInMonth = new Date(2026, viewMonth+1, 0).getDate();

  for (let i = 0; i < startDay; i++) {
    const blank = mk('div'); blank.className = 'day-node empty';
    grid.appendChild(blank);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const key      = `${viewMonth+1}-${d}`;
    const isFest   = !!festivals[key];
    const isActive = selectedDate.getDate()===d && selectedDate.getMonth()===viewMonth;
    const node     = mk('div');
    let cls = 'day-node';
    if (isFest)   cls += ' is-fest';
    if (isActive) cls += ' active';
    node.className = cls;
    node.innerText = d;
    node.onclick   = () => selectDate(d, viewMonth);
    grid.appendChild(node);
  }

  feed.innerHTML = '';
  Object.keys(festivals).forEach(key => {
    const [m, d] = key.split('-').map(Number);
    if (m !== viewMonth+1) return;
    const f    = festivals[key];
    const item = mk('div'); item.className = 'fest-item';
    const dEl  = mk('div'); dEl.className = 'fest-item-date'; dEl.innerText = `${d} ${months[m-1]}`;
    const nEl  = mk('div'); nEl.className = 'fest-item-name'; nEl.innerText = `${f.emoji} ${f.name}`;
    item.appendChild(dEl); item.appendChild(nEl);
    item.onclick = () => { viewMonth = m-1; selectDate(d, m-1); };
    feed.appendChild(item);
  });
}

function selectDate(d, m) {
  selectedDate = new Date(2026, m, d);
  render(); updateBackground(selectedDate);
}
function moveMonth(dir) {
  viewMonth = (viewMonth + dir + 12) % 12;
  render();
}
function gotoActualToday() {
  const t = new Date();
  viewMonth    = t.getMonth();
  selectedDate = new Date(2026, viewMonth, t.getDate());
  render(); updateBackground(selectedDate);
}
function toggleMonthPicker() {
  const p = document.getElementById('month-picker');
  const showing = p.style.display === 'grid';
  p.style.display = showing ? 'none' : 'grid';
  if (!showing) {
    document.querySelectorAll('.mp-item').forEach((el,i)=>{
      el.classList.toggle('mp-active', i===viewMonth);
    });
  }
}
function jumpMonth(m) {
  viewMonth = m;
  document.getElementById('month-picker').style.display = 'none';
  render();
}
// close picker on outside click
document.addEventListener('click', function(e){
  const p = document.getElementById('month-picker');
  const label = document.getElementById('month-label');
  if (!p.contains(e.target) && !label.contains(e.target)) {
    p.style.display = 'none';
  }
});

/* ============================================================
   BACKGROUND ENGINE
============================================================ */
function updateBackground(date) {
  bgIntervals.forEach(clearInterval);
  bgIntervals = [];
  const m    = date.getMonth()+1;
  const d    = date.getDate();
  const key  = `${m}-${d}`;
  const fest = festivals[key];
  const L    = document.getElementById('animation-layer');
  L.innerHTML = '';
  document.getElementById('hero-date').innerText = `${d} ${months[m-1]}`;
  if (fest) {
    document.getElementById('hero-fest').innerText = `${fest.emoji} ${fest.name}`;
    document.getElementById('hero-desc').innerText = fest.desc;
    applyFestivalAnimation(fest.theme, L);
  } else {
    document.getElementById('hero-fest').innerText = '';
    const s = getSeason(m);
    document.getElementById('hero-desc').innerText = s.desc;
    applySeasonAnimation(s.theme, L);
  }
}

function getSeason(m) {
  if (m<=2||m===12) return { theme:'winter',  desc:"Thandi hawa ane dhundhlu vaatavaran. Subah ki dhoop mein chai ki chusski saath India ki beauty." };
  if (m<=4)         return { theme:'spring',  desc:"Vasant ritu! Phool khile, koyal gaaye. Nature nu navu jaagran, prithvi no navo shringar." };
  if (m<=6)         return { theme:'summer',  desc:"Garam hawa ane chamakti dhoop. Aam no mazyaar — India nu garmiyon ka utsav." };
  if (m<=9)         return { theme:'monsoon', desc:"Varsad ni rimjhim ane sona jevi zameen. Pavitra pani, leela van ane mehakti mitti." };
  return              { theme:'autumn',  desc:"Shardiya ritu — soneri dhoop ane sarvatra prasannata. Utsavon ki bhaari taivaari." };
}

/* ============================================================
   FESTIVAL ANIMATIONS
============================================================ */
function applyFestivalAnimation(theme, L) {
  ({
    newyear:doNewYear, uttarayan:doUttarayan, republic:doRepublic,
    shivratri:doShivratri, holika:doHolika, holi:doHoli,
    shaheed:doShaheed, ambedkar:doAmbedkar, independence:doIndependence,
    diwali:doDiwali,
    /* new themes */
    spring:doSpring, valentine:doValentine, navroz:doNavroz,
    eid:doEid, ramnavami:doRamNavami, baisakhi:doBaisakhi,
    buddha:doBuddha, hanuman:doHanuman, yoga:doYoga,
    gurupurnima:doGuruPurnima, rakshabandhan:doRaksha,
    janmashtami:doJanmashtami, ganesh:doGanesh,
    gandhi:doGandhi, navratri:doNavratri, dussehra:doDussehra,
    gurunanak:doGuruNanak, christmas:doChristmas
  })[theme]?.(L);
}

/* ---- NEW YEAR ---- */
function doNewYear(L) {
  st(L,'background:radial-gradient(ellipse at center,#060b1a 0%,#000308 100%)');
  const txt = mk('div');
  s(txt,`position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
    font-family:'Cinzel Decorative',serif;font-size:5vw;color:rgba(255,255,255,0.05);
    white-space:nowrap;letter-spacing:0.15em;text-align:center;
    animation:countdownPulse 4s ease-in-out infinite;`);
  txt.innerText = '✦  2026  ✦'; L.appendChild(txt);
  spawnStars(L, 120);
  bgIntervals.push(setInterval(()=>spawnNYFirework(L), 600));
}
function spawnNYFirework(L) {
  const cols = ['#FFD700','#FF6B6B','#4ECDC4','#45B7D1','#FF9FF3','#FFEAA7'];
  const c = cols[~~rnd(0,cols.length)];
  const b = mk('div');
  s(b,`position:absolute;left:${rnd(8,92)}vw;top:${rnd(5,75)}vh;
    width:${rnd(120,340)}px;height:${rnd(120,340)}px;border-radius:50%;
    border:2px solid ${c};box-shadow:0 0 30px ${c},inset 0 0 20px rgba(255,255,255,0.08);
    animation:expandFade 1.8s ease-out forwards;`);
  L.appendChild(b);
  for(let i=0;i<8;i++){
    const sp=mk('div');
    s(sp,`position:absolute;left:${rnd(5,95)}vw;top:${rnd(5,80)}vh;
      width:3px;height:3px;border-radius:50%;background:${c};box-shadow:0 0 8px ${c};
      animation:riseAndFade ${rnd(1,2.5)}s ease-out forwards;`);
    L.appendChild(sp); setTimeout(()=>sp.remove(),2500);
  }
  setTimeout(()=>b.remove(),1800);
}

/* ---- UTTARAYAN ---- */
function doUttarayan(L) {
  st(L,'background:linear-gradient(180deg,#87CEEB 0%,#b8e0f7 50%,#dceeff 100%)');
  const sun=mk('div');
  s(sun,`position:absolute;top:8%;right:15%;width:90px;height:90px;
    background:radial-gradient(circle,#FFF9C4 0%,#FFD700 40%,#FF8C00 100%);
    border-radius:50%;box-shadow:0 0 60px 20px rgba(255,200,50,0.5);`);
  L.appendChild(sun);
  for(let i=0;i<4;i++){
    const cl=mk('div');
    s(cl,`position:absolute;top:${rnd(4,28)}%;left:${rnd(-5,75)}vw;
      width:${rnd(80,160)}px;height:${rnd(28,50)}px;
      background:rgba(255,255,255,0.88);border-radius:50px;filter:blur(4px);
      animation:cloudDrift ${rnd(12,20)}s ease-in-out infinite alternate;`);
    L.appendChild(cl);
  }
  const city=mk('div');
  s(city,`position:absolute;bottom:0;width:100%;height:180px;
    background:linear-gradient(to top,rgba(90,70,55,0.9),transparent);`);
  L.appendChild(city);
  for(let i=0;i<18;i++) spawnKite(L);
}
function spawnKite(L) {
  const w=mk('div');
  s(w,`position:absolute;left:${rnd(0,90)}vw;top:${rnd(0,74)}vh;
    animation:kiteFloat ${rnd(4,9)}s ease-in-out infinite;animation-delay:-${rnd(0,8)}s;`);
  const k=document.getElementById('svg-kite').cloneNode(true);
  k.style.cssText=`display:block;width:${rnd(25,65)}px;height:auto;
    color:hsl(${rnd(0,360)},80%,60%);filter:drop-shadow(0 4px 8px rgba(0,0,0,0.3));`;
  w.appendChild(k); L.appendChild(w);
}

/* ---- REPUBLIC / INDEPENDENCE ---- */
function doRepublic(L)     { doTricolor(L,true);  }
function doIndependence(L) { doTricolor(L,false); }
function doTricolor(L,isR) {
  st(L,'background:#080808');
  const str=mk('div');
  s(str,`position:absolute;inset:0;display:flex;flex-direction:column;opacity:0.07;`);
  ['#FF9933','#FFFFFF','#138808'].forEach(c=>{
    const d=mk('div'); d.style.cssText=`flex:1;background:${c};`; str.appendChild(d);
  });
  L.appendChild(str);
  const cw=mk('div');
  s(cw,`position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.065;`);
  cw.appendChild(buildChakraSVG(320)); L.appendChild(cw);
  const bCols=['#FF9933','#FFFFFF','#138808','#FF9933','#FFFFFF'];
  for(let i=0;i<5;i++){
    const b=mk('div');
    s(b,`position:absolute;left:${10+i*20}%;top:0;width:2px;height:100%;
      background:linear-gradient(to bottom,transparent,${bCols[i]}44,transparent);
      animation:marchBeam ${rnd(3,6)}s ease-in-out infinite;animation-delay:-${i*0.8}s;`);
    L.appendChild(b);
  }
  spawnStars(L,40);
  bgIntervals.push(setInterval(()=>spawnTCFirework(L), isR?1200:800));
}
function buildChakraSVG(size) {
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 100 100');
  svg.setAttribute('width',size); svg.setAttribute('height',size);
  svg.style.animation='chakraSpin 20s linear infinite';
  const a=(tag,attrs)=>{ const e=document.createElementNS('http://www.w3.org/2000/svg',tag); Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v)); svg.appendChild(e); };
  a('circle',{cx:50,cy:50,r:42,fill:'none',stroke:'white','stroke-width':2.5});
  a('circle',{cx:50,cy:50,r:8, fill:'none',stroke:'white','stroke-width':2.5});
  for(let i=0;i<24;i++){
    const ang=(i/24)*Math.PI*2;
    a('line',{x1:50+Math.cos(ang)*10,y1:50+Math.sin(ang)*10,
              x2:50+Math.cos(ang)*40,y2:50+Math.sin(ang)*40,
              stroke:'white','stroke-width':1.5});
  }
  return svg;
}
function spawnTCFirework(L){
  const cols=['#FF9933','#FFFFFF','#138808','#FFD700'];
  const c=cols[~~rnd(0,cols.length)], b=mk('div');
  s(b,`position:absolute;left:${rnd(5,95)}vw;top:${rnd(5,70)}vh;
    width:${rnd(100,300)}px;height:${rnd(100,300)}px;border-radius:50%;
    border:1.5px solid ${c};box-shadow:0 0 20px ${c};
    animation:expandFade 2s ease-out forwards;`);
  L.appendChild(b); setTimeout(()=>b.remove(),2000);
}

/* ---- SHIVRATRI ---- */
function doShivratri(L) {
  st(L,'background:radial-gradient(ellipse at 60% 10%,#1a1032 0%,#05030a 100%)');
  const mw=mk('div');
  s(mw,`position:absolute;inset:0;
    background:radial-gradient(ellipse at 70% 0%,rgba(100,80,180,0.13) 0%,transparent 60%);`);
  L.appendChild(mw);
  // Moon
  const moon=mk('div');
  s(moon,`position:absolute;top:10%;right:18%;width:90px;height:90px;
    background:linear-gradient(135deg,#e8e8c8 0%,#c8c8a0 100%);border-radius:50%;
    animation:moonGlow 4s ease-in-out infinite;overflow:hidden;`);
  const mask=mk('div');
  s(mask,`position:absolute;top:-10px;right:20px;width:85px;height:85px;
    background:radial-gradient(circle at 40% 40%,#0d0b18 0%,#1a1032 100%);border-radius:50%;`);
  moon.appendChild(mask); L.appendChild(moon);
  // Ganga
  const ganga=mk('div');
  s(ganga,`position:absolute;bottom:0;width:100%;height:30%;
    background:linear-gradient(to top,rgba(30,60,120,0.4),transparent);filter:blur(30px);`);
  L.appendChild(ganga);
  // Trishul
  const tw=mk('div'); s(tw,'position:absolute;bottom:15%;left:12%;');
  const ts=document.getElementById('svg-trishul').cloneNode(true);
  ts.style.cssText='width:60px;height:120px;opacity:0.7;animation:trishulPulse 3s ease-in-out infinite;';
  tw.appendChild(ts); L.appendChild(tw);
  // OM
  const om=mk('div');
  s(om,`position:absolute;top:15%;left:8%;font-size:8rem;opacity:0.04;
    font-family:'Yatra One',cursive;animation:trishulPulse 5s ease-in-out infinite;`);
  om.innerText='🕉'; L.appendChild(om);
  spawnStars(L,160);
  bgIntervals.push(setInterval(()=>spawnLeaf(L),350));
  bgIntervals.push(setInterval(()=>spawnSmoke(L),700));
}
function spawnLeaf(L){
  const d=mk('div');
  s(d,`position:absolute;left:${rnd(0,100)}vw;top:-20px;width:${rnd(3,8)}px;height:${rnd(3,8)}px;
    background:rgba(255,255,255,0.65);border-radius:50% 0 50% 50%;
    animation:leafFall ${rnd(4,8)}s linear forwards;`);
  L.appendChild(d); setTimeout(()=>d.remove(),8000);
}
function spawnSmoke(L){
  const sm=mk('div');
  s(sm,`position:absolute;bottom:10%;left:${rnd(5,25)}%;width:${rnd(10,25)}px;height:60px;
    background:linear-gradient(to top,rgba(200,180,255,0.3),transparent);
    filter:blur(8px);border-radius:50%;animation:smokeRise ${rnd(2,4)}s ease-out forwards;`);
  L.appendChild(sm); setTimeout(()=>sm.remove(),4000);
}

/* ---- HOLIKA DAHAN ---- */
function doHolika(L) {
  st(L,'background:radial-gradient(ellipse at 50% 100%,#2d0900 0%,#0a0500 100%)');
  const glow=mk('div');
  s(glow,`position:absolute;bottom:0;left:50%;transform:translateX(-50%);
    width:600px;height:300px;
    background:radial-gradient(ellipse,rgba(255,100,0,0.4) 0%,transparent 70%);filter:blur(30px);`);
  L.appendChild(glow);
  buildBonfire(L);
  const log=mk('div');
  s(log,`position:absolute;bottom:28%;left:50%;transform:translateX(-50%);
    width:160px;height:20px;
    background:linear-gradient(to right,#3d1a00,#6b2f00,#3d1a00);border-radius:5px;`);
  L.appendChild(log);
  for(let i=0;i<5;i++){
    const p=mk('div');
    s(p,`position:absolute;bottom:20%;left:${18+i*13+rnd(-2,2)}%;
      width:12px;height:50px;background:rgba(0,0,0,0.9);border-radius:50% 50% 0 0;`);
    L.appendChild(p);
  }
  spawnStars(L,30);
  bgIntervals.push(setInterval(()=>spawnEmber(L),80));
}
function buildBonfire(L){
  [{w:130,h:180,c:'#FF6600',bl:8},{w:95,h:160,c:'#FF9900',bl:5},
   {w:65,h:130,c:'#FFCC00',bl:3},{w:30,h:100,c:'#FFFF88',bl:2}].forEach((f,i)=>{
    const fl=mk('div');
    s(fl,`position:absolute;bottom:28%;left:50%;transform:translateX(-50%);
      width:${f.w}px;height:${f.h}px;
      background:radial-gradient(ellipse at bottom,${f.c} 0%,transparent 70%);
      filter:blur(${f.bl}px);border-radius:50% 50% 0 0;
      animation:holikaFlame ${0.8+i*0.3}s ease-in-out infinite;animation-delay:-${i*0.2}s;`);
    L.appendChild(fl);
  });
}
function spawnEmber(L){
  const e=mk('div'), drift=rnd(-100,100)+'px';
  s(e,`position:absolute;left:${rnd(40,60)}vw;bottom:30%;
    width:${rnd(2,5)}px;height:${rnd(2,5)}px;
    background:hsl(${rnd(20,50)},100%,${rnd(60,90)}%);border-radius:50%;
    box-shadow:0 0 6px currentColor;--drift:${drift};
    animation:emberFloat ${rnd(1,3)}s ease-out forwards;`);
  L.appendChild(e); setTimeout(()=>e.remove(),3000);
}

/* ---- HOLI ---- */
function doHoli(L) {
  st(L,'background:#0a0209');
  const cols=['#FF1493','#FF6347','#00BFFF','#7FFF00','#FFD700','#FF4500','#DA70D6','#00FA9A','#FF69B4','#00CED1'];
  for(let i=0;i<25;i++){
    const bl=mk('div');
    s(bl,`position:absolute;left:${rnd(-10,110)}vw;top:${rnd(-10,110)}vh;
      width:${rnd(150,400)}px;height:${rnd(150,400)}px;
      background:${cols[i%cols.length]};border-radius:50%;
      filter:blur(${rnd(40,90)}px);opacity:0.12;
      animation:colorWave ${rnd(6,14)}s ease-in-out infinite;animation-delay:-${rnd(0,10)}s;`);
    L.appendChild(bl);
  }
  const txt=mk('div');
  s(txt,`position:absolute;top:14%;left:50%;transform:translateX(-50%);
    font-family:'Yatra One',cursive;font-size:4vw;white-space:nowrap;
    background:linear-gradient(135deg,#FF1493,#FFD700,#00BFFF,#7FFF00);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;opacity:0.14;`);
  txt.innerText='HAPPY HOLI'; L.appendChild(txt);
  bgIntervals.push(setInterval(()=>spawnGulal(L),280));
  bgIntervals.push(setInterval(()=>spawnWaterSplash(L),400));
}
function spawnGulal(L){
  const cols=['#FF1493','#FF6347','#00BFFF','#FFD700','#DA70D6'];
  const g=mk('div'), c=cols[~~rnd(0,cols.length)];
  s(g,`position:absolute;left:${rnd(5,95)}vw;top:${rnd(5,90)}vh;
    width:${rnd(30,100)}px;height:${rnd(30,100)}px;background:${c};
    border-radius:${rnd(30,70)}% ${rnd(30,70)}% ${rnd(30,70)}% ${rnd(30,70)}%;
    filter:blur(${rnd(8,20)}px);opacity:0;
    animation:gulalFloat ${rnd(2,4)}s ease-out forwards;`);
  L.appendChild(g); setTimeout(()=>g.remove(),4000);
}
function spawnWaterSplash(L){
  for(let i=0;i<6;i++){
    const d=mk('div');
    s(d,`position:absolute;left:${rnd(5,95)}vw;top:${rnd(20,70)}vh;
      width:3px;height:${rnd(15,40)}px;
      background:linear-gradient(to bottom,rgba(0,200,255,0.8),rgba(0,200,255,0));
      border-radius:50%;transform:rotate(${rnd(-30,30)}deg);
      animation:gulalFloat ${rnd(0.5,1.5)}s ease-out forwards;`);
    L.appendChild(d); setTimeout(()=>d.remove(),2000);
  }
}

/* ---- SHAHEED DIWAS ---- */
function doShaheed(L) {
  st(L,'background:#000');
  const glow=mk('div');
  s(glow,`position:absolute;inset:0;background:radial-gradient(ellipse at center,#0d0505 0%,#000 100%);`);
  L.appendChild(glow);
  for(let i=0;i<7;i++) spawnCandle(L,(10+i*12)+'%');
  const wg=mk('div');
  s(wg,`position:absolute;bottom:15%;left:50%;transform:translateX(-50%);
    width:80%;height:200px;
    background:radial-gradient(ellipse,rgba(255,150,0,0.12) 0%,transparent 70%);
    filter:blur(40px);animation:holikaFlame 3s ease-in-out infinite;`);
  L.appendChild(wg);
  ['30%','48%','66%'].forEach(x=>{
    const sil=mk('div');
    s(sil,`position:absolute;bottom:25%;left:${x};transform:translateX(-50%);
      width:25px;height:80px;background:rgba(15,8,5,0.97);
      border-radius:50% 50% 0 0 / 60% 60% 0 0;`);
    L.appendChild(sil);
  });
  const sl=mk('div');
  s(sl,`position:absolute;top:18%;left:50%;transform:translateX(-50%);
    font-family:'Cinzel Decorative',serif;font-size:1.4vw;
    color:rgba(255,150,50,0.07);white-space:nowrap;letter-spacing:0.3em;`);
  sl.innerText='INQUILAB ZINDABAD'; L.appendChild(sl);
  spawnStars(L,18);
}
function spawnCandle(L,xPct){
  const wrap=mk('div');
  s(wrap,`position:absolute;left:${xPct};bottom:22%;transform:translateX(-50%);`);
  const halo=mk('div');
  s(halo,`width:40px;height:40px;border-radius:50%;
    background:rgba(255,200,50,0.15);filter:blur(10px);
    margin:0 auto -10px;animation:candleGlow 2s ease-in-out infinite;`);
  const flame=mk('div');
  s(flame,`width:8px;height:18px;margin:0 auto;
    background:radial-gradient(ellipse at bottom,#FFD700 0%,#FF8C00 55%,transparent 100%);
    border-radius:50% 50% 30% 30%;filter:blur(1px);
    animation:candleFlicker ${0.8+rnd(0,0.5)}s ease-in-out infinite;`);
  const body=mk('div');
  s(body,`width:10px;height:42px;margin:0 auto;
    background:linear-gradient(to right,#f0f0d8,#fffde7,#f0f0d8);border-radius:2px;`);
  wrap.appendChild(halo); wrap.appendChild(flame); wrap.appendChild(body);
  L.appendChild(wrap);
}

/* ---- AMBEDKAR JAYANTI ---- */
function doAmbedkar(L) {
  st(L,'background:radial-gradient(ellipse at center,#03061a 0%,#000208 100%)');
  const bg=mk('div');
  s(bg,`position:absolute;inset:0;
    background:radial-gradient(ellipse at 30% 80%,rgba(0,80,200,0.2) 0%,transparent 60%);`);
  L.appendChild(bg);
  const bk=mk('div');
  s(bk,`position:absolute;bottom:18%;left:8%;width:80px;height:102px;
    background:linear-gradient(135deg,#8B1A1A 0%,#B22222 100%);
    border-radius:4px 8px 8px 4px;
    box-shadow:0 0 40px rgba(0,100,200,0.3),-3px 0 0 rgba(0,0,0,0.5);
    animation:constitutionGlow 4s ease-in-out infinite;
    display:flex;align-items:center;justify-content:center;padding:8px;`);
  const bt=mk('div');
  s(bt,`font-size:0.42rem;color:rgba(255,220,150,0.8);
    font-family:'Cinzel Decorative',serif;text-align:center;line-height:1.5;`);
  bt.innerText='CONSTITUTION\nOF INDIA'; bk.appendChild(bt); L.appendChild(bk);
  const cw=mk('div');
  s(cw,`position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.04;`);
  const cv=buildChakraSVG(400);
  cv.querySelectorAll('[stroke="white"]').forEach(e=>e.setAttribute('stroke','#4488FF'));
  cw.appendChild(cv); L.appendChild(cw);
  const jb=mk('div');
  s(jb,`position:absolute;top:18%;left:50%;transform:translateX(-50%);
    font-family:'Yatra One',cursive;font-size:5vw;color:rgba(0,100,255,0.06);white-space:nowrap;`);
  jb.innerText='JAI BHIM'; L.appendChild(jb);
  spawnStars(L,50);
  bgIntervals.push(setInterval(()=>spawnDust(L),180));
}
function spawnDust(L){
  const d=mk('div'), drift=rnd(-80,80)+'px';
  s(d,`position:absolute;left:${rnd(0,100)}vw;bottom:${rnd(0,30)}vh;
    width:${rnd(2,5)}px;height:${rnd(2,5)}px;background:rgba(0,120,255,0.45);
    border-radius:50%;--drift:${drift};animation:dustRise ${rnd(3,6)}s ease-out forwards;`);
  L.appendChild(d); setTimeout(()=>d.remove(),6000);
}

/* ---- DIWALI ---- */
function doDiwali(L) {
  st(L,'background:radial-gradient(ellipse at bottom,#1a0a00 0%,#050200 100%)');
  const haze=mk('div');
  s(haze,`position:absolute;bottom:0;width:100%;height:50%;
    background:linear-gradient(to top,rgba(100,40,0,0.4),transparent);filter:blur(60px);`);
  L.appendChild(haze);
  const rng=mk('div');
  s(rng,`position:absolute;bottom:4%;left:4%;width:200px;height:200px;border-radius:50%;
    border:2px solid rgba(255,150,0,0.3);
    box-shadow:0 0 0 15px transparent,0 0 0 16px rgba(255,150,0,0.15),
              0 0 0 32px transparent,0 0 0 33px rgba(255,200,0,0.1),
              0 0 0 48px transparent,0 0 0 49px rgba(255,100,0,0.08);
    animation:rangoliFade 2s ease-out forwards;`);
  L.appendChild(rng);
  for(let i=0;i<9;i++) spawnDiya(L,(8+i*10)+'%');
  const txt=mk('div');
  s(txt,`position:absolute;top:10%;left:50%;transform:translateX(-50%);
    font-family:'Yatra One',cursive;font-size:4vw;
    color:rgba(255,200,0,0.06);white-space:nowrap;`);
  txt.innerText='शुभ दीपावली'; L.appendChild(txt);
  spawnStars(L,60);
  bgIntervals.push(setInterval(()=>spawnGoldSparkle(L),75));
  bgIntervals.push(setInterval(()=>spawnDiwaliFirework(L),1400));
}
function spawnDiya(L,xPct){
  const w=mk('div'); s(w,`position:absolute;left:${xPct};bottom:6%;transform:translateX(-50%);`);
  const d=document.getElementById('svg-diya').cloneNode(true);
  d.style.cssText=`width:36px;height:36px;animation:diyaGlow 2s ease-in-out infinite;animation-delay:-${rnd(0,2)}s;`;
  w.appendChild(d); L.appendChild(w);
}
function spawnGoldSparkle(L){
  const sp=mk('div'), sz=rnd(2,6), hue=rnd(35,55);
  s(sp,`position:absolute;left:${rnd(0,100)}vw;bottom:${rnd(5,40)}vh;
    width:${sz}px;height:${sz}px;background:hsl(${hue},100%,70%);border-radius:50%;
    box-shadow:0 0 ${sz*3}px hsl(${hue},100%,60%);
    animation:riseAndFade ${rnd(2,4)}s ease-out forwards;`);
  L.appendChild(sp); setTimeout(()=>sp.remove(),4000);
}
function spawnDiwaliFirework(L){
  const cols=['#FFD700','#FF9933','#FF6B6B','#C0392B'];
  const c=cols[~~rnd(0,cols.length)], b=mk('div');
  s(b,`position:absolute;left:${rnd(10,90)}vw;top:${rnd(5,55)}vh;
    width:${rnd(80,200)}px;height:${rnd(80,200)}px;border-radius:50%;
    border:1px solid ${c};box-shadow:0 0 15px ${c},0 0 40px ${c}44;
    animation:expandFade 2.5s ease-out forwards;`);
  L.appendChild(b); setTimeout(()=>b.remove(),2500);
}

/* ============================================================
   NEW FESTIVAL ANIMATIONS
============================================================ */

/* ---- VALENTINE'S DAY ---- */
function doValentine(L) {
  st(L,'background:radial-gradient(ellipse at center, #1a0010 0%, #0a0008 100%)');
  const glow=mk('div');
  s(glow,`position:absolute;inset:0;background:radial-gradient(ellipse at 40% 60%,rgba(200,0,80,0.2) 0%,transparent 60%);`);
  L.appendChild(glow);
  bgIntervals.push(setInterval(()=>spawnHeart(L),300));
  spawnStars(L,40);
  const txt=mk('div');
  s(txt,`position:absolute;top:15%;left:50%;transform:translateX(-50%);
    font-family:'Yatra One',cursive;font-size:5vw;white-space:nowrap;
    color:rgba(255,80,120,0.07);`);
  txt.innerText='LOVE'; L.appendChild(txt);
}
function spawnHeart(L){
  const h=mk('div');
  const sz=rnd(15,55), hue=rnd(330,360);
  s(h,`position:absolute;left:${rnd(5,95)}vw;bottom:-60px;
    font-size:${sz}px;opacity:0.6;
    animation:riseAndFade ${rnd(3,6)}s ease-out forwards;`);
  h.innerText='❤️'; L.appendChild(h);
  setTimeout(()=>h.remove(),6000);
}

/* ---- NAVROZ ---- */
function doNavroz(L) {
  st(L,'background:linear-gradient(to bottom,#f5f0e8 0%,#e8d5a3 50%,#d4a843 100%)');
  for(let i=0;i<20;i++){
    const fl=mk('div');
    const cols=['#FFD700','#FF8C00','#FF6347','#8B4513','#228B22'];
    s(fl,`position:absolute;left:${rnd(0,100)}vw;top:${rnd(0,100)}vh;
      width:${rnd(20,50)}px;height:${rnd(20,50)}px;
      background:${cols[~~rnd(0,cols.length)]};border-radius:50% 0 50% 0;
      opacity:0.25;animation:petalFall ${rnd(6,12)}s ease-in-out infinite;
      animation-delay:-${rnd(0,10)}s;`);
    L.appendChild(fl);
  }
  const sun=mk('div');
  s(sun,`position:absolute;top:10%;left:50%;transform:translateX(-50%);
    width:120px;height:120px;
    background:radial-gradient(circle,#FFF9C4 0%,#FFD700 50%,rgba(255,200,0,0) 100%);
    border-radius:50%;box-shadow:0 0 80px 30px rgba(255,200,0,0.35);`);
  L.appendChild(sun);
}

/* ---- EID ---- */
function doEid(L) {
  st(L,'background:radial-gradient(ellipse at 50% 0%,#0a1a2e 0%,#030810 100%)');
  // Crescent + Star
  const moon=mk('div');
  s(moon,`position:absolute;top:8%;right:22%;width:100px;height:100px;
    background:linear-gradient(135deg,#f5e6a3 0%,#e8c84a 100%);
    border-radius:50%;animation:moonGlow 4s ease-in-out infinite;overflow:hidden;`);
  const mask=mk('div');
  s(mask,`position:absolute;top:-8px;right:18px;width:95px;height:95px;
    background:#0a1a2e;border-radius:50%;`);
  moon.appendChild(mask);
  const star=mk('div');
  s(star,`position:absolute;top:12%;right:19%;font-size:24px;
    animation:twinkle 2s ease-in-out infinite;color:#f5e6a3;`);
  star.innerText='★'; L.appendChild(star);
  L.appendChild(moon);
  // Mosque silhouette
  const mosque=mk('div');
  s(mosque,`position:absolute;bottom:0;left:50%;transform:translateX(-50%);
    width:300px;height:200px;
    background:linear-gradient(to top,rgba(5,15,40,0.95),transparent);`);
  const mDome=mk('div');
  s(mDome,`position:absolute;bottom:80px;left:50%;transform:translateX(-50%);
    width:120px;height:80px;
    background:rgba(5,10,30,0.9);border-radius:50% 50% 0 0;`);
  mosque.appendChild(mDome);
  L.appendChild(mosque);
  // Lanterns
  bgIntervals.push(setInterval(()=>spawnLantern(L),500));
  spawnStars(L,100);
}
function spawnLantern(L){
  const ln=mk('div');
  s(ln,`position:absolute;left:${rnd(5,95)}vw;bottom:-30px;
    font-size:${rnd(20,40)}px;
    animation:riseAndFade ${rnd(5,9)}s ease-out forwards;opacity:0.6;`);
  ln.innerText='🏮'; L.appendChild(ln);
  setTimeout(()=>ln.remove(),9000);
}

/* ---- RAM NAVAMI ---- */
function doRamNavami(L) {
  st(L,'background:radial-gradient(ellipse at center,#0d0800 0%,#1a0d00 50%,#050300 100%)');
  const glow=mk('div');
  s(glow,`position:absolute;inset:0;
    background:radial-gradient(ellipse at 50% 80%,rgba(255,150,0,0.18) 0%,transparent 60%);`);
  L.appendChild(glow);
  // Temple silhouette
  const temple=mk('div');
  s(temple,`position:absolute;bottom:0;left:50%;transform:translateX(-50%);
    width:200px;height:220px;
    background:linear-gradient(to top,rgba(80,40,0,0.95),rgba(80,40,0,0.3),transparent);
    clip-path:polygon(50% 0%,65% 15%,100% 20%,100% 100%,0% 100%,0% 20%,35% 15%);`);
  L.appendChild(temple);
  // Flag atop
  const flag=mk('div');
  s(flag,`position:absolute;bottom:218px;left:50%;transform:translateX(-50%);
    font-size:2rem;animation:kiteFloat 3s ease-in-out infinite;`);
  flag.innerText='🚩'; L.appendChild(flag);
  spawnStars(L,80);
  bgIntervals.push(setInterval(()=>spawnGoldSparkle(L),150));
  const jai=mk('div');
  s(jai,`position:absolute;top:18%;left:50%;transform:translateX(-50%);
    font-family:'Yatra One',cursive;font-size:4vw;color:rgba(255,150,0,0.07);white-space:nowrap;`);
  jai.innerText='JAI SHRI RAM'; L.appendChild(jai);
}

/* ---- BAISAKHI ---- */
function doBaisakhi(L) {
  st(L,'background:linear-gradient(to bottom,#87CEEB 0%,#98FB98 70%,#228B22 100%)');
  // Wheat fields
  const field=mk('div');
  s(field,`position:absolute;bottom:0;width:100%;height:35%;
    background:linear-gradient(to top,#DAA520 0%,#F0D060 50%,transparent 100%);`);
  L.appendChild(field);
  // Sun
  const sun=mk('div');
  s(sun,`position:absolute;top:10%;left:50%;transform:translateX(-50%);
    width:100px;height:100px;
    background:radial-gradient(circle,#FFF9C4 0%,#FFD700 50%,transparent 100%);
    border-radius:50%;box-shadow:0 0 80px 20px rgba(255,200,0,0.4);`);
  L.appendChild(sun);
  // Bouncing emojis for Bhangra feel
  bgIntervals.push(setInterval(()=>spawnBhangraEmoji(L),600));
  spawnStars(L,30);
}
function spawnBhangraEmoji(L){
  const emojis=['🌾','💃','🥁','🎵'];
  const e=mk('div');
  s(e,`position:absolute;left:${rnd(10,90)}vw;bottom:-40px;font-size:${rnd(25,45)}px;
    animation:riseAndFade ${rnd(4,7)}s ease-out forwards;opacity:0.5;`);
  e.innerText=emojis[~~rnd(0,emojis.length)]; L.appendChild(e);
  setTimeout(()=>e.remove(),7000);
}

/* ---- BUDDHA PURNIMA ---- */
function doBuddha(L) {
  st(L,'background:radial-gradient(ellipse at center,#0a0d08 0%,#050805 100%)');
  // Full moon
  const moon=mk('div');
  s(moon,`position:absolute;top:8%;left:50%;transform:translateX(-50%);
    width:110px;height:110px;
    background:radial-gradient(circle,#fffef0 0%,#f5e87a 60%,rgba(245,230,100,0) 100%);
    border-radius:50%;box-shadow:0 0 60px 20px rgba(245,230,100,0.35);`);
  L.appendChild(moon);
  // Bodhi tree glow
  const tree=mk('div');
  s(tree,`position:absolute;bottom:0;left:50%;transform:translateX(-50%);
    width:220px;height:280px;
    background:radial-gradient(ellipse at bottom,rgba(20,50,10,0.95) 0%,transparent 70%);`);
  L.appendChild(tree);
  // Lotus petals
  bgIntervals.push(setInterval(()=>spawnLotus(L),400));
  spawnStars(L,120);
  const om=mk('div');
  s(om,`position:absolute;top:25%;left:50%;transform:translateX(-50%);
    font-size:6vw;opacity:0.04;animation:trishulPulse 6s ease-in-out infinite;`);
  om.innerText='☸️'; L.appendChild(om);
}
function spawnLotus(L){
  const l=mk('div');
  s(l,`position:absolute;left:${rnd(5,95)}vw;bottom:-30px;font-size:${rnd(16,32)}px;
    animation:riseAndFade ${rnd(4,8)}s ease-out forwards;opacity:0.5;`);
  l.innerText='🪷'; L.appendChild(l);
  setTimeout(()=>l.remove(),8000);
}

/* ---- HANUMAN JAYANTI ---- */
function doHanuman(L) {
  st(L,'background:radial-gradient(ellipse at center,#1a0500 0%,#0a0200 100%)');
  const g=mk('div');
  s(g,`position:absolute;inset:0;
    background:radial-gradient(ellipse at 50% 80%,rgba(255,80,0,0.15) 0%,transparent 55%);`);
  L.appendChild(g);
  spawnStars(L,60);
  bgIntervals.push(setInterval(()=>spawnGoldSparkle(L),120));
  const txt=mk('div');
  s(txt,`position:absolute;top:15%;left:50%;transform:translateX(-50%);
    font-family:'Yatra One',cursive;font-size:4vw;color:rgba(255,100,0,0.07);white-space:nowrap;`);
  txt.innerText='JAY BAJRANGBALI'; L.appendChild(txt);
  // Flags
  for(let i=0;i<5;i++){
    const f=mk('div');
    s(f,`position:absolute;left:${10+i*20}vw;top:${rnd(5,30)}vh;
      font-size:${rnd(24,40)}px;animation:kiteFloat ${rnd(2,4)}s ease-in-out infinite;
      animation-delay:-${i}s;opacity:0.5;`);
    f.innerText='🚩'; L.appendChild(f);
  }
}

/* ---- YOGA DAY ---- */
function doYoga(L) {
  st(L,'background:linear-gradient(to bottom,#ff9966 0%,#ff5e62 40%,#c94b4b 100%)');
  const sun=mk('div');
  s(sun,`position:absolute;top:5%;left:50%;transform:translateX(-50%);
    width:130px;height:130px;
    background:radial-gradient(circle,#FFF9C4 0%,#FFD700 40%,rgba(255,200,0,0) 100%);
    border-radius:50%;box-shadow:0 0 100px 30px rgba(255,200,100,0.4);`);
  L.appendChild(sun);
  const rays=mk('div');
  s(rays,'position:absolute;top:5%;left:50%;transform:translateX(-50%);width:130px;height:130px;animation:sunRays 20s linear infinite;');
  for(let i=0;i<8;i++){
    const r=mk('div');
    s(r,`position:absolute;top:50%;left:50%;transform-origin:0 0;
      width:250px;height:1px;
      background:linear-gradient(to right,rgba(255,220,100,0.3),transparent);
      transform:rotate(${(i/8)*360}deg);`);
    rays.appendChild(r);
  }
  L.appendChild(rays);
  // Silhouette in yoga pose
  const yogi=mk('div');
  s(yogi,`position:absolute;bottom:18%;left:50%;transform:translateX(-50%);
    font-size:8rem;opacity:0.08;`);
  yogi.innerText='🧘'; L.appendChild(yogi);
}

/* ---- GURU PURNIMA ---- */
function doGuruPurnima(L) {
  st(L,'background:radial-gradient(ellipse at center,#0a0800 0%,#050400 100%)');
  const moon=mk('div');
  s(moon,`position:absolute;top:8%;left:50%;transform:translateX(-50%);
    width:120px;height:120px;
    background:radial-gradient(circle,#fffef0 0%,#ffd700 60%,rgba(255,200,0,0) 100%);
    border-radius:50%;box-shadow:0 0 70px 25px rgba(255,220,100,0.4);`);
  L.appendChild(moon);
  spawnStars(L,120);
  bgIntervals.push(setInterval(()=>spawnLotus(L),500));
}

/* ---- RAKSHA BANDHAN ---- */
function doRaksha(L) {
  st(L,'background:radial-gradient(ellipse at center,#1a0510 0%,#0a0208 100%)');
  const g=mk('div');
  s(g,`position:absolute;inset:0;
    background:radial-gradient(ellipse at 50% 50%,rgba(200,50,150,0.12) 0%,transparent 60%);`);
  L.appendChild(g);
  bgIntervals.push(setInterval(()=>spawnRakhiEmoji(L),400));
  spawnStars(L,80);
  const txt=mk('div');
  s(txt,`position:absolute;top:18%;left:50%;transform:translateX(-50%);
    font-family:'Yatra One',cursive;font-size:4vw;color:rgba(255,100,180,0.07);white-space:nowrap;`);
  txt.innerText='RAKSHA BANDHAN'; L.appendChild(txt);
}
function spawnRakhiEmoji(L){
  const items=['🎀','💐','🍬','💖','✨'];
  const e=mk('div');
  s(e,`position:absolute;left:${rnd(5,95)}vw;bottom:-40px;font-size:${rnd(20,40)}px;
    animation:riseAndFade ${rnd(3,6)}s ease-out forwards;opacity:0.5;`);
  e.innerText=items[~~rnd(0,items.length)]; L.appendChild(e);
  setTimeout(()=>e.remove(),6000);
}

/* ---- JANMASHTAMI ---- */
function doJanmashtami(L) {
  st(L,'background:radial-gradient(ellipse at center,#05050f 0%,#000208 100%)');
  // Full moon
  const moon=mk('div');
  s(moon,`position:absolute;top:6%;right:15%;width:100px;height:100px;
    background:radial-gradient(circle,#fffef0 0%,#b8d4f5 60%,rgba(180,200,255,0) 100%);
    border-radius:50%;box-shadow:0 0 60px 20px rgba(180,200,255,0.35);`);
  L.appendChild(moon);
  // Flute notes / peacock feathers rising
  bgIntervals.push(setInterval(()=>spawnPeacock(L),400));
  spawnStars(L,100);
  const txt=mk('div');
  s(txt,`position:absolute;top:15%;left:50%;transform:translateX(-50%);
    font-family:'Yatra One',cursive;font-size:4.5vw;color:rgba(50,100,255,0.06);white-space:nowrap;`);
  txt.innerText='JAI SHRI KRISHNA'; L.appendChild(txt);
  // Dahi handi
  const dahi=mk('div');
  s(dahi,`position:absolute;top:15%;left:48%;font-size:4rem;opacity:0.06;`);
  dahi.innerText='🏺'; L.appendChild(dahi);
}
function spawnPeacock(L){
  const items=['🦚','🪈','🌿','⭐'];
  const e=mk('div');
  s(e,`position:absolute;left:${rnd(5,95)}vw;bottom:-40px;font-size:${rnd(18,36)}px;
    animation:riseAndFade ${rnd(4,7)}s ease-out forwards;opacity:0.55;`);
  e.innerText=items[~~rnd(0,items.length)]; L.appendChild(e);
  setTimeout(()=>e.remove(),7000);
}

/* ---- GANESH CHATURTHI ---- */
function doGanesh(L) {
  st(L,'background:radial-gradient(ellipse at center,#1a0d00 0%,#0a0500 100%)');
  const g=mk('div');
  s(g,`position:absolute;inset:0;
    background:radial-gradient(ellipse at 50% 80%,rgba(255,150,0,0.2) 0%,transparent 55%);`);
  L.appendChild(g);
  spawnStars(L,60);
  bgIntervals.push(setInterval(()=>spawnGoldSparkle(L),100));
  bgIntervals.push(setInterval(()=>spawnModak(L),600));
  const txt=mk('div');
  s(txt,`position:absolute;top:15%;left:50%;transform:translateX(-50%);
    font-family:'Yatra One',cursive;font-size:4vw;color:rgba(255,150,0,0.07);white-space:nowrap;`);
  txt.innerText='GANPATI BAPPA MORYA'; L.appendChild(txt);
}
function spawnModak(L){
  const items=['🐘','🙏','🌸','🍬','✨'];
  const e=mk('div');
  s(e,`position:absolute;left:${rnd(5,95)}vw;bottom:-40px;font-size:${rnd(20,40)}px;
    animation:riseAndFade ${rnd(3,7)}s ease-out forwards;opacity:0.5;`);
  e.innerText=items[~~rnd(0,items.length)]; L.appendChild(e);
  setTimeout(()=>e.remove(),7000);
}

/* ---- GANDHI JAYANTI ---- */
function doGandhi(L) {
  st(L,'background:radial-gradient(ellipse at center,#0a0a08 0%,#050505 100%)');
  const g=mk('div');
  s(g,`position:absolute;inset:0;
    background:radial-gradient(ellipse at 40% 60%,rgba(80,80,20,0.15) 0%,transparent 55%);`);
  L.appendChild(g);
  // Chakra
  const cw=mk('div');
  s(cw,`position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);opacity:0.04;`);
  cw.appendChild(buildChakraSVG(350)); L.appendChild(cw);
  spawnStars(L,40);
  const txt=mk('div');
  s(txt,`position:absolute;top:18%;left:50%;transform:translateX(-50%);
    font-family:'Cinzel Decorative',serif;font-size:1.5vw;
    color:rgba(255,255,100,0.06);white-space:nowrap;letter-spacing:0.3em;`);
  txt.innerText='BE THE CHANGE'; L.appendChild(txt);
  bgIntervals.push(setInterval(()=>spawnDove(L),800));
}
function spawnDove(L){
  const d=mk('div');
  s(d,`position:absolute;left:${rnd(5,95)}vw;bottom:-40px;font-size:${rnd(20,36)}px;
    animation:riseAndFade ${rnd(5,8)}s ease-out forwards;opacity:0.35;`);
  d.innerText='🕊️'; L.appendChild(d);
  setTimeout(()=>d.remove(),8000);
}

/* ---- NAVRATRI ---- */
function doNavratri(L) {
  st(L,'background:radial-gradient(ellipse at center,#0a0010 0%,#050008 100%)');
  const cols=['#FF1493','#FFD700','#FF4500','#9400D3','#00CED1','#FF69B4','#7FFF00','#FF8C00','#4169E1'];
  for(let i=0;i<20;i++){
    const b=mk('div');
    s(b,`position:absolute;left:${rnd(-5,105)}vw;top:${rnd(-5,105)}vh;
      width:${rnd(100,300)}px;height:${rnd(100,300)}px;
      background:${cols[i%cols.length]};border-radius:50%;
      filter:blur(${rnd(50,100)}px);opacity:0.08;
      animation:colorWave ${rnd(5,12)}s ease-in-out infinite;animation-delay:-${rnd(0,10)}s;`);
    L.appendChild(b);
  }
  bgIntervals.push(setInterval(()=>spawnGarba(L),350));
  spawnStars(L,80);
  const txt=mk('div');
  s(txt,`position:absolute;top:15%;left:50%;transform:translateX(-50%);
    font-family:'Yatra One',cursive;font-size:4vw;white-space:nowrap;
    background:linear-gradient(135deg,#FF1493,#FFD700,#9400D3);
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    background-clip:text;opacity:0.12;`);
  txt.innerText='NAVRATRI'; L.appendChild(txt);
}
function spawnGarba(L){
  const items=['🪘','💃','🎵','🌸','✨','🎶'];
  const e=mk('div');
  s(e,`position:absolute;left:${rnd(5,95)}vw;bottom:-40px;font-size:${rnd(18,38)}px;
    animation:riseAndFade ${rnd(3,6)}s ease-out forwards;opacity:0.55;`);
  e.innerText=items[~~rnd(0,items.length)]; L.appendChild(e);
  setTimeout(()=>e.remove(),6000);
}

/* ---- DUSSEHRA ---- */
function doDussehra(L) {
  st(L,'background:radial-gradient(ellipse at 50% 100%,#2d0900 0%,#0a0300 100%)');
  // Ravan burning (like holika but taller)
  const glow=mk('div');
  s(glow,`position:absolute;bottom:0;left:50%;transform:translateX(-50%);
    width:700px;height:400px;
    background:radial-gradient(ellipse,rgba(255,80,0,0.45) 0%,transparent 65%);
    filter:blur(40px);`);
  L.appendChild(glow);
  // 3 effigies (Ravan, Kumbhkaran, Meghnad)
  [35,50,65].forEach((x,i)=>{
    const eff=mk('div');
    const h=180-i*20;
    s(eff,`position:absolute;bottom:28%;left:${x}%;transform:translateX(-50%);
      width:${20+i*5}px;height:${h}px;
      background:linear-gradient(to top,#FF4500,#FF8C00,rgba(255,200,0,0));
      border-radius:50% 50% 0 0;
      animation:holikaFlame ${0.8+i*0.2}s ease-in-out infinite;filter:blur(4px);`);
    L.appendChild(eff);
  });
  bgIntervals.push(setInterval(()=>spawnEmber(L),60));
  spawnStars(L,50);
  const txt=mk('div');
  s(txt,`position:absolute;top:15%;left:50%;transform:translateX(-50%);
    font-family:'Yatra One',cursive;font-size:4vw;color:rgba(255,100,0,0.07);white-space:nowrap;`);
  txt.innerText='JAI SHRI RAM — VIJAYA DASHAMI'; L.appendChild(txt);
}

/* ---- GURU NANAK JAYANTI ---- */
function doGuruNanak(L) {
  st(L,'background:radial-gradient(ellipse at center,#0a0800 0%,#050400 100%)');
  // Full moon + golden glow
  const moon=mk('div');
  s(moon,`position:absolute;top:8%;left:50%;transform:translateX(-50%);
    width:110px;height:110px;
    background:radial-gradient(circle,#fffef0 0%,#ffd700 60%,rgba(255,200,0,0) 100%);
    border-radius:50%;box-shadow:0 0 80px 30px rgba(255,200,0,0.4);`);
  L.appendChild(moon);
  // Nishan Sahib (Sikh flag)
  const nsSvg=mk('div');
  s(nsSvg,`position:absolute;bottom:20%;left:12%;font-size:5rem;opacity:0.08;
    animation:trishulPulse 4s ease-in-out infinite;`);
  nsSvg.innerText='☬'; L.appendChild(nsSvg);
  spawnStars(L,120);
  bgIntervals.push(setInterval(()=>spawnLotus(L),500));
  const waheguru=mk('div');
  s(waheguru,`position:absolute;top:18%;left:50%;transform:translateX(-50%);
    font-family:'Yatra One',cursive;font-size:4vw;color:rgba(255,200,0,0.06);white-space:nowrap;`);
  waheguru.innerText='WAHEGURU'; L.appendChild(waheguru);
}

/* ---- CHRISTMAS ---- */
function doChristmas(L) {
  st(L,'background:linear-gradient(to bottom,#001a0a 0%,#002d10 50%,#001a0a 100%)');
  // Snow
  const iv=setInterval(()=>spawnSnow(L),100);
  bgIntervals.push(iv);
  // Xmas tree glow
  const treeGlow=mk('div');
  s(treeGlow,`position:absolute;bottom:0;left:50%;transform:translateX(-50%);
    width:400px;height:400px;
    background:radial-gradient(ellipse,rgba(0,200,50,0.12) 0%,transparent 65%);
    filter:blur(50px);`);
  L.appendChild(treeGlow);
  // Star on tree
  const star=mk('div');
  s(star,`position:absolute;bottom:35%;left:50%;transform:translateX(-50%);
    font-size:3rem;animation:twinkle 2s ease-in-out infinite;`);
  star.innerText='⭐'; L.appendChild(star);
  // Lights/decorations rising
  bgIntervals.push(setInterval(()=>spawnXmasEmoji(L),500));
  spawnStars(L,80);
  const txt=mk('div');
  s(txt,`position:absolute;top:15%;left:50%;transform:translateX(-50%);
    font-family:'Cinzel Decorative',serif;font-size:3vw;
    color:rgba(0,255,80,0.07);white-space:nowrap;letter-spacing:0.15em;`);
  txt.innerText='MERRY CHRISTMAS'; L.appendChild(txt);
}
function spawnSnow(L){
  const sn=mk('div');
  s(sn,`position:absolute;left:${rnd(0,100)}vw;top:-20px;
    width:${rnd(3,8)}px;height:${rnd(3,8)}px;
    background:rgba(255,255,255,0.88);border-radius:50%;filter:blur(1px);
    animation:snowFall ${rnd(4,8)}s linear forwards;`);
  L.appendChild(sn); setTimeout(()=>sn.remove(),8000);
}
function spawnXmasEmoji(L){
  const items=['🎄','🎁','🕯️','⛄','❄️','🔔'];
  const e=mk('div');
  s(e,`position:absolute;left:${rnd(5,95)}vw;bottom:-40px;font-size:${rnd(18,36)}px;
    animation:riseAndFade ${rnd(4,8)}s ease-out forwards;opacity:0.45;`);
  e.innerText=items[~~rnd(0,items.length)]; L.appendChild(e);
  setTimeout(()=>e.remove(),8000);
}

/* ============================================================
   SEASON ANIMATIONS
============================================================ */
function applySeasonAnimation(theme, L) {
  ({winter:doWinter,spring:doSpring,summer:doSummer,monsoon:doMonsoon,autumn:doAutumn})[theme]?.(L);
}

function doWinter(L){
  st(L,'background:linear-gradient(to bottom,#1e3c72 0%,#2a5298 60%,#4a76c9 100%)');
  const mist=mk('div');
  s(mist,`position:absolute;bottom:0;width:120%;height:40%;left:-10%;
    background:linear-gradient(to top,rgba(255,255,255,0.12),transparent);
    filter:blur(60px);animation:mistDrift 20s linear infinite alternate;`);
  L.appendChild(mist);
  spawnMountains(L);
  bgIntervals.push(setInterval(()=>spawnSnow(L),130));
}
function spawnMountains(L){
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 1200 300');
  svg.style.cssText='position:absolute;bottom:0;width:100%;height:260px;';
  svg.innerHTML=`
    <polygon points="0,300 200,80 400,300"    fill="rgba(12,18,42,0.75)"/>
    <polygon points="200,300 450,40 700,300"  fill="rgba(8,14,36,0.85)"/>
    <polygon points="400,300 700,100 1000,300" fill="rgba(5,10,30,0.9)"/>
    <polygon points="700,300 950,60 1200,300"  fill="rgba(9,14,34,0.82)"/>
    <polygon points="200,80 420,40 225,76"    fill="rgba(230,245,255,0.32)"/>
    <polygon points="450,40 680,100 455,37"   fill="rgba(230,245,255,0.36)"/>
    <polygon points="950,60 1150,90 955,57"   fill="rgba(230,245,255,0.28)"/>`;
  L.appendChild(svg);
}
function spawnSnow(L){
  const sn=mk('div');
  s(sn,`position:absolute;left:${rnd(0,100)}vw;top:-20px;
    width:${rnd(3,8)}px;height:${rnd(3,8)}px;
    background:rgba(255,255,255,0.85);border-radius:50%;filter:blur(1px);
    animation:snowFall ${rnd(4,8)}s linear forwards;`);
  L.appendChild(sn); setTimeout(()=>sn.remove(),8000);
}

function doSpring(L){
  st(L,'background:linear-gradient(to bottom,#87CEEB 0%,#c8e8f5 50%,#eef7fc 100%)');
  bgIntervals.push(setInterval(()=>spawnPetal(L),180));
  for(let i=0;i<5;i++){
    const bird=mk('div');
    s(bird,`position:absolute;left:${rnd(10,90)}vw;top:${rnd(8,40)}vh;
      font-size:${rnd(16,28)}px;opacity:0.4;
      animation:cloudDrift ${rnd(8,15)}s ease-in-out infinite alternate;`);
    bird.innerText='🐦'; L.appendChild(bird);
  }
}
function spawnPetal(L){
  const cols=['#FFB6C1','#FF69B4','#FFC0CB','#FFD700','#FFEAA7','#DDA0DD'];
  const p=mk('div'), sz=rnd(6,14);
  s(p,`position:absolute;left:${rnd(0,100)}vw;top:-20px;
    width:${sz}px;height:${sz*0.6}px;
    background:${cols[~~rnd(0,cols.length)]};
    border-radius:50% 50% 50% 50% / 60% 60% 40% 40%;opacity:0.75;
    animation:petalFall ${rnd(5,10)}s ease-in-out forwards;`);
  L.appendChild(p); setTimeout(()=>p.remove(),10000);
}

function doSummer(L){
  st(L,'background:linear-gradient(to bottom,#1a0a00 0%,#3d1500 40%,#7a3000 100%)');
  const sun=mk('div');
  s(sun,`position:absolute;top:8%;right:10%;width:150px;height:150px;
    background:radial-gradient(circle,#FFF9C4 0%,#FFD700 30%,#FF8C00 60%,transparent 100%);
    border-radius:50%;box-shadow:0 0 120px 40px rgba(255,150,0,0.4);`);
  L.appendChild(sun);
  const rays=mk('div');
  s(rays,'position:absolute;top:8%;right:10%;width:150px;height:150px;animation:sunRays 30s linear infinite;');
  for(let i=0;i<12;i++){
    const r=mk('div');
    s(r,`position:absolute;top:50%;left:50%;transform-origin:0 0;
      width:200px;height:1px;
      background:linear-gradient(to right,rgba(255,200,50,0.28),transparent);
      transform:rotate(${(i/12)*360}deg);`);
    rays.appendChild(r);
  }
  L.appendChild(rays);
  for(let i=0;i<5;i++){
    const sh=mk('div');
    s(sh,`position:absolute;bottom:${10+i*8}%;left:${rnd(0,80)}%;
      width:${rnd(100,300)}px;height:40px;
      background:linear-gradient(to right,transparent,rgba(255,150,50,0.06),transparent);
      filter:blur(8px);animation:heatShimmer ${rnd(2,4)}s ease-in-out infinite;animation-delay:-${i}s;`);
    L.appendChild(sh);
  }
}

function doMonsoon(L){
  st(L,'background:linear-gradient(to bottom,#0f172a 0%,#1e2d4a 50%,#0a1525 100%)');
  const cl=mk('div');
  s(cl,`position:absolute;top:0;width:100%;height:40%;
    background:radial-gradient(ellipse at 50% 0%,rgba(25,38,75,0.85) 0%,transparent 100%);
    filter:blur(40px);`);
  L.appendChild(cl);
  const lt=mk('div');
  s(lt,`position:absolute;inset:0;background:rgba(200,220,255,0.1);
    animation:lightningFlash ${rnd(5,10)}s infinite;`);
  L.appendChild(lt);
  bgIntervals.push(setInterval(()=>spawnRain(L),18));
  const pd=mk('div');
  s(pd,`position:absolute;bottom:0;width:100%;height:14%;
    background:linear-gradient(to top,rgba(30,60,120,0.3),transparent);filter:blur(2px);`);
  L.appendChild(pd);
}
function spawnRain(L){
  const r=mk('div');
  s(r,`position:absolute;left:${rnd(0,100)}vw;top:-40px;
    width:1px;height:${rnd(18,48)}px;
    background:linear-gradient(to bottom,transparent,rgba(180,210,255,0.4),transparent);
    animation:rainDrop ${rnd(0.4,0.75)}s linear forwards;`);
  L.appendChild(r); setTimeout(()=>r.remove(),800);
}

function doAutumn(L){
  st(L,'background:radial-gradient(ellipse at center,#1a0d00 0%,#0a0500 100%)');
  const gh=mk('div');
  s(gh,`position:absolute;inset:0;
    background:radial-gradient(ellipse at 60% 50%,rgba(80,40,0,0.3) 0%,transparent 60%);`);
  L.appendChild(gh);
  spawnStars(L,60);
  bgIntervals.push(setInterval(()=>spawnAutumnLeaf(L),280));
}
function spawnAutumnLeaf(L){
  const cols=['#D2691E','#B8860B','#CD853F','#8B4513','#DEB887'];
  const lf=mk('div'), sz=rnd(8,18);
  s(lf,`position:absolute;left:${rnd(0,100)}vw;top:-30px;
    width:${sz}px;height:${sz*0.7}px;
    background:${cols[~~rnd(0,cols.length)]};border-radius:0 50% 0 50%;opacity:0.5;
    animation:petalFall ${rnd(5,10)}s ease-in-out forwards;`);
  L.appendChild(lf); setTimeout(()=>lf.remove(),10000);
}

/* ============================================================
   SHARED UTILITIES
============================================================ */
function spawnStars(L, n){
  for(let i=0;i<n;i++){
    const star=mk('div'), sz=rnd(1,3);
    s(star,`position:absolute;left:${rnd(0,100)}vw;top:${rnd(0,70)}vh;
      width:${sz}px;height:${sz}px;background:white;border-radius:50%;
      opacity:${rnd(0.2,0.9)};
      animation:twinkle ${rnd(2,5)}s ease-in-out infinite;animation-delay:-${rnd(0,5)}s;`);
    L.appendChild(star);
  }
}

function mk(tag)   { return document.createElement(tag); }
function s(el,css) { el.style.cssText = css; }
function st(el,bg) { el.style.cssText += bg; }
function rnd(a,b)  { return Math.random()*(b-a)+a; }

/* ============================================================
   FULL YEAR VIEW
============================================================ */
function toggleYearView() {
  const ov = document.getElementById('year-view-overlay');
  const isOpen = ov.classList.contains('active');
  if (isOpen) {
    ov.classList.remove('active');
  } else {
    buildYearView();
    ov.classList.add('active');
  }
}

function buildYearView() {
  const grid = document.getElementById('yv-grid');
  grid.innerHTML = '';
  const today = new Date();

  for (let m = 0; m < 12; m++) {
    const card = mk('div');
    card.className = 'yv-month-card';

    /* Month name */
    const mName = mk('div');
    mName.className = 'yv-month-name';
    mName.innerText = months[m];
    card.appendChild(mName);

    /* Day-of-week headers */
    const dhWrap = mk('div');
    dhWrap.className = 'yv-day-headers';
    ['S','M','T','W','T','F','S'].forEach(d => {
      const dh = mk('div'); dh.innerText = d; dhWrap.appendChild(dh);
    });
    card.appendChild(dhWrap);

    /* Days grid */
    const daysWrap = mk('div');
    daysWrap.className = 'yv-days';

    const startDay    = new Date(2026, m, 1).getDay();
    const daysInMonth = new Date(2026, m+1, 0).getDate();

    for (let i = 0; i < startDay; i++) {
      const empty = mk('div'); empty.className = 'yv-day yv-empty';
      daysWrap.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const key     = `${m+1}-${d}`;
      const isFest  = !!festivals[key];
      const isToday = (today.getFullYear()===2026 && today.getMonth()===m && today.getDate()===d)
                   || (selectedDate.getMonth()===m && selectedDate.getDate()===d);

      const dayEl = mk('div');
      let cls = 'yv-day';
      if (isFest)  cls += ' yv-fest';
      if (isToday) cls += ' yv-today';
      dayEl.className = cls;
      dayEl.innerText = d;

      /* Click: jump to that date, close year view */
      dayEl.onclick = () => {
        viewMonth = m;
        selectDate(d, m);
        toggleYearView();
      };

      /* Tooltip with festival name on hover */
      if (isFest) {
        dayEl.title = festivals[key].emoji + ' ' + festivals[key].name;
      }

      daysWrap.appendChild(dayEl);
    }
    card.appendChild(daysWrap);

    /* Festival pills */
    const pills = mk('div');
    pills.className = 'yv-fest-pills';
    Object.keys(festivals).forEach(key => {
      const [fm, fd] = key.split('-').map(Number);
      if (fm !== m+1) return;
      const f   = festivals[key];
      const pill = mk('div');
      pill.className = 'yv-pill';
      pill.innerText  = f.emoji + ' ' + f.name;
      pill.title      = f.desc;
      pill.onclick    = () => {
        viewMonth = m;
        selectDate(fd, m);
        toggleYearView();
      };
      pills.appendChild(pill);
    });
    card.appendChild(pills);

    grid.appendChild(card);
  }
}

/* Close year view on Escape */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('year-view-overlay').classList.remove('active');
  }
});

window.onload = init;
</script>
