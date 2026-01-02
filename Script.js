// --- DATA CONFIGURATION ---
        const festivals = {
            "1-1": { name: "Happy New Year 2026", theme: "newyear", desc: "Nava varsh ni shubhkaamnao! Fireworks ane khushiyo no aagman." },
            "1-14": { name: "Uttarayan / Sankranti", theme: "uttarayan", desc: "Kai Po Che! Aakash ma rang-berangi patango no utsav." },
            "1-26": { name: "Republic Day", theme: "republic", desc: "Bharatiya sanvidhan no divas. Lal Qila par tirango ane desh-bhakti no maahol." },
            "2-15": { name: "Mahashivratri", theme: "shivratri", desc: "Om Namah Shivay. Adhyatmik shanti, Ardh-Chandra ane bhagwan shiv ni bhakti." },
            "3-3": { name: "Holika Dahan", theme: "holika", desc: "Asatya par satya no vijay. Agni ni pavitrata ane burai no naash." },
            "3-4": { name: "Holi", theme: "holi", desc: "Rango no utsav! Prem ane bhaichara no tyohaar, gulal ni bauchar." },
            "3-23": { name: "Shaheed Diwas", theme: "shaheed", desc: "Bhagat Singh, Sukhdev ane Rajguru ne koti koti naman. Sacrifice, bravery, emotion." },
            "4-14": { name: "Ambedkar Jayanti", theme: "ambedkar", desc: "Bharatiya Sanvidhan na ghadvaiya Dr. Babasaheb Ambedkar ne naman." },
            "8-15": { name: "Independence Day", theme: "independence", desc: "Aazadi no tyohaar. Tirango hamesha uncho rahe." },
            "11-8": { name: "Diwali", theme: "diwali", desc: "Deepotsavi! Prakash no utsav, ghar-ghar ma divada ane sukh-samriddhi." }
        };

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        // --- STATE ---
        let viewMonth = 0;
        let selectedDate = new Date(2026, 0, 1);
        let bgIntervals = [];

        // --- CORE ENGINE ---
        function init() {
            const now = new Date();
            // Default to real-time if in 2026, else default to Jan 1
            if (now.getFullYear() === 2026) {
                viewMonth = now.getMonth();
                selectedDate = now;
            }
            render();
            updateBackground(selectedDate);
        }

        function render() {
            const grid = document.getElementById('days-grid');
            const label = document.getElementById('month-label');
            const feed = document.getElementById('fest-feed');
            
            grid.innerHTML = '';
            label.innerText = months[viewMonth];

            const startDay = new Date(2026, viewMonth, 1).getDay();
            const daysInMonth = new Date(2026, viewMonth + 1, 0).getDate();

            for (let i = 0; i < startDay; i++) {
                grid.innerHTML += `<div></div>`;
            }

            for (let d = 1; d <= daysInMonth; d++) {
                const key = `${viewMonth + 1}-${d}`;
                const isFest = festivals[key];
                const isActive = selectedDate.getDate() === d && selectedDate.getMonth() === viewMonth;

                const node = document.createElement('div');
                node.className = `day-node ${isFest ? 'is-fest' : ''} ${isActive ? 'active' : ''}`;
                node.innerText = d;
                node.onclick = () => selectDate(d, viewMonth);
                grid.appendChild(node);
            }

            // Festival List
            feed.innerHTML = '';
            Object.keys(festivals).forEach(key => {
                const [m, d] = key.split('-').map(Number);
                if (m === viewMonth + 1) {
                    const item = document.createElement('div');
                    item.className = "p-3.5 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition";
                    item.innerHTML = `<div class="text-[10px] opacity-40 mb-1">${d} ${months[m-1]}</div><div class="font-bold text-sm text-white/90">${festivals[key].name}</div>`;
                    item.onclick = () => selectDate(d, viewMonth);
                    feed.appendChild(item);
                }
            });
        }

        function selectDate(d, m) {
            selectedDate = new Date(2026, m, d);
            render();
            updateBackground(selectedDate);
        }

        function moveMonth(dir) {
            viewMonth = (viewMonth + dir + 12) % 12;
            render();
        }

        function gotoActualToday() {
            const today = new Date();
            viewMonth = today.getMonth();
            selectedDate = new Date(2026, viewMonth, today.getDate());
            render();
            updateBackground(selectedDate);
        }

        // --- ANIMATION CONTROLLER ---
        function updateBackground(date) {
            const m = date.getMonth() + 1;
            const d = date.getDate();
            const key = `${m}-${d}`;
            const fest = festivals[key];
            const layer = document.getElementById('animation-layer');
            const hDate = document.getElementById('hero-date');
            const hFest = document.getElementById('hero-fest');
            const hDesc = document.getElementById('hero-desc');

            // Cleanup
            layer.innerHTML = '';
            bgIntervals.forEach(clearInterval);
            bgIntervals = [];

            hDate.innerText = `${d} ${months[m-1]}`;
            
            if (fest) {
                hFest.innerText = fest.name;
                hDesc.innerText = fest.desc;
                applyFestivalAnimation(fest.theme, layer);
            } else {
                hFest.innerText = "";
                const season = getSeason(m);
                hDesc.innerText = season.desc;
                applySeasonAnimation(season.theme, layer);
            }
        }

        function getSeason(m) {
            if (m >= 1 && m <= 3) return { theme: 'winter', desc: "Thandi savar ane dhundhlo prakash. Soft winter mist in the air." };
            if (m >= 4 && m <= 6) return { theme: 'summer', desc: "Garam hava ane shimmering sunlight. Summer vibes across India." };
            if (m >= 7 && m <= 9) return { theme: 'monsoon', desc: "Varsad ni rimzim ane fresh green environment. Nature in full bloom." };
            return { theme: 'festive', desc: "Warm golden light ane festive glow. A peaceful clear sky." };
        }

        function applyFestivalAnimation(theme, layer) {
            switch(theme) {
                case 'newyear':
                    layer.style.background = 'radial-gradient(circle at center, #050a15 0%, #000 100%)';
                    const nyText = document.createElement('div');
                    nyText.className = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10 text-6xl font-black uppercase tracking-[0.5em] text-center w-full";
                    nyText.innerText = "Happy New Year 2026";
                    layer.appendChild(nyText);
                    const intvNY = setInterval(() => spawnFirework(layer), 800);
                    bgIntervals.push(intvNY);
                    break;
                case 'uttarayan':
                    layer.style.background = 'linear-gradient(to bottom, #2980b9, #6dd5fa)';
                    for(let i=0; i<15; i++) spawnKite(layer);
                    break;
                case 'republic':
                case 'independence':
                    layer.style.background = '#0a0a0a';
                    const tri = document.createElement('div');
                    tri.className = "absolute inset-0 opacity-10 flex flex-col";
                    tri.innerHTML = '<div class="flex-1 bg-[#FF9933]"></div><div class="flex-1 bg-white"></div><div class="flex-1 bg-[#138808]"></div>';
                    layer.appendChild(tri);
                    spawnCenterLogo(layer, theme === 'republic' ? 'Chakra' : 'Flag');
                    break;
                case 'shivratri':
                    layer.style.background = 'radial-gradient(circle at 70% 20%, #1a1a2e 0%, #020205 100%)';
                    spawnMoon(layer, true);
                    spawnStars(layer, 80);
                    break;
                case 'shaheed':
                    layer.style.background = '#000';
                    const glow = document.createElement('div');
                    glow.className = "absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[60%] bg-gradient-to-t from-orange-900/20 to-transparent blur-[120px]";
                    layer.appendChild(glow);
                    spawnStars(layer, 15);
                    break;
                case 'diwali':
                    layer.style.background = 'radial-gradient(circle at bottom, #2c1a0a 0%, #050505 100%)';
                    const intvD = setInterval(() => spawnSparkle(layer), 100);
                    bgIntervals.push(intvD);
                    break;
                case 'holi':
                    layer.style.background = '#0a050a';
                    for(let i=0; i<30; i++) spawnColorSplash(layer);
                    break;
            }
        }

        function applySeasonAnimation(theme, layer) {
            switch(theme) {
                case 'winter':
                    layer.style.background = 'linear-gradient(to bottom, #1e3c72, #2a5298)';
                    const mist = document.createElement('div');
                    mist.className = "mist-layer";
                    layer.appendChild(mist);
                    break;
                case 'summer':
                    layer.style.background = 'linear-gradient(to bottom, #ff9966, #ff5e62)';
                    const shimmer = document.createElement('div');
                    shimmer.className = "absolute inset-0 bg-white/5 animate-pulse blur-3xl";
                    layer.appendChild(shimmer);
                    break;
                case 'monsoon':
                    layer.style.background = '#0f172a';
                    const intvR = setInterval(() => spawnRain(layer), 50);
                    bgIntervals.push(intvR);
                    break;
                default:
                    layer.style.background = 'radial-gradient(circle at center, #111 0%, #000 100%)';
                    spawnStars(layer, 30);
            }
        }

        // --- ASSET SPAWNERS ---
        function spawnFirework(parent) {
            const burst = document.createElement('div');
            burst.className = 'firework-particle';
            const x = Math.random() * 100;
            const y = Math.random() * 80;
            const size = Math.random() * 300 + 100;
            const color = `hsl(${Math.random()*360}, 100%, 75%)`;
            burst.style.cssText = `left:${x}vw; top:${y}vh; width:${size}px; height:${size}px; border:1px solid ${color}; box-shadow:0 0 50px ${color};`;
            parent.appendChild(burst);
            setTimeout(() => burst.remove(), 2000);
        }

        function spawnKite(parent) {
            const k = document.getElementById('svg-kite').cloneNode(true);
            k.classList.add('kite-asset');
            k.style.display = 'block';
            k.style.left = Math.random() * 90 + 'vw';
            k.style.top = Math.random() * 90 + 'vh';
            k.style.color = `hsl(${Math.random()*360}, 70%, 65%)`;
            k.style.width = (Math.random()*40 + 40) + 'px';
            k.style.opacity = '0.7';
            k.style.animationDelay = Math.random() * 5 + 's';
            parent.appendChild(k);
        }

        function spawnMoon(parent, isHalf) {
            const moon = document.createElement('div');
            moon.style.cssText = `position:absolute; top:15%; right:20%; width:100px; height:100px; background:#fefcd7; border-radius:50%; box-shadow:0 0 60px rgba(254,252,215,0.4);`;
            if(isHalf) {
                const mask = document.createElement('div');
                mask.style.cssText = `position:absolute; top:-10px; right:25px; width:100px; height:100px; background:#1a1a2e; border-radius:50%;`;
                moon.appendChild(mask);
            }
            parent.appendChild(moon);
        }

        function spawnStars(parent, n) {
            for(let i=0; i<n; i++) {
                const s = document.createElement('div');
                s.style.cssText = `position:absolute; left:${Math.random()*100}vw; top:${Math.random()*100}vh; width:2px; height:2px; background:white; border-radius:50%; opacity:${Math.random()}; filter:blur(1px);`;
                parent.appendChild(s);
            }
        }

        function spawnRain(parent) {
            const r = document.createElement('div');
            r.style.cssText = `position:absolute; left:${Math.random()*100}vw; top:-30px; width:1px; height:35px; background:rgba(255,255,255,0.2);`;
            parent.appendChild(r);
            r.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(110vh)' }], { duration: 600, easing: 'linear' }).onfinish = () => r.remove();
        }

        function spawnColorSplash(parent) {
            const colors = ['#FF1493', '#00BFFF', '#32CD32', '#FFD700', '#FF4500'];
            const splash = document.createElement('div');
            const size = Math.random() * 200 + 100;
            splash.style.cssText = `position:absolute; left:${Math.random()*100}vw; top:${Math.random()*100}vh; width:${size}px; height:${size}px; background:${colors[Math.floor(Math.random()*5)]}; border-radius:50%; filter:blur(60px); opacity:0.15;`;
            parent.appendChild(splash);
        }

        function spawnSparkle(parent) {
            const s = document.createElement('div');
            const size = Math.random() * 4 + 2;
            s.style.cssText = `position:absolute; left:${Math.random()*100}vw; bottom:0; width:${size}px; height:${size}px; background:gold; border-radius:50%; box-shadow:0 0 15px gold;`;
            parent.appendChild(s);
            s.animate([{ transform: 'translateY(0) scale(1)', opacity: 1 }, { transform: 'translateY(-100vh) scale(0)', opacity: 0 }], { duration: Math.random()*3000 + 2000, easing: 'ease-out' }).onfinish = () => s.remove();
        }

        function spawnCenterLogo(parent, type) {
            const logo = document.createElement('div');
            logo.className = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none";
            logo.innerHTML = `<div class="w-64 h-64 border-4 border-white/20 rounded-full flex items-center justify-center"><div class="text-4xl font-black">${type === 'Chakra' ? '☸' : '🇮🇳'}</div></div>`;
            parent.appendChild(logo);
        }

        window.onload = init;
